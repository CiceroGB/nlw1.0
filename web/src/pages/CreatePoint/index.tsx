import React, { useEffect, useState, ChangeEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios';


import logo from '../../assets/logo.svg';

import './styles.css';
import { response } from 'express';

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface IBGEUF {
    sigla: string
}
interface IBGECity {
    nome: string
}




const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<IBGEUF[]>([]);
    const [cities, setCities] = useState<IBGECity[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])

    useEffect(() => {
        axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => {
                    return {
                        sigla: uf.sigla
                    }
                });
                ufInitials.sort((a, b) => a.sigla.localeCompare(b.sigla));
                setUfs(ufInitials);
            });


    }, [])

    useEffect(() => {
        if (selectedUf === '0') {
            return
        }

        axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => {
                    return {
                        nome: city.nome
                    }
                })
                cityNames.sort((a, b) => a.nome.localeCompare(b.nome));
                setCities(cityNames)
            })
    }, [selectedUf])


    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
        const uf  = event.target.value
        setSelectedUf(uf);

    }



    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"></img>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form>
                <h1>Cadastro do <br />Ponto de Coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">
                            Nome da entidade
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">
                                E-mail
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="name">
                                Whatsapp
                            </label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-23.0422819, -46.9708041]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[-23.0422819, -46.9708041]} />
                    </Map>



                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select  name="uf" id="uf" value={selectedUf} onChange = {handleSelectedUf}>
                                <option value="0">Selecione UF</option>
                                {ufs.map(uf =>
                                    <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>

                                )}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="uf">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city =>
                                    <option key={city.nome} value={city.nome}>{city.nome}</option>

                                )}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione itens de coleta</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item =>
                            <li key={item.id}
                                className="selected">
                                <img src={item.image_url} alt={item.title}></img>
                                <span>{item.title}</span>
                            </li>
                        )}

                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>

        </div>
    )
}

export default CreatePoint;