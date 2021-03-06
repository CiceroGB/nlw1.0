import React, { useEffect, useState } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';
interface Params {
    point_id: number
}

interface Data {
    point: {
        image: string,
        name: string,
        email: string,
        whatsapp: string,
        city: string,
        uf: string
    },
    item: {
        title: string
    }[]
}

const Detail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params as Params
    const [data, setData] = useState<Data>({} as Data)

    useEffect(() => {
        api.get(`/points/${routeParams.point_id}`).then(response => {
            setData(response.data)
        })
    }, [])

    function handleNavigateBack() {
        navigation.goBack()
    }


    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`)
    }

    function handleComposerMail() {
        MailComposer.composeAsync({
            subject: 'Interesse na coleta de resíduos.',
            recipients: [data.point.email]
        })
    }

    if(!data.point){ 
        return null
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                        <Icon style={styles.iconLogout} name="log-out" size={25} />
                </TouchableOpacity>

                <Image style={styles.pointImage}
                source={{ uri: data.point.image }}/>
                <Text style={styles.pointName}>{data.point.name}</Text>
                <Text style={styles.itemsTitle}>Items Coletados:</Text>
                <Text style={styles.pointItems}>{data.item.map(item => item.title).join(', ')}</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço:</Text>
                    <Text style={styles.addressContent}>{data.point.city} - {data.point.uf}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleComposerMail}>
                    <Icon name="mail" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>

            </View>
        </SafeAreaView>
    )
}

export default Detail