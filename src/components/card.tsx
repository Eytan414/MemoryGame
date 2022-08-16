import React, { useContext } from 'react';
import { StyleSheet, Image, Text, Dimensions, Pressable, View } from 'react-native';
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
            onPress={() => { props.onPress(props.index) }}
            style={{
                // ...styles.container,
                flexBasis: '25%',
                alignItems: 'center',
                padding: 20,
                // maxHeight,
            }}>
                <View style={{
                    // ...styles.wrapper,
                    borderRadius: 16,
                    shadowColor: "#ff0",
                    shadowOpacity: .4,
                    shadowRadius: 12,
                    opacity: card.disabled ? .5 : 1,
                    backgroundColor: card.revealed ? 'lightcyan' : 'darkslateblue',
                    width: colSize,
                    height: colSize,
                    
                }}>
                {<>
                    <Image
                        source={card.imageUrl}
                        style={{
                            // ...styles.image,
                            height: '100%',
                            width: '100%',
                            display: card.revealed ? "flex" : "none"
                        }} 
                    />
                    
                    <Text
                        style={{
                            // ...styles.text,
                            height: '100%',
                            width: '100%',
                            color: 'gold',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 60,
                            fontWeight: 'bold',
                            transform: [{ rotateZ: "20deg" }, {translateY:10}],
                            display: card.revealed ? "none" : "flex"
                        }}
                    >?</Text>
                </>}
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    text:{
        height: '100%',
        width: '100%',
        color: 'gold',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 80,
        fontWeight: 'bold',
        transform: [{ rotateZ: "20deg" }]
    },
    image:{
        height: '100%',
        width: '100%'
    },
    wrapper:{
        borderRadius: 16,
        shadowColor: "#ff0",
        shadowOpacity: .4,
        shadowRadius: 12,
    },
    container:{
        flexBasis: '25%',
        alignItems: 'center',
        padding: 20,
    }
})