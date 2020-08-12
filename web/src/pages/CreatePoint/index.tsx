import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import './styles.css';
import { Link } from 'react-router-dom';


const CreatePoint = () => {
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
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione UF</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="uf">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
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
                        <li>
                            <img src="http://localhost:3333/uploads/baterias.svg" alt="Teste" />
                            <span>Baterias</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/baterias.svg" alt="Teste" />
                            <span>Baterias</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/baterias.svg" alt="Teste" />
                            <span>Baterias</span>
                        </li>
                        <li className="selected">
                            <img src="http://localhost:3333/uploads/baterias.svg" alt="Teste" />
                            <span>Baterias</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/baterias.svg" alt="Teste" />
                            <span>Baterias</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/baterias.svg" alt="Teste" />
                            <span>Baterias</span>
                        </li>

                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>

        </div>
    )
}

export default CreatePoint;