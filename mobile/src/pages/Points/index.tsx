import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface Item {
    id: number,
    title: string,
    image_url: string;
}

const Points = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);


    useEffect(() => {
        api.get('/items').then(response => {
            setItems(response.data);
        })
    }, [])

    function handleSelectedItem (id: number){
        const alreadySelected = selectedItems.findIndex(item => item === id)
    
        if(alreadySelected >= 0){
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
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -27.2092052,
                            longitude: -49.6401092,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014
                        }}
                    >
                        <Marker
                            onPress={() => handleNavigateToDetail(2)}
                            style={styles.mapMarker}
                            coordinate={{
                                latitude: -27.2092052,
                                longitude: -49.6401092,
                            }}>
                            <View style={styles.mapMarkerContainer}>
                                <Image style={styles.mapMarkerImage}
                                    source={{ uri: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }} />
                                <Text style={styles.mapMarkerTitle}>point.name</Text>
                            </View>
                        </Marker>

                    </MapView>

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