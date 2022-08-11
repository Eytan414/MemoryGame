import React from 'react';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { Card } from './card';
import utilsService from "./utils.ts"

interface GridProps {
    size: number,
}

const generateData = (size:number):Array<Card> => {
    let cards:Array<Card> = Array<Card>();
    for(let i=0; i<size; i+=2){
        const card: Card = {
            index: i,
            match: i+1,
            text: i+'',
            revealed: false,
            disabled: false,
        };
        cards.push(card);
        const matchingCard: Card = {
            index: i+1,
            match: i,
            text: i+'',
            revealed: false,
            disabled: false,
        };
        cards.push(matchingCard);
    }
    // utilsService.shuffle(cards);
    return cards;
}
const checkWinCondition = (cards:Array<Card>):boolean =>{
    for(const card of cards)
        if(card.disabled === false)
            return false
    return true
}
export const Grid = (props: GridProps) => {
    let cards: Array<Card> = generateData(props.size);
    const [cardsArr, setCardsArr] = useState(cards)

    const cardPressed = (pressedCardIndex:number):void =>{
        let cards = [...cardsArr];
        const pressedCard:Card = cards[pressedCardIndex];
        const matchingCard:Card = cards[pressedCard.match];
        pressedCard.revealed = !pressedCard.revealed;
        
        if(pressedCard.revealed && matchingCard.revealed){
            pressedCard.disabled = true;
            matchingCard.disabled = true;
        }
        const didWin: boolean = checkWinCondition(cards)       
        if(didWin){
            // TODO: handle win...
            alert('woo hoo')
            setCardsArr(cards)
            return
        } 
        // TODO: flip cards if two are open
            // for (const card of cards) 
            //     if(card.revealed && !card.disabled)
            //         card.revealed = false
        setCardsArr(cards);
    };
    return (
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '60%',
            height: '100%',
            margin: 10
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
export const GridContext = React.createContext([]);

/* const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50,
    }
}) */