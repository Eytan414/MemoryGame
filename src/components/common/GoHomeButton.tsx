import React from 'react';
import { Text, Pressable } from 'react-native';
import { PAGE_HOME } from '../../data/constants';

interface Props{
    navigation:any
}

export const GoHomeButton = (props: Props) => {
    
    return (
        <Pressable
        style={{
            backgroundColor: 'saddlebrown',
            paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 55,
                elevation: 3,
        }}
        onPress={() => props.navigation.navigate(PAGE_HOME)}
        >
        <Text style={{
            color: 'blanchedalmond',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 16
        }}>🏠 Home</Text>
    </Pressable>
    )
}