import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CardsCount, DEFAULT_BACKGROUND_COLOR, EMPTY_RECORD, EMPTY_RECORDS, Level} from '../../data/constants';
import { LevelStats, Records } from '../../types';
import storage from '../../utils/storage';
import { ChooseLevelButton } from './ChooseLevelButton';
import { LevelRecords } from './LeveLRecords';

export const Home = ({navigation}) => {
    let allRecords:Records = EMPTY_RECORDS
    const [easy, setEasy] = useState<LevelStats>(EMPTY_RECORD)
    const [intermediate, setIntermediate] = useState<LevelStats>(EMPTY_RECORD)
    const [hard, setHard] = useState<LevelStats>(EMPTY_RECORD)
    const [insane, setInsane] = useState<LevelStats>(EMPTY_RECORD)

    useEffect(() => {//refresh records each navigation to home screen 
        const unsubscribe = navigation.addListener('focus', async() => {
            allRecords = await storage.getRecords() as unknown as Records;
            setEasy(allRecords[Level.EASY])
            setIntermediate(allRecords[Level.INTERMEDIATE])
            setHard(allRecords[Level.HARD])
            setInsane(allRecords[Level.INSANE])
          });
          return unsubscribe;       
    }, [])    


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
                    <View style={{}}>
                        <ChooseLevelButton navigation={navigation} level={CardsCount.EASY} />
                        <LevelRecords stats={easy}></LevelRecords>
                    </View>
                    <View style={{}}>
                        <ChooseLevelButton navigation={navigation} level={CardsCount.INTERMEDIATE} />
                        <LevelRecords stats={intermediate}></LevelRecords>
                    </View>
                    <View style={{}}>
                        <ChooseLevelButton navigation={navigation} level={CardsCount.HARD} />
                        <LevelRecords stats={hard}></LevelRecords>
                    </View>
                    <View style={{}}>
                        <ChooseLevelButton navigation={navigation} level={CardsCount.INSANE} />
                        <LevelRecords stats={insane}></LevelRecords>
                    </View>
                </View>
            </>}
        </View>
    )
}