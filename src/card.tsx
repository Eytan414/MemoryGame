import React, { useContext } from 'react';
import { Image, Text, Dimensions, Pressable, View } from 'react-native';
import { GridContext } from './grid';

interface CardProps {
    index: number,
    onPress(pressed: number): void,
}

export const CardComponent = (props: CardProps) => {
    let dims = Dimensions.get('screen')
    let colSize = dims.width * dims.scale / 12
    const cardsContext = useContext(GridContext)
    const card = cardsContext.filter((card) => {return card.index === props.index})[0]

    return (
        <Pressable disabled={card.disabled}
            key={props.index}
            onPress={() => { props.onPress(props.index) }}
            style={{
                flexBasis: '25%',
                alignItems: 'center',
                padding: 20,
            }}>
                <View style={{
                    opacity: card.disabled ? .5 : 1,
                    width: colSize,
                    height: colSize,
                    backgroundColor: card.revealed ? 'lightyellow' : 'coral',
                    borderRadius: 16,
                    shadowColor: "#ff0",
                    shadowOpacity: .4,
                    shadowRadius: 12,
                }}>
                {<>
                    <Text
                        style={{
                            display: card.revealed ? 'none' : 'flex',
                            height: '100%',
                            width: '100%',
                            color: 'gold',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 75,
                            fontWeight: 'bold',
                        }}
                    >?</Text>
                    <Image
                        source={card.imageUrl}
                        style={{
                            display: card.revealed ? 'flex' : 'none',
                            height: '100%',
                            width: '100%'
                        }} 
                    />
                </>}
            </View>
        </Pressable>
    )
}
