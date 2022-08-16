import React, { useState } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { Grid } from './src/components/grid';
import { CardsCount, Level } from './src/data/constants';

export default function App() {
	const [cardsAmount, setCardsAmount] = useState<number>(CardsCount.INTERMEDIATE)
	const dims = Dimensions.get('screen')
	const maxWidth = dims.width / 1.2

	const changeLevel = (level: number):void => {
		switch(level){
			case Level.EASY:
				setCardsAmount(CardsCount.EASY)
				break
			case Level.INTERMEDIATE:
				setCardsAmount(CardsCount.INTERMEDIATE)
				break
			case Level.HARD:
				setCardsAmount(CardsCount.HARD)
				break
		}
	}
	return (
		<View style={{
			backgroundColor: '#212121',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',}}>
			{<>
				<View style={{
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 12,
					maxWidth
				}}>
					<Button color='green' onPress={()=>{changeLevel(Level.EASY)}} title='Easy'/>
					<Button color='darkorange' onPress={()=>{changeLevel(Level.INTERMEDIATE)}} title='Intermediate'/>
					<Button color='orangered' onPress={()=>{changeLevel(Level.HARD)}} title='Hard'/>
				</View>
				<Grid size={cardsAmount}/>
			</>}
		</View>
	)
}

const styles = StyleSheet.create({
    wrapper:{   
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12
	},
	container:{   
		backgroundColor: '#212121',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	}
})