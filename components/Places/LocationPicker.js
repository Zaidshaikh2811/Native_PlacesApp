import { StyleSheet, View } from "react-native";
import OutlineButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/Colors";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";


function LocationPicker({ onLocationPicked }) {
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const route = useRoute();
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions()

    const [coordinates, setCoordinates] = useState(null)



    useEffect(() => {
        if (isFocused && route.params) {

            const mapPickedLocation = {
                lat: route.params.pickedLat,
                long: route.params.pickedLng
            }


            setCoordinates(mapPickedLocation)

        }



    }, [isFocused, route])

    useEffect(() => {
        onLocationPicked(coordinates)
    }, [coordinates, onLocationPicked])

    async function verifyPermission() {
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted
        }

        if (locationPermissionInfo.status === PermissionStatus.DENIED
        ) {
            Alert.alert("Insufficient Permission!",
                "You Need to Grant Location Permission to use this app"
            )
            return false
        }
        return true

    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermission()


        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setCoordinates(
            {
                lat: location.coords.latitude,
                long: location.coords.longitude,

            }
        )


    }

    function pickOnMapHandler() {
        navigation.navigate(
            'Map'
        )
    }

    return <View>
        <View style={styles.mapPreview}>
            {
                coordinates ?
                    <MapView style={styles.map} initialRegion={{
                        latitude: coordinates.lat,
                        longitude: coordinates.long,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}  >
                        <Marker coordinate={{
                            latitude: coordinates.lat,
                            longitude: coordinates.long,

                        }} title="marker" />
                    </MapView> : null
            }
        </View>
        <View style={styles.actions}>
            <OutlineButton icon="location" onPress={getLocationHandler}>Locate User</OutlineButton>
            <OutlineButton icon="map" onPress={pickOnMapHandler}> Pick On Map</OutlineButton>
        </View>
    </View>
}

export default LocationPicker;


const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        margin: 10,
        borderColor: Colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "auto",
        borderWidth: 1
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    map: {
        width: '100%',
        height: '100%',
    },
})