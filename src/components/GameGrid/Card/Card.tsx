import React from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import { Card } from '../../../types';
import { CardBack } from './CardBack';
import { CardFace } from './CardFace';

interface CardProps {
    index: number,
    cards: Card[],
    onPress(pressed: number): void,
}

export const CardComponent = (props: CardProps) => {
    let dims = Dimensions.get('screen')
    let colSize = dims.width * dims.scale / 12
    const card = props.cards.filter((card) => {return card.index === props.index})[0]
    
    return (
        <Pressable disabled={card.disabled}
            onPress={() => { props.onPress(props.index) }}
            style={{
                // ...styles.container,
                flexBasis: '20%',
                alignItems: 'center',
                borderRadius: 16,
                shadowColor: "#ff0",
                shadowOpacity: .4,
                shadowRadius: 12,
                opacity: card.disabled ? .5 : 1,
                backgroundColor: card.revealed ? 'lightcyan' : 'darkslateblue',
                width: colSize,
                height: colSize,
                margin: 8,
            }}>
                <CardFace
                    show={card.revealed}
                    imageUrl={card.imageUrl}
                />
                <CardBack
                    show={!card.revealed} 
                />
        </Pressable>
    )
}
const styles = StyleSheet.create({
    text:{
        height: '100%',
        width: '100%',
        color: 'gold',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 80,
        fontWeight: 'bold',
        transform: [{ rotateZ: "20deg" }]
    },
    image:{
        height: '100%',
        width: '100%'
    },
    wrapper:{
        borderRadius: 16,
        shadowColor: "#ff0",
        shadowOpacity: .4,
        shadowRadius: 12,
    },
    container:{
        flexBasis: '25%',
        alignItems: 'center',
        padding: 20,
    }
})