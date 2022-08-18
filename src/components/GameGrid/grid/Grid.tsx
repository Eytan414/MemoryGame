import React, { useEffect, useMemo, useState} from 'react';
import { View, StyleSheet, Animated } from 'react-native';
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
    const [loading, setLoading] = useState<boolean>(true)
    useMemo(async ()=>{
        utilsService.generateData(props.route.params.size)
            .then(cardsArr => {
                setLoading(false)
                setCardsArr(cardsArr)
            }
    )},[props.route.params.size])
    
    const [interaction, setInteraction] = useState({
        moves: 0,
        bestStreak: 0,
        currentStreak: 0,
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
        if(!interaction.gameActive) updateIsGameActive(true)

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
        updateCurrentStreak(0)
    }
    const handleHit = (card1:GameCard, card2:GameCard):void => {
        sounds.correct.playAsync();
        [   card1.disabled,
            card2.disabled,
            card1.revealed,
            card2.revealed
        ] = Array(4).fill(true)
        resetRevealedCards()
        updateCurrentStreak(interaction.currentStreak + 1)
    }
    const handleWin = ():void => {
        updateIsGameActive(false)
        sounds.win.playAsync()
        setModalVisible(true)
    }
    const resetRevealedCards = ():void => {
        const cards = [...cardsArr]
        for (const card of cards){
            if(card.disabled) continue
            if(card.revealed){
                // card.revealed = false
                card.flipped = !card.flipped
                // flipCard(card)
            }
        }
        setCardsArr(cards)
        setRevealedCards(new Set<GameCard>())
    }
    const flipCard = (card:GameCard) => {

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
    const updateBestStreak = (newStreak:number) => {
        setInteraction(prevMoves => {
            let interaction = {...prevMoves}
            interaction.bestStreak = newStreak
            return interaction
        }) 
    }
    const updateCurrentStreak = (newStreak:number) => {
        setInteraction(prevMoves => {
            let interaction = {...prevMoves}
            interaction.currentStreak = newStreak
            return interaction
        }) 
        if(newStreak > interaction.bestStreak)
            updateBestStreak(newStreak)
    }
    return (
        loading ? <h1>loading</h1>
        :
            <>
            <GridHead
                navigation={props.navigation}
                elpased={elpased}
                moves={interaction.moves}
                bestStreak={interaction.bestStreak}
                currentStreak={interaction.currentStreak}
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
                    cardsCount={cardsArr?.length}
                    navigation={props.navigation}
                    moves={interaction.moves}
                    time={elpased}
                    show={modalVisible}
                />
                { cardsArr.map((card, index)=>(
                    <CardComponent
                        onPress={cardPressed}
                        key={index}
                        index={card.index}
                        cards={cardsArr}
                        flipped={card.flipped} />
                )) }
            </View> 
        </>
    )
}