import React, {useEffect, useState } from 'react';
import { Text, Pressable } from 'react-native';
import { CardsCount } from '../../data/constants';

interface ButtonProps{
    level: number,
    navigation:any,
}

export const HomeButton = (props: ButtonProps) => {
    const [color, setColor] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    
    useEffect(()=>{
        switch(props.level){
            case CardsCount.EASY:
                setColor('green')
                setTitle('Easy')
                break
            case CardsCount.INTERMEDIATE:
                setColor('darkorange')
                setTitle('Intermediate')
                break
            case CardsCount.HARD:
                setColor('orangered')
                setTitle('Hard')
                break
        }
    },[])
    
    const pickLevel = ():void => {
        props.navigation.navigate('Grid', {size: props.level})
	}

    return (
        <Pressable
            onPress={()=>{pickLevel()}}
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
            }}>
                <Text style={{
                    fontSize: 18,
                    lineHeight: 21,
                    fontWeight: 'bold',
                    letterSpacing: 0.25,
                    color: 'white',
                    fontFamily: 'Helvetica'
                }}>{title}</Text>
            </Pressable>
            
    )
}