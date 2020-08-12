import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';





const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />

                <Text style={styles.title}>
                    Seu Marketplace de coleta
                </Text>

            </View>


        </View>
    )

}


export default Home;