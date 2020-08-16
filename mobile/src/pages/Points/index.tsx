import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface Item {
    id: number,
    title: string,
    image_url: string;
}

interface Points {
    id: number,
    name: string,
    image: string,
    image_url: string,
    latitude: number,
    longitude: number
}

interface Params {
    selectedUf: string,
    selectedCity: string
}

const Points = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [points, setPoints] = useState<Points[]>([]);

    useEffect(() => {
        api.get('/items').then(response => {
            setItems(response.data);
        })
    }, []);

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync()

            if (status !== 'granted') {
                Alert.alert('Oooops...', 'Precisamos da sua permissão para obter sua localização')
                return
            }

            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords

            setInitialPosition([latitude, longitude])
        }

        loadPosition()
    }, []);

    useEffect(() => {

        api.get('/points', {
            params: {
 
                city: "Rio do Sul",
                uf: "SP",
                items: selectedItems
            }
        }).then(response => {
            setPoints(response.data)
        })
    }, [selectedItems]);



    function handleSelectedItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id)

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    function handleNavigatrBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail(id: number) {
        navigation.navigate('Detail', { point_id: id })
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
                    {initialPosition[0] !== 0 && (
                        <MapView style={styles.map}
                            loadingEnabled={initialPosition[0] === 0}
                            initialRegion={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014
                            }}>
                            {points.map(point => (
                                <Marker key={String(point.id)}
                                    style={styles.mapMarker}
                                    onPress={() => handleNavigateToDetail(point.id)}
                                    coordinate={{
                                        latitude: -27.2092952,
                                        longitude: -49.6401092
                                    }}>

                                    <View style={styles.mapMarkerContainer}>
                                        <Image style={styles.mapMarkerImage}
                                            source={{ uri: point.image }} />
                                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    )}

                </View>
                <View style={styles.itemsContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    >
                        {items.map(item => (
                            <TouchableOpacity
                                key={String(item.id)}
                                style={[
                                    styles.item,
                                    selectedItems.includes(item.id) ? styles.selectedItem : {}
                                ]}
                                onPress={() => handleSelectedItem(item.id)}
                                activeOpacity={0.6}>
                                <SvgUri width="42" height="42" uri={item.image_url} />
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>


            </View>
        </>
    )
}

export default Points;