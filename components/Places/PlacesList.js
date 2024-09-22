import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";


function PlacesList({ places }) {

    if (!places || places.length === 0) {
        return <View style={styles.fallBackContainer}>
            <Text style={styles.fallBackText}>No Places Added Yet - Start Adding Some!</Text>
        </View>
    }


    return <FlatList data={places} keyExtractor={(data) => data.id} renderItem={({ item }) => <PlaceItem item={item} />} />
}

export default PlacesList;

const styles = StyleSheet.create({
    fallBackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallBackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})