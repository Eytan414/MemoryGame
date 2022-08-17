import React, { useMemo, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { CardsCount, CARD_DELAY_BEFORE_FLIP } from '../../../data/constants';
import { Card, Sounds } from '../../../types';
import utilsService from "../../../utils/utils";
import {CardComponent} from "./../Card/Card";
import { WinModal } from '../../modals/WinModal';
import { GridHead } from './GridHead';

const checkWinCondition = (cards:Array<Card>):boolean =>{
    for(const card of cards)
        if(card.disabled === false)
            return false
    return true
}

export const Grid = (props:any) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)    
    const [cardsArr, setCardsArr] = useState<Array<Card>>([])
    useMemo(()=>{
        utilsService.generateData(props.route.params.size)
            .then(cardsArr => {setCardsArr(cardsArr)}
    )},[props.route.params.size])
    
    const [moves, setMoves] = useState<number>(0)
    const [revealedCards, setRevealedCards] = useState<Set<Card>>(new Set<Card>())
    const [disableInteraction, setDisableInteraction] = useState<boolean>(false)
    
    let sounds:Sounds;
    useMemo( async ()=>{
        return await utilsService.loadSounds()
    },[])
    .then(calculateSounds =>{
        sounds = calculateSounds
    })

    const level = props.route.params.size === CardsCount.EASY ? 'easy'
        : props.route.params.size === CardsCount.INTERMEDIATE ? 'intermediate'
        : 'hard'

    const cardPressed = async (pressedCardIndex:number):Promise<void> =>{
        sounds.click.playAsync()
        let cards = [...cardsArr]
        let tmpRevealedCards = new Set<Card>(revealedCards)
        const pressedCard:Card = cards.filter((card)=>{return card.index === pressedCardIndex})[0]
        const matchingCard:Card = cards.filter((card)=>{return card.index === pressedCard.match})[0]
        
        if(pressedCard.revealed) return //case card "closed"
        
        pressedCard.revealed = !pressedCard.revealed
        tmpRevealedCards.add(pressedCard)
        
        if(tmpRevealedCards.size === 1) { //case 1st card opened
            setRevealedCards(tmpRevealedCards)
            return
        }
        setMoves(prevMoves => prevMoves + 1)

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
        setModalVisible(true)
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
    return (<>
        <GridHead
            navigation={props.navigation}
        />
        <View style={{       
            backgroundColor: '#212121',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}
            pointerEvents={disableInteraction ? "none" : "auto"} 
        >
            <WinModal 
                level={level}
                navigation={props.navigation}
                moves={moves}
                show={modalVisible}
            />
            { cardsArr.map((card, index)=>{ return (
                <CardComponent
                    onPress={cardPressed}
                    key={index} 
                    index={card.index} 
                    cards={cardsArr}
                />                        
            )}) }
        </View> 
    </>)
}