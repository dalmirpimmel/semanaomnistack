import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { useNavigation, Route } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

//importar a logo, tem que ter sempre as tres com tamanhos
import logoImg from '../../assets/logo.png';

//impostar os styles
import styles from './style';


export default function Incidents (){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //inicia na página 1
    const [loading, setLoading] = useState(false);

    const navegation = useNavigation();


    function navigateToDetail(incident){
        navegation.navigate('Detalhes', { incident });
    }

    async function loadIncidents(){
        //para não ficar carregando caso o usuário fique puxando a tela
        if (loading) {
            return;
        }

        if (total >0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        //vai pegar a rota http://localhost:3333/incidents 
        const response = await api.get('incidents', {
            params: { page  }
        });

        //adicionar 2 veores no reack, o ... anexa os novos itens, como face e insta
        setIncidents([ ...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logoImg} />
            <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{ total } Casos</Text>.
            </Text>
        </View>

        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.descriptio}>Escolha um dos casos abaixo e salve o dia.</Text>

        <FlatList
            data = {incidents}
            style={styles.incidentsList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem = {({ item:incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG: </Text>
                    <Text style={styles.incidentValue}>{ incident.name } </Text>

                    <Text style={styles.incidentProperty}>CASO: </Text>
                    <Text style={styles.incidentValue}>{ incident.title }</Text>

                    <Text style={styles.incidentProperty}>VALOR: </Text>
                    <Text style={styles.incidentValue}>
                    { Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                            }).format(incident.value)} 
                    </Text>

                    <TouchableOpacity style={styles.detailsButton} 
                        onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>   
                        <Feather name="arrow-right" size={16} color="#E02041" />     
                    </TouchableOpacity>
                </View>

            )}
        />

 
    </View>
    );        
}