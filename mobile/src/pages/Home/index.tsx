import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';


import styles from './styles';

interface IBGEUF {
    sigla: string
}
interface IBGECity {
    nome: string
}



const Home = () => {
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<IBGEUF[]>([]);
    const [cities, setCities] = useState<IBGECity[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

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

    function handleNavigateToPoints() {
        navigation.navigate("Points", {
            selectedUf,
            selectedCity,
        });
    }



    return (
        <ImageBackground
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>
                    Seu Marketplace de coleta
                </Text>
                <Text style={styles.description}>
                    Ajudando a encontrar pontos de coleta
                </Text>
            </View>

            <View >
                <RNPickerSelect
                    style={{ ...styles }}
                    placeholder={{
                        label: 'Selecione o UF...',
                        value: null
                    }}
                    onValueChange={(uf) => setSelectedUf(uf)}
                    items={ufs.map(uf => (
                        {
                            key: uf.sigla,
                            label: uf.sigla,
                            value: uf.sigla,
                        }))}
                />
            </View>
            <View>
                {selectedUf !== '0' && (
                    <RNPickerSelect
                        style={{ ...styles }}
                        placeholder={{
                            label: 'Selecione a Cidade...',
                            value: null
                        }}
                        onValueChange={(city) => setSelectedCity(city)}
                        items={cities.map(city => (
                            {
                                key: city.nome,
                                label: city.nome,
                                value: city.nome,
                            }))}
                    />
                )}

            </View>

            <View style={styles.footer}>

                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Icon name="arrow-right" size={24} color="#FFF" />
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>


        </ImageBackground>

    )

}


export default Home;