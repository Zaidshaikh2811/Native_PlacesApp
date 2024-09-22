import { Alert, Button, Image, StyleSheet, Text, View } from "react-native"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker"
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import OutlineButton from "../UI/OutlinedButton";

function ImagePicker({ onImageTaken }) {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState()

    async function verifyPermission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED
        ) {
            Alert.alert("Insufficient Permission!",
                "You Need to Grant Camera Permission to use this app"
            )
            return false
        }
        return true
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });


        setPickedImage(image.assets[0].uri)
        onImageTaken(image.assets[0].uri)
    }

    let imagePreview = <Text>No Image Picked yet..</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    }

    return <View>
        <View style={styles.imagePreview}>
            {
                imagePreview
            }
        </View>
        <OutlineButton icon="camera" onPress={takeImageHandler} >Take Image</OutlineButton>
    </View>
}

export default ImagePicker


const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        margin: 10,
        borderColor: Colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "auto",

        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }

})