import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home as Home } from './src/components/home/Home';
import { Grid } from './src/components/GameGrid/grid/Grid';

const Stack = createNativeStackNavigator()

export default function App() {	
	return (
		<NavigationContainer>
			<Stack.Navigator 
			  	initialRouteName="Home"
			   	screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Game" component={Grid} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}