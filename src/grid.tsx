import { StyleSheet, View } from 'react-native';
import { Card } from './card';
import utilsService from "./utils.ts"

interface GridProps {
    size: number,
}

const generateGameData = (size: number):Card[] =>{
    let evens: Array<Card> = Array<Card>();
    for(let i=0; i<size/2; i++){
        const card: Card = {
            index: i,
            match: i+1,
            text: i+''
        };
        evens.push(card);
        const matchingCard: Card = {
            index: i+1,
            match: i-1,
            text: i+''
        };
        evens.push(matchingCard);
    }

    return evens;
}

export const Grid = (props: GridProps) => {
    let cards = generateGameData(props.size);
    utilsService.shuffle(cards);

    return (
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '50%',
            height: '100%',
            margin: 10
        }}>
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
        marginTop: 50,
    }
})