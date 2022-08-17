import React, { useRef } from 'react';
import { StyleSheet, Dimensions, Pressable, Animated } from 'react-native';

import { GameCard } from '../../../types';
import { CardBack } from './CardBack';
import { CardFace } from './CardFace';
import { CARD_MARGIN_BOTTOM, 
         CARD_MARGIN_SIDE, 
         CARD_MARGIN_TOP, 
         GRID_HEAD_HEIGHT,
         GRID_HEAD_PADDING_BOTTOM,
         GRID_HEAD_PADDING_TOP, 
         ROW_SIZE } from '../../../data/constants';

interface CardProps {
    index: number,
    cards: GameCard[],
    onPress(pressed: number): void,
}
export const CardComponent = (props: CardProps) => {
    const dims = Dimensions.get('window')
    const width = dims.width / ROW_SIZE - CARD_MARGIN_SIDE
    
    const rowCount:number = props.cards.length / ROW_SIZE
    const availableHeight:number = dims.height 
        - GRID_HEAD_HEIGHT
        - GRID_HEAD_PADDING_TOP //for extra spacing
    const height:number = availableHeight / rowCount 
        - CARD_MARGIN_TOP
        - CARD_MARGIN_BOTTOM
    
    const card = props.cards.filter((card) => {return card.index === props.index})[0]
    
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    // useEffect(() => {
    //     Animated.timing(
    //         fadeAnim, {
    //             toValue: 1,
    //             duration: 10000,
    //             useNativeDriver: false
    //         }
    //     ).start();
    // }, [fadeAnim])

    return (
        <Pressable disabled={card.disabled}
            onPress={() => { props.onPress(props.index) }}
            style={{
                // ...styles.container,
                width,
                height,
                maxWidth: width,
                maxHeight: height,
                marginVertical: CARD_MARGIN_TOP,
                marginHorizontal: CARD_MARGIN_SIDE,
                flexBasis: '20%',
                alignItems: 'center',
                borderRadius: 16,
                shadowColor: "#ff0",
                shadowOpacity: .4,
                shadowRadius: 6,
                opacity: card.disabled ? .5 : 1,
                backgroundColor: card.revealed ? 'lightcyan' : 'darkslateblue',
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