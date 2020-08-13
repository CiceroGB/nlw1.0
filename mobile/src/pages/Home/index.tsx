import React from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'

import styles from './styles';


const Home = () => {
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

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={() => { }}>
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