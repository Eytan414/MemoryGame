import React from 'react';
import { Text, Pressable } from 'react-native';
import utils from '../../utils/utils';

interface Props{
    level: string,
    moves:number,
    time:number,
}

export const ShareButton = (props: Props) => {
    
    const shareScore = ():void => {
        const text = `Woo Hoo! finished in ${props.moves} moves and ${props.time.toFixed(1)} seconds on ${props.level} difficulty !`
        utils.shareScore(text)
    }

    return (
        <Pressable onPress={shareScore}
             style={{
                backgroundColor: 'lightsteelblue',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 55,
                elevation: 3,
            }}
        >
            <Text style={{
                color: 'green',
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 16 
            }}>Share</Text>
        </Pressable>
    )
}