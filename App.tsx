import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Grid } from './src/components/grid';
import { Level } from './src/data/constants';

export default function App() {
  const [cardsAmount, setCardsAmount] = useState<number>(16)
  console.log('cardsAmount:'+cardsAmount)
  	
	const changeLevel = (level: number):void => {
		switch(level){
			case Level.EASY:
				setCardsAmount(8)
				break
			case Level.INTERMEDIATE:
				setCardsAmount(16)
				break
			case Level.HARD:
				setCardsAmount(22)
				break
		}
	}
  return (
	<View style={{
	  backgroundColor: '#212121',
	  alignItems: 'center',
	  justifyContent: 'center',
	  width: '100%',
	  height: '100%',
	}}>
		{<>
			<View style={{
				width: '33%',
	  			flexDirection: 'row',
				justifyContent: 'space-between',
				marginTop: 16
			}}>
				<Button onPress={()=>{changeLevel(Level.EASY)}} title='Easy'/>
				<Button onPress={()=>{changeLevel(Level.INTERMEDIATE)}} title='Intermediate'/>
				<Button onPress={()=>{changeLevel(Level.HARD)}} title='Hard'/>
			</View>
			<Grid size={cardsAmount}/>
		</>}
	</View>
  )
}