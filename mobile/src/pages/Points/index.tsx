import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons'
import MapView from 'react-native-maps';
import { SvgUri } from 'react-native-svg';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';


const Points = () => {
    const navigation = useNavigation();

    function handleNavigatrBack() {
        navigation.goBack();
    }

    return (
        <>
            < View style={styles.container}>
                <TouchableOpacity onPress={handleNavigatrBack}>
                    <Icon name="arrow-left" size={25} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>Seja Bem Vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    <MapView style={styles.map} />

                </View>
                <View style={styles.itemsContainer}>
                    <TouchableOpacity onPress={()=>{}} style={styles.item}>
                        <SvgUri width={42} height = {42} uri=''>

                        </SvgUri>
                    </TouchableOpacity>

                </View>


            </View>
        </>
    )
}

export default Points;