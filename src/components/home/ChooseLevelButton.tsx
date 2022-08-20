import React, {useEffect, useState } from 'react';
import { Text, Pressable } from 'react-native';
import { CardsCount, Level, PAGE_GRID } from '../../data/constants';
interface ButtonProps{
    level: number,
    navigation:any,
}

export const ChooseLevelButton = (props: ButtonProps) => {
    const [color, setColor] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    let levelKey:string = ''

    useEffect(()=>{
        switch(props.level){
            case CardsCount.EASY:
                setColor('green')
                setTitle('Easy')
                levelKey = Level.EASY
                break
            case CardsCount.INTERMEDIATE:
                setColor('darkorange')
                setTitle('Intermediate')
                levelKey = Level.INTERMEDIATE
                break
            case CardsCount.HARD:
                setColor('orangered')
                setTitle('Hard')
                levelKey = Level.HARD
                break
            case CardsCount.EXPERT:
                setColor('darkred')
                setTitle('Expert')
                levelKey = Level.EXPERT
                break
        }
    },[])
    
    const pickLevel = ():void => {
        props.navigation.navigate(PAGE_GRID, {size: props.level})
	}
    
    return (
        <Pressable
            onPress={()=>{ pickLevel() }}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 55,
                elevation: 3,
                backgroundColor:color,   
                shadowColor: color,
                shadowOpacity: 0.5,
                shadowRadius: 12,
            }}
        >
            <Text style={{
                fontSize: 18,
                lineHeight: 21,
                fontWeight: 'bold',
                letterSpacing: 0.25,
                color: 'white',
                fontFamily: 'Helvetica'
            }}>
                {title}
            </Text>
        </Pressable>
    )
}