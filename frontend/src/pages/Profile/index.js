import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from '../../services/api';

import './style.css'; 

import logoImg  from '../../assets/logo.svg'


export default function Profile() {

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    //buscar o nome da ong
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    

    useEffect (() => {
        api.get('profile', {
            headers:{
                Authorization: ongId, 
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    //funçao para deletar
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            //fazer o item sumir da tela depois de deletar
            setIncidents(incidents.filter(incidents => incidents.id !== id));

        }catch (err){
            alert('Erro ao deletar caso, temte novamente.');
        }
    }

    //funcao logout
    function handleLogout() {
        localStorage.clear(); //limpa
        history.push('/'); //manda para a página de login
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vida, { ongName }</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidents.descripition}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>
               
                        <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" /> 
                        </button>
                    </li>
                )
                    
                    
                )}

            </ul>
        </div>
    );
}