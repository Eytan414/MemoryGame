import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, GestureResponderEvent } from 'react-native';

interface CardProps {
    match: number,
    index: number,
    text: string,
}

export const Card = (props: CardProps) => {
    const [backgroundColor, setBackgroundColor] = useState('red') 
    const [text] = useState(props.text);
    const [opacity, setOpacity] = useState(0);
    let dims = Dimensions.get('screen');
    let squareSize = dims.width/12;

    const cardOnClick = ($event:GestureResponderEvent) => {
        setBackgroundColor(backgroundColor === 'red' ? 'blue' : 'red');
        setOpacity(opacity === 0 ? 1 : 0);
    }
    return (
        <TouchableOpacity onPress={cardOnClick} style={{
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: squareSize,
            height: squareSize,
            margin: 16,
            flexBasis: '33%',
            backgroundColor: backgroundColor
        }}>
            <Text style={{
                opacity:opacity,
                alignItems: 'center',
                padding: 10,
                justifyContent: 'center',
                color: 'white',
                fontSize: 20, //TODO: responsive size

            }}>
                {text}
            </Text>           
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1%',
        padding: 10
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})