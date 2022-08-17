import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home as Home } from './src/components/home/Home';
import { Grid } from './src/components/GameGrid/grid/Grid';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR } from './src/data/constants';

const Stack = createNativeStackNavigator()
const darktheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: DEFAULT_BACKGROUND_COLOR,
    card: DEFAULT_BACKGROUND_COLOR,
    text: DEFAULT_TEXT_COLOR,

  },
}
const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: DEFAULT_BACKGROUND_COLOR,
    card: DEFAULT_BACKGROUND_COLOR,
    text: DEFAULT_TEXT_COLOR,

  },
}
export default function App() {	
	return (
		<NavigationContainer
			theme={darktheme}
		>
			<Stack.Navigator 
			   	screenOptions={{
					headerShown: false,
				}}>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Game" component={Grid} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}