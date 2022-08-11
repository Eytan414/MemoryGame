import { useContext, useState } from 'react';
import { StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { GridContext } from './grid';

interface CardProps {
    index: number,
    // match: number,
    onPress(pressed: number): void;
}

export const Card = (props: CardProps) => {
    let dims = Dimensions.get('screen');
    let squareSize = dims.width / 12;
    const cards = useContext(GridContext);

    return (

        <Pressable disabled={cards[props.index].disabled}
            key={props.index}
            onPress={() => { props.onPress(props.index) }}
            style={{
                margin: 16,
                opacity: cards[props.index].disabled ? .5 : 1,
                padding: 20,
            }}>
            <Text style={{
                backgroundColor: cards[props.index].revealed ? 'blue' : 'red',
                color: 'white',
                fontSize: 20,
                width: squareSize,
                height: squareSize,
            }}>
                {cards[props.index].revealed ? cards[props.index].text : ''}
            </Text>
        </Pressable>
    )
}