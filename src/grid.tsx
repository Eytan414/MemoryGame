import React, { useMemo, useState} from 'react';
import { View } from 'react-native';
import { Card } from './types.d';
import utilsService, {SoundTypes} from "./utils";
import {CardComponent} from "./card";
import { Audio } from 'expo-av';

import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

interface GridProps {
    size: number,
}
// const showAlert = (title: string, message: string = '') => {
//     Alert.alert(title, message, [
//       { text: 'OK' },
//   ]);
// }

//TODO: replace with working alert (might be broken only in chrome)
const showAlert = (msg:string, duration:number) => { 
    let alt:HTMLElement = document.createElement("div")
     alt.setAttribute("style",`font-size: 2rem; 
        position: fixed; top: 33%;
        background-color: peachpuff;
        left: 50%; top: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem;
        min-width: 50%;
        height: 33%; max-width: 85%;
        border-radius: 1rem;
        color: blue;
        font-weight: bold;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;`);
     alt.innerHTML = msg;
     setTimeout(function(){
      alt.parentNode?.removeChild(alt);
     }, duration);
     document.body.appendChild(alt);
}
const playSound = async (soundType:number) => {
    if(soundType === SoundTypes.WIN){
        const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/win.wav'))
        await sound.playAsync()
    }
}
const generateData = (size:number):Array<Card> => {
    let cards:Array<Card> = Array<Card>()
    const randomsSet:Set<number> = new Set<number>()
    const imageObj = utilsService.loadImages()
    for(let index=0; index<size; index+=2){
        let randomImage: number = Math.round(Math.random() * size)
        while(randomsSet.has(randomImage))
            randomImage = Math.round(Math.random() * size/2)

        randomsSet.add(randomImage)
        const randomImageURL: string = imageObj[randomImage]

        const card: Card = {
            index,
            match: index+1,
            imageUrl: randomImageURL,
            revealed: false,
            disabled: false,
        }
        cards.push(card)
        const matchingCard: Card = {
            index: index+1,
            match: index,
            imageUrl: randomImageURL,
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
    let cards:Array<Card> = useMemo(()=>{
        return generateData(props.size)
    },[])
    
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
        //show cards for .75 sec so user can see them 
        setTimeout(()=>{
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
    }
    const handleWin = ():void => {
        showAlert(`Woo Hoo! finished in ${moves} moves`, 3333)

        playSound(SoundTypes.WIN)
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