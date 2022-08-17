import React from 'react';
import { Text, Pressable } from 'react-native';
import { DEFAULT_BUTTON_COLOR } from '../../../data/constants';

interface ButtonProps{
    navigation:any,
    title: string,
    pageToNavigate: string,
    params?:any
}

export const GameButton = (props: ButtonProps) => {
    const color = props.params?.color ?? DEFAULT_BUTTON_COLOR
    const navigate = ():void => {
        props.navigation.navigate(props.pageToNavigate, props.params)
	}

    return (
        <Pressable
            onPress={()=>{navigate()}}
            style={{
                backgroundColor: color,   
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 55,
                elevation: 3,
            }}>
                <Text style={{
                    fontSize: 18,
                    lineHeight: 21,
                    fontWeight: 'bold',
                    letterSpacing: 0.25,
                    color: 'white',
                    fontFamily: 'Helvetica'
                }}>{props.title}</Text>
            </Pressable>
            
    )
}