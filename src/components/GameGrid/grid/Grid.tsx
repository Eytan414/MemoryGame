import React, { useEffect, useMemo, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { CardsCount, CARD_DELAY_BEFORE_FLIP, DEFAULT_BACKGROUND_COLOR } from '../../../data/constants';
import { GameCard, Sounds } from '../../../types';
import utilsService from "../../../utils/utils";
import {CardComponent} from "./../Card/Card";
import { WinModal } from '../../modals/WinModal';
import { GridHead } from './GridHead';

const checkWinCondition = (cards:Array<GameCard>):boolean =>{
    for(const card of cards)
        if(card.disabled === false)
            return false
    return true
}

export const Grid = (props:any) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)    
    const [cardsArr, setCardsArr] = useState<Array<GameCard>>([])
    useMemo(()=>{
        utilsService.generateData(props.route.params.size)
            .then(cardsArr => {setCardsArr(cardsArr)}
    )},[props.route.params.size])
    
    const [interaction, setInteraction] = useState({
        moves: 0,
        gameActive: false
    })
    const [revealedCards, setRevealedCards] = useState<Set<GameCard>>(new Set<GameCard>())
    const [disableInteraction, setDisableInteraction] = useState<boolean>(false)
    const [elpased, setElpased] = useState<number>(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(interaction.gameActive)
                setElpased(prevState => prevState + .1)
        }, 100)
        return () => clearInterval(interval)
    },[interaction.gameActive])


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
        updateIsGameActive(true)
        let cards = [...cardsArr]
        let tmpRevealedCards = new Set<GameCard>(revealedCards)
        const pressedCard:GameCard = cards.filter((card)=>{return card.index === pressedCardIndex})[0]
        const matchingCard:GameCard = cards.filter((card)=>{return card.index === pressedCard.match})[0]
        
        if(pressedCard.revealed) return //case card "closed"
        
        pressedCard.revealed = !pressedCard.revealed
        tmpRevealedCards.add(pressedCard)
        
        if(tmpRevealedCards.size === 1) { //case 1st card opened
            setRevealedCards(tmpRevealedCards)
            return
        }
        incrementMoves()

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
    const handleHit = (card1:GameCard, card2:GameCard):void => {
        sounds.correct.playAsync();
        [   card1.disabled,
            card2.disabled,
            card1.revealed,
            card2.revealed
        ] = Array(4).fill(true)
        resetRevealedCards()
    }
    const handleWin = ():void => {
        updateIsGameActive(false)
        sounds.win.playAsync()
        setModalVisible(true)
    }
    const resetRevealedCards = ():void => {
        const cards = [...cardsArr]
        for (const card of cards)
            if(card.revealed && !card.disabled)
                card.revealed = false
        setCardsArr(cards)
        setRevealedCards(new Set<GameCard>())
    }
    const incrementMoves = () => {
        setInteraction(prevMoves => {
            let interaction = {...prevMoves}
            interaction.moves += 1
            return interaction
        }) 
    }
    const updateIsGameActive = (gameActive:boolean) => {
        setInteraction(prevMoves => {
            let interaction = {...prevMoves}
            interaction.gameActive = gameActive
            return interaction
        }) 
    }
    return (
            <>
            <GridHead
                navigation={props.navigation}
                elpased={elpased}
                moves={interaction.moves}
            />
            <View style={{       
                backgroundColor: DEFAULT_BACKGROUND_COLOR,
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '85%',
                alignSelf: 'center'
            }}
                pointerEvents={disableInteraction ? "none" : "auto"} 
            >
                <WinModal 
                    level={level}
                    navigation={props.navigation}
                    moves={interaction.moves}
                    time={elpased}
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
        </>
    )
}