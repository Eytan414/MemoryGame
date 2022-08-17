import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { CardsCount, DEFAULT_BACKGROUND_COLOR} from '../../data/constants';
import { ChooseLevelButton } from './ChooseLevelButton';

export const Home = ({navigation}) => {
    return (
        <View style={{
            backgroundColor: DEFAULT_BACKGROUND_COLOR,
            alignItems: 'center',
            width: '100%',
            height: '100%',}}
        >
            {<>
                <Text style={{
                    fontSize: 36,
                    fontWeight: '900',
                    marginBottom: '10%',
                    color: 'rebeccapurple',
                    textAlign: 'center',
                }}>
                    Best memory game ever! arguably 
                </Text>
                <Text style={{
                    fontSize: 24,
                    color: 'white',
                    marginBottom: 0
                }}>
                    Choose your destiny:
                </Text>
                <View style={{
                    height: '50%',
                    justifyContent: 'space-evenly',
                }}>
                    <ChooseLevelButton navigation={navigation} level={CardsCount.EASY} />
                    <ChooseLevelButton navigation={navigation} level={CardsCount.INTERMEDIATE} />
                    <ChooseLevelButton navigation={navigation} level={CardsCount.HARD} />
                </View>
            </>}
        </View>
    )
}