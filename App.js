import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/Colors';
import Map from './screens/Map';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer >
        <Stack.Navigator screenOptions={{

          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.gray700,
          contentStyle: {
            backgroundColor: Colors.gray700
          }
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={({ navigation }) => ({
            title: "Your Favorite Places",

            headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />,

          })}></Stack.Screen>
          <Stack.Screen name="AddPlace" component={AddPlaces} options={{

            title: "Add a new Place"
          }}></Stack.Screen>
          <Stack.Screen name='Map' component={Map}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
