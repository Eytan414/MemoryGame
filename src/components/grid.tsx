import React, { useMemo, useState} from 'react';
import { View } from 'react-native';
import { Card } from '../types';
import utilsService from "../utils/utils";
import {SoundType} from "../data/constants";
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
    // let cards:Array<Card> = useMemo(()=>{
    //     return utilsService.generateData(props.size)
    // },[])
    let cards:Array<Card> = utilsService.generateData(props.size)
    const [cardsArr, setCardsArr] = useState<Array<Card>>(cards)
    if(cards.length !== cardsArr.length)
        setCardsArr(cards)
    
    const [moves, setMoves] = useState<number>(1)
    const [revealedCards, setRevealedCards] = useState<Set<Card>>(new Set<Card>())
    const [disableInteraction, setDisableInteraction] = useState<boolean>(false)

    const cardPressed = (pressedCardIndex:number):void =>{
        let cards = [...cardsArr]
        let tmpRevealedCards = new Set<Card>(revealedCards)
        const pressedCard:Card = cards.filter((card)=>{return card.index === pressedCardIndex})[0]
        const matchingCard:Card = cards.filter((card)=>{return card.index === pressedCard.match})[0]
        
        utilsService.playSound(SoundType.CARD_CLICKED)
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
        //show cards for .75 sec so user can see them 
        setTimeout(()=>{
            utilsService.playSound(SoundType.PAIR_WRONG)
            resetRevealedCards()
            setDisableInteraction(false)
        }, 750) 
    }
    const handleHit = (card1:Card, card2:Card):void => {
        card1.disabled = true
        card2.disabled = true
        card1.revealed = true
        card2.revealed = true
        resetRevealedCards()
        utilsService.playSound(SoundType.PAIR_CORRECT)
    }
    const handleWin = ():void => {
        utilsService.showAlert(`Woo Hoo! finished in ${moves} moves`, 3333)
        utilsService.playSound(SoundType.WIN)
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
                margin: 10,
            }}>
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
export const GridContext = React.createContext(Array<Card>())