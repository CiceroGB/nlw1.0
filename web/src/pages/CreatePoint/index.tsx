import React from 'react';
import {FiArrowLeft} from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import './styles.css';
import { Link } from 'react-router-dom';


const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"></img>
                <Link to ="/">
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>


        </div>
    )
}

export default CreatePoint;