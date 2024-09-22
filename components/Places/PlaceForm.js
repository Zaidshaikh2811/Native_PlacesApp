import { useCallback, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Colors } from "../../constants/Colors"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"
import Button from "../UI/Button"

function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState()
    const [pickedLocation, setPickedLocation] = useState()
    const [selectedImage, setSelectedImage] = useState()

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }

    function savePlace() {
        console.log(enteredTitle);
        console.log(pickedLocation);
        console.log(selectedImage);

    }


    const imageTakenHandler = useCallback((imageUri) => {
        setSelectedImage(imageUri)
    }, [])
    const pickedLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }, [])


    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}></TextInput>
        </View>
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker onLocationPicked={pickedLocationHandler} />
        <Button onPress={savePlace}>Submit</Button>
    </ScrollView>
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 18,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100

    },
})