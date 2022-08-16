import React, { useEffect, useMemo, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { CARD_DELAY_BEFORE_FLIP, POPUP_DURATION } from '../data/constants';
import { Card, Sounds } from '../types';
import utilsService from "../utils/utils";
import {CardComponent} from "./card";

interface GridProps {
    size: number,
}

const checkWinCondition = (cards:Array<Card>):boolean =>{
    for(const card of cards)
        if(card.disabled === false)
            return false
    return true
}

export const Grid = (props: GridProps) => {
    const [cardsArr, setCardsArr] = useState<Array<Card>>([])
    useEffect(()=>{
        utilsService.generateData(props.size)
            .then(cardsArr => {setCardsArr(cardsArr)}
    )},[props.size])
    
    const [moves, setMoves] = useState<number>(1)
    const [revealedCards, setRevealedCards] = useState<Set<Card>>(new Set<Card>())
    const [disableInteraction, setDisableInteraction] = useState<boolean>(false)
    
    let sounds:Sounds;
    useMemo( async ()=>{
        return await utilsService.loadSounds()
    },[])
    .then(calculateSounds =>{
        sounds = calculateSounds
    })

    const cardPressed = async (pressedCardIndex:number):Promise<void> =>{
        sounds.click.playAsync()
        let cards = [...cardsArr]
        let tmpRevealedCards = new Set<Card>(revealedCards)
        const pressedCard:Card = cards.filter((card)=>{return card.index === pressedCardIndex})[0]
        const matchingCard:Card = cards.filter((card)=>{return card.index === pressedCard.match})[0]
        
        pressedCard.revealed = !pressedCard.revealed
        if(!pressedCard.revealed) { //case card "closed"
            resetRevealedCards()
            return
        }

        tmpRevealedCards.add(pressedCard)
        if(tmpRevealedCards.size === 1) { //case 1st card opened
            setRevealedCards(tmpRevealedCards)
            return
        }
        setMoves(moves+1)
        if(!matchingCard.revealed){//case 2nd card opened
            handleMiss()            
            return
        } 
        handleHit(pressedCard, matchingCard)

        if(checkWinCondition(cards)) handleWin()
    }
    const handleMiss = ():void => {
        setDisableInteraction(true)
        setTimeout(()=>{
            sounds.wrong.playAsync()
            resetRevealedCards()
            setDisableInteraction(false)
        }, CARD_DELAY_BEFORE_FLIP) 
    }
    const handleHit = (card1:Card, card2:Card):void => {
        sounds.correct.playAsync();
        [   card1.disabled,
            card2.disabled,
            card1.revealed,
            card2.revealed
        ] = Array(4).fill(true)
        resetRevealedCards()
    }
    const handleWin = ():void => {
        utilsService.showAlert(`Woo Hoo! finished in ${moves} moves`, POPUP_DURATION)
        sounds.win.playAsync()
    }
    const resetRevealedCards = ():void => {
        let cards = [...cardsArr]
        for (const card of cards)
            if(card.revealed && !card.disabled)
                card.revealed = false
        setCardsArr(cards)
        setRevealedCards(new Set<Card>())
    }

    return (
        <View pointerEvents={disableInteraction ? "none" : "auto"} 
            style={{       
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: 10,}}>
            <GridContext.Provider value={cardsArr}>
                {cardsArr.map((card, index)=>{
                    return (
                        <CardComponent
                            onPress={cardPressed}
                            key={index} 
                            index={card.index} 
                        />                        
                    )
                })}
            </GridContext.Provider>
        </View> 
    )
}
const styles = StyleSheet.create({
    mainContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
    }
})
export const GridContext = React.createContext(Array<Card>())