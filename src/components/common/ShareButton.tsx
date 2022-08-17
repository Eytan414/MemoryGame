import React from 'react';
import { Text, Pressable } from 'react-native';
import utilsService from '../../utils/utils';

interface Props{
    level: string,
    moves:number,
}

export const ShareButton = (props: Props) => {
    
    const shareScore = ():void => {
        let text = `Woo Hoo! finished in ${props.moves} moves on ${props.level} difficulty !`
        utilsService.shareScore(text)
    }

    return (
        <Pressable onPress={shareScore}
             style={{
                backgroundColor: 'lightsteelblue',
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,
                elevation: 2,
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