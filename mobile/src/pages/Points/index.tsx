import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons'


import styles from './styles';
import { useNavigation } from '@react-navigation/native';


const Points = () => {
    const navigation = useNavigation();


    function handleNavigatrBack() {
        navigation.goBack();
    }

    return (
        < View style={styles.container}>
            <TouchableOpacity onPress={handleNavigatrBack}>
                <Icon name="arrow-left" size={25} />
            </TouchableOpacity>



        </View>
    )
}

export default Points;