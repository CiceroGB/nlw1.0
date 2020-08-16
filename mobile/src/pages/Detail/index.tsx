import React, { useEffect, useState } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';



const Detail = () => {

    const navigation = useNavigation();

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${'data.point.whatsapp'}&text=Tenho interesse sobre coleta de resíduos`)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                        <Icon style={styles.iconLogout} name="log-out" size={25} />
                </TouchableOpacity>

                <Image style={styles.pointImage}
                source={{ uri: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }}/>
                <Text style={styles.pointName}>data.point.name</Text>
                <Text style={styles.itemsTitle}>Items Coletados:</Text>
                <Text style={styles.pointItems}>
                    
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço:</Text>
                    <Text style={styles.addressContent}>data.point.city - data.point.uf</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>

                <RectButton style={styles.button} >
                    <Icon name="mail" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>

            </View>
        </SafeAreaView>
    )
}

export default Detail