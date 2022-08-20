import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, Pressable, Animated } from 'react-native';

import { GameCard } from '../../../types';
import { CardBack } from './CardBack';
import { CardFace } from './CardFace';
import {
    CARD_MARGIN_BOTTOM,
    CARD_MARGIN_SIDE,
    CARD_MARGIN_TOP,
    FLIP_ANIMATION_SPEED,
    GRID_HEAD_HEIGHT,
    GRID_HEAD_PADDING_TOP,
    ITEMS_IN_ROW
} from '../../../data/constants';

interface CardProps {
    index: number,
    cards: GameCard[],
    onPress(pressed: number): void,
    flipped: boolean
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CardComponent = (props: CardProps) => {
    const dims = Dimensions.get('window')
    const width = dims.width / ITEMS_IN_ROW - CARD_MARGIN_SIDE
    
    const rowCount: number = props.cards.length / ITEMS_IN_ROW
    const availableHeight: number = dims.height
        - GRID_HEAD_HEIGHT
        - GRID_HEAD_PADDING_TOP //for extra spacing
    const height: number = availableHeight / rowCount
        - CARD_MARGIN_TOP
        - CARD_MARGIN_BOTTOM

    const [showFront, setShowFront] = useState<boolean>(true)
    const [showBack, setShowBack] = useState<boolean>(false)
    const card = props.cards.filter((card) => { return card.index === props.index })[0]
    const rotateAnim = useRef(new Animated.Value(props.flipped ? 0 : 1)).current
    const rotateY = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })
    const toggleVisibility = ()=>{
        setShowFront(prev => !prev)
        setShowBack(prev => !prev)
    }
    useEffect(() => {
        Animated.timing(
            rotateAnim, {
            toValue: props.flipped ? 0 : 1,
            duration: FLIP_ANIMATION_SPEED,
            useNativeDriver: true
        }).start()
        toggleVisibility()
        
    }, [props.flipped])
    

    return (
        <AnimatedPressable
            disabled={card.disabled}
            onPress={() => { props.onPress(props.index) }}
            style={{
                // ...styles.container,
                height,
                transform: [ { rotateY } ],
                width,
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
            }}
        >
            <CardFace
                show={showFront}
                imageUrl={card.imageUrl}
            />
            <CardBack
                show={showBack}
            />
        </AnimatedPressable>
    )
}
const styles = StyleSheet.create({
    text: {
        height: '100%',
        width: '100%',
        color: 'gold',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 80,
        fontWeight: 'bold',
        // transform: [{ rotateZ: "20deg" }]
    },
    image: {
        height: '100%',
        width: '100%'
    },
    wrapper: {
        borderRadius: 16,
        shadowColor: "#ff0",
        shadowOpacity: .4,
        shadowRadius: 12,
    },
    container: {
        flexBasis: '25%',
        alignItems: 'center',
        padding: 20,
    }
})