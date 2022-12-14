import React from 'react';
import { Text, Pressable } from 'react-native';
import { DEFAULT_BUTTON_COLOR, PAGE_GRID } from '../../../data/constants';

interface ButtonProps{
    level:number,
    navigation:any,
    params?:any
}

export const RestartButton = (props: ButtonProps) => {
    const color = props.params?.color ?? DEFAULT_BUTTON_COLOR
    const restart = ():void => {
        props.navigation.replace(PAGE_GRID, {size: props.level})
    }

    return (
        <Pressable
            onPress={()=>{restart()}}
            style={{
                backgroundColor: color,   
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 55,
                elevation: 3,
                marginHorizontal: 8,
            }}>
                <Text style={{
                    fontSize: 16,
                    color: 'white',
                    fontFamily: 'Helvetica'
                }}>Restart</Text>
            </Pressable>
            
    )
}