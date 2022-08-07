import { useState } from 'react';
import { StyleSheet, Text, Dimensions, Pressable } from 'react-native';

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

    const cardOnClick = () => {
        setBackgroundColor(backgroundColor === 'red' ? 'blue' : 'red');
        setOpacity(opacity === 0 ? 1 : 0);
        let pressedElement:HTMLElement = event.target as HTMLElement;
        let index = Array.from(pressedElement.parentElement.children).indexOf(pressedElement);
        //TODO: add ref to cards arr
        //TODO: check if cards match and disable them, else flip both back  
        //TODO: check win condition  
    }
    return (
        <Pressable onPress={cardOnClick} 
            style={{
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
        </Pressable>
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