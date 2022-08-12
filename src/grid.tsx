import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Card } from './card';
import utilsService from "./utils";

interface GridProps {
    size: number,
}

const generateData = (size:number):Array<Card> => {
    let cards:Array<Card> = Array<Card>()
    for(let i=0; i<size; i+=2){
        const card: Card = {
            index: i,
            match: i+1,
            text: i+'',
            revealed: false,
            disabled: false,
        }
        cards.push(card)
        const matchingCard: Card = {
            index: i+1,
            match: i,
            text: i+'',
            revealed: false,
            disabled: false,
        }
        cards.push(matchingCard)
    }
    utilsService.shuffle(cards)
    return cards
}


const checkWinCondition = (cards:Array<Card>):boolean =>{
    for(const card of cards)
        if(card.disabled === false)
            return false
    return true
}
export const Grid = (props: GridProps) => {
    let cards: Array<Card> = generateData(props.size)
    const [moves, setMoves] = useState<number>(1)
    const [cardsArr, setCardsArr] = useState<Array<Card>>(cards)
    const [revealedCards, setRevealedCards] = useState<Set<Card>>(new Set<Card>())
    const [disableInteraction, setDisableInteraction] = useState<boolean>(false)

    const cardPressed = (pressedCardIndex:number):void =>{
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
        //show cards for .5 sec so user can see them 
        setTimeout(()=>{
            resetRevealedCards()
            setDisableInteraction(false)
        }, 500) 
    }
    const handleHit = (card1:Card, card2:Card):void => {
        card1.disabled = true
        card2.disabled = true
        card1.revealed = true
        card2.revealed = true
        resetRevealedCards()
    }
    const handleWin = ():void => {
        setTimeout(()=>{
            alert(`Woo Hoo! finished in ${moves} moves`)//TODO:decide how victory behaves
        }, 50) 
        resetRevealedCards()
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
                        <Card 
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