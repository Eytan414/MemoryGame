import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, Pressable, Animated } from 'react-native';

import { GameCard } from '../../../types';
import { CardBack } from './CardBack';
import { CardFace } from './CardFace';
import {
    CardsCount,
    CARD_MARGIN_BOTTOM,
    CARD_MARGIN_SIDE,
    CARD_MARGIN_TOP,
    FLIP_ANIMATION_SPEED,
    GRID_HEAD_HEIGHT,
    GRID_HEAD_PADDING_TOP,
    ITEMS_IN_EASY_ROW,
    ITEMS_IN_HARD_ROW,
    ITEMS_IN_INSANE_ROW,
    ITEMS_IN_INTERMEDIATE_ROW
} from '../../../data/constants';

interface CardProps {
    index: number,
    cards: GameCard[],
    onPress(pressed: number): void,
    flipped: boolean
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CardComponent = (props: CardProps) => {
    const calcFlexBasis = (cardCount: number, isPortrait:boolean):string => {
        if(isPortrait) return "18%" //mobile

        return cardCount === CardsCount.EASY ? "20%"
            : cardCount === CardsCount.INTERMEDIATE ? "18%"
            : cardCount === CardsCount.HARD ? "16%"
            :  "11%"
    }
        
    const calcCardsPerRow = (cardCount:number, isPortrait:boolean):number =>{
        if(isPortrait) return ITEMS_IN_EASY_ROW //mobile
        
        return cardCount === CardsCount.EASY
            ? ITEMS_IN_EASY_ROW 
            : cardCount === CardsCount.INTERMEDIATE
                ? ITEMS_IN_INTERMEDIATE_ROW 
            : cardCount === CardsCount.HARD
                ? ITEMS_IN_HARD_ROW 
            : ITEMS_IN_INSANE_ROW 
    }
    const cardCount = props.cards.length
    const dims = Dimensions.get('window')
    const isPortrait = dims.height / dims.width > 1

    const itemsPerRow = calcCardsPerRow(cardCount, isPortrait)
    const flexBasis = calcFlexBasis(cardCount, isPortrait)
    const width = dims.width / itemsPerRow - CARD_MARGIN_SIDE
    
    const rowCount: number = cardCount / itemsPerRow
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
                flexBasis,
                marginVertical: CARD_MARGIN_TOP,
                marginHorizontal: CARD_MARGIN_SIDE,
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

