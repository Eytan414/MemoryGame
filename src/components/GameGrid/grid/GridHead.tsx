import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PAGE_HOME } from '../../../data/constants';
import {GameButton} from "./GameButton";

interface Props{
    navigation:any
}
export const GridHead = (props:Props) => {
    return (
        <View style={{
            height: 80,
            paddingTop: 20,
            paddingBottom: 30,
            backgroundColor: '#212121',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <GameButton
                navigation={props.navigation} 
                pageToNavigate={PAGE_HOME} 
                title={PAGE_HOME} 
            />
        </View>
    )
}