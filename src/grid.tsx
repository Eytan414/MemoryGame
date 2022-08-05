import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from './card';

interface GridProps {
    size: number,
}

const generateGameData = (size: number):Card[] =>{
    const cards = Array<Card>();
    const randomSet = new Set<number>();

    for(let i=0; i<size/2; i++){
        let match:number;
        let index = calcNextIndex(randomSet);
        randomSet.add(index);
        while(true){
            let rand = Math.round(Math.random()*(size));
            if(randomSet.has(rand))
                continue;
            match = rand;
            randomSet.add(rand);
            break;
        }
            
        const [card, matchingCard]: Card[] = [{
            index,
            match,
            text: index*10+''
        },{
            index: match,
            match: index,
            text: index*10+''
        }];
        cards.push(card);
        cards.push(matchingCard);
    }
    return cards;
}

const calcNextIndex = (set:Set<number>):number=>{
    if(set.size === 0) return 0;

    for(let i=0; i<set.size; i++)//find lowest unoccupied slot
        if(!set.has(i))
            return i;
}

export const Grid = (props: GridProps) => {
    const cards = generateGameData(props.size);
    return (
        <View style={{...styles.gridContainer}}>
            {
                cards.map((card, index)=>{
                    return <Card key={index} index={card.index} match={card.match} text={card.text}/>
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // marginTop: 100,
    }
})