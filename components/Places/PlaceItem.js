import { Image, Pressable, StyleSheet, Text, View } from "react-native"

function PlaceItem({ item, onSelect }) {

    return <Pressable onPress={onSelect}>
        <Image source={{ uri: item.imageUri }} />
        <View>
            <Text>{item.title}</Text>
            <Text>{item.address}</Text>
        </View>
    </Pressable>

}
export default PlaceItem;

const styles = StyleSheet.create({
    item: {

    }
})