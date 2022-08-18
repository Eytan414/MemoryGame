import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {GameButton} from "./GameButton";
import { GRID_HEAD_HEIGHT, 
        GRID_HEAD_PADDING_BOTTOM,
        GRID_HEAD_PADDING_TOP, 
        PAGE_HOME } from '../../../data/constants';

interface Props{
    elpased:number,
    moves:number,
    currentStreak:number,
    bestStreak:number,
    navigation:any
}
export const GridHead = (props:Props) => {
    const elpasedColor: string = props.elpased < 50 ? 'white' : 'red'
    const liveStats = `Moves: ${props.moves} | Streak: Active ${props.currentStreak} Best ${props.bestStreak}`
    
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
                {props.elpased.toFixed(1)}
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