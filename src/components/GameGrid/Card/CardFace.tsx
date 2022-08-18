import React from 'react';
import { StyleSheet, Image,  } from 'react-native';

interface CardProps {
    imageUrl: any,
    show: boolean
}
export const CardFace = (props: CardProps) => {
    return (
        <Image
            source={props.imageUrl}
            style={{
                // ...styles.image,
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
                transform: [{ rotateY:'180deg' } ],
                backfaceVisibility: props.show ? "visible" : "hidden", 
                display: props.show ? "flex" : "none"
            }} />
    )
}
const styles = StyleSheet.create({
    image:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    }
})