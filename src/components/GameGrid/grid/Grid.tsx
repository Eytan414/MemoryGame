import React, { useEffect, useMemo, useState} from 'react';
import { View } from 'react-native';
import { CARD_DELAY_BEFORE_FLIP_BACK, DEFAULT_BACKGROUND_COLOR } from '../../../data/constants';
import { GameCard, LevelStats, Records, Sounds } from '../../../types';
import utils from "../../../utils/utils";
import storage from "../../../utils/storage";
import {CardComponent} from "./../Card/Card";
import { WinModal } from '../../modals/WinModal';
import { GridHead } from './GridHead';

const checkWinCondition = (cards:Array<GameCard>):boolean =>{
    for(const card of cards)
        if(card.disabled === false)
            return false
    return true
}

interface Props{
    navigation:any,
    route:any
}
export const Grid = (props:Props) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)    
    const [cardsArr, setCardsArr] = useState<Array<GameCard>>([])
    const [loading, setLoading] = useState<boolean>(true)
    useMemo(async ()=>{
        utils.generateData(props.route.params.size)
            .then(cardsArr => {
                setLoading(false)
                setCardsArr(cardsArr)
            }
    )},[props.route.params.size])
    
    const [gameData, updateGameData] = useState({
        moves: 0,
        bestStreak: 0,
        currentStreak: 0,
        gameActive: false,
        gameWon: false,
    })
    const [revealedCards, setRevealedCards] = useState<Set<GameCard>>(new Set<GameCard>())
    const [disableInteraction, setDisableInteraction] = useState<boolean>(false)
    const [elpased, setElpased] = useState<number>(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(gameData.gameActive)
                setElpased(prevState => prevState + .1)
        }, 100)
        return () => clearInterval(interval)
    },[gameData.gameActive])
    
    useEffect(()=>{
        if(!gameData.gameWon) return
        updateIsGameActive(false)
        sounds.win.playAsync()
        setModalVisible(true)
        updateRecordIfNeeded()
    },[gameData.gameWon])

    let sounds:Sounds;
    useMemo( async ()=>{
        return await utils.loadSounds()
    },[])
    .then(calculateSounds => sounds = calculateSounds)

    const level = utils.getLevelName(props.route.params.size)

    const cardPressed = async (pressedCardIndex:number):Promise<void> =>{
        sounds.click.playAsync()
        if(!gameData.gameActive) updateIsGameActive(true)

        let cards = [...cardsArr]
        let tmpRevealedCards = new Set<GameCard>(revealedCards)
        const pressedCard:GameCard = cards.filter((card)=>{return card.index === pressedCardIndex})[0]
        const matchingCard:GameCard = cards.filter((card)=>{return card.index === pressedCard.match})[0]
        
        if(pressedCard.revealed) return //case card "closed"
        
        pressedCard.revealed = !pressedCard.revealed
        pressedCard.flipped = !pressedCard.flipped
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
        await handleHit(pressedCard, matchingCard)
        if(checkWinCondition(cards)) setWinState()
    }
    const handleMiss = ():void => {
        setDisableInteraction(true)
        setTimeout(()=>{
            sounds.wrong.playAsync()
            resetRevealedCards()
            setDisableInteraction(false)
        }, CARD_DELAY_BEFORE_FLIP_BACK) 
        updateCurrentStreak(0)
    }
    const handleHit = async (card1:GameCard, card2:GameCard)=> {
        card1.disabled = true
        card2.disabled = true
        card1.revealed = true
        card2.revealed = true
        resetRevealedCards()
        updateCurrentStreak(gameData.currentStreak + 1)
        await sounds.correct.playAsync()
    }
    // const handleWin = ():void => {        updateIsGameActive(false)
    //     sounds.win.playAsync()
    //     setModalVisible(true)
    //     updateRecordIfNeeded()
    // }
    const updateRecordIfNeeded = async() => {
        const records:Records = await storage.getRecords() as unknown as Records
        const newRecord:LevelStats = {
            time: elpased < records[level].time ?
                  elpased.toFixed(1) 
                : records[level].time,
            moves: gameData.moves < records[level].moves ?
                  gameData.moves 
                : records[level].moves,
            streak: gameData.bestStreak > records[level].streak ?
                  gameData.bestStreak 
                : records[level].streak
        }
        records[level] = newRecord        
        storage.updateRecords(records)
    }
    const resetRevealedCards = ():void => {
        const cards = [...cardsArr]
        for (const card of cards){
            if(card.disabled) continue
            if(card.revealed){
                card.revealed = false
                card.flipped = !card.flipped
            }
        }
        setCardsArr(cards)
        setRevealedCards(new Set<GameCard>())
    }
    const incrementMoves = () => {
        updateGameData(prevGameData => {
            let gameData = {...prevGameData}
            gameData.moves += 1
            return gameData
        }) 
    }
    const updateIsGameActive = (gameActive:boolean) => {
        updateGameData(prevGameData => {
            let gameData = {...prevGameData}
            gameData.gameActive = gameActive
            return gameData
        }) 
    }
    const setWinState = (gameWon:boolean = true) => {
        updateGameData(prevGameData => {
            let gameData = {...prevGameData}
            gameData.gameWon = gameWon
            return gameData
        }) 
    }
    const updateBestStreak = (newStreak:number) => {
        updateGameData(prevGameData => {
            let gameData = {...prevGameData}
            gameData.bestStreak = newStreak
            return gameData
        }) 
    }
    const updateCurrentStreak = (newStreak:number) => {
        updateGameData(prevGameData => {
            let gameData = {...prevGameData}
            gameData.currentStreak = newStreak
            return gameData
        }) 
        if(newStreak > gameData.bestStreak)
            updateBestStreak(newStreak)
    }
    
    return (
        loading ? <h1>Loading...</h1>
        :
            <>
            <GridHead
                navigation={props.navigation}
                gameData={{elpased, ...gameData}}
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
                    moves={gameData.moves}
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