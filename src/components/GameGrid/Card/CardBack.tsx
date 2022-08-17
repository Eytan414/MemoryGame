import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface CardBackProps{
    show: boolean 
}
export const CardBack = (props:CardBackProps) => {
    return (
        <Text style={{
            // ...styles.text,
            height: '100%',
            width: '100%',
            color: 'gold',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 55,
            fontWeight: '900',
            transform: [{ rotateZ: "23deg" }],
            display: props.show ? "flex" : "none" 
        }}>
        ?</Text>
    )
}
const styles = StyleSheet.create({
    text:{
        height: '100%',
        width: '100%',
        color: 'gold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 55,
        fontWeight: '900',
        transform: [{ rotateZ: "23deg" }],
    }
})