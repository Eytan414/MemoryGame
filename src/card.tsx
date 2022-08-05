import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CardProps {
    match: number,
    index: number,
    text: string,
}

export const Card = (props: CardProps) => {
    const [backgroundColor, setBackgroundColor] = useState('red') 
    const [text, setText] = useState('') ;

    const cardOnClick = () => {
        setBackgroundColor(backgroundColor === 'red' ? 'blue' : 'red');
        setText(text === '' ? props.text : '');
    }
    return (
        <View style={{...styles.cardContainer, backgroundColor: backgroundColor}}>
            <TouchableOpacity style={styles.textContainer} onPress={cardOnClick}>
                <Text style={{color: 'white'}}>
                    {text}
                </Text>
            </TouchableOpacity>           
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1%'    
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})