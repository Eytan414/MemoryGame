import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {GameButton} from "./GameButton";
import {GameData} from "../../../types"
import { GRID_HEAD_HEIGHT, 
        GRID_HEAD_PADDING_BOTTOM,
        GRID_HEAD_PADDING_TOP, 
        PAGE_HOME } from '../../../data/constants';

interface Props{
    gameData: GameData,
    navigation:any
}
export const GridHead = (props:Props) => {
    const {elpased, moves, currentStreak, bestStreak} = props.gameData
    const elpasedColor: string = elpased < 50 ? 'white' : 'red'
    const liveStats = `Moves: ${moves} | Streak: Active ${currentStreak} Best ${bestStreak}`
    
    return (
        <View style={{
            height: GRID_HEAD_HEIGHT,
            paddingTop: GRID_HEAD_PADDING_TOP,
            paddingBottom: GRID_HEAD_PADDING_BOTTOM,
            backgroundColor: '#212121',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center'
        }}>
            <><Text style={{
                color: elpasedColor,
                fontSize: 20,
                fontWeight: 'bold',
                padding: 8
            }}>
                {elpased.toFixed(1)}
            </Text>
            <GameButton
                navigation={props.navigation} 
                pageToNavigate={PAGE_HOME} 
                title={PAGE_HOME} 
            />
            <Text style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                padding: 8
            }}>
                {liveStats}
            </Text>
        </></View>
    )
}