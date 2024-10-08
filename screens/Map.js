import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";


function Map({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState()

    const region = {
        latitude: 34,
        longitude: -122,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }


    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;



        setSelectedLocation({ lat, lng })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("NO Location Picked", "Please pick a location on the map")
            return;
        }

        navigation.navigate("AddPlace", {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        })
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
        })
    }, [navigation, savePickedLocationHandler])

    return <MapView onPress={selectLocationHandler} style={styles.map} initialRegion={
        region
    }>{
            selectedLocation &&
            <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
        }
    </MapView>

}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})