import React from 'react';
import { Text, Pressable } from 'react-native';
import { LevelStats, Records } from '../../types';
import storage from '../../utils/storage';

interface Props{
    stats: LevelStats,
}

export const LevelRecords = (props: Props) => {
    const recordsText = `| 👣: ${props.stats?.moves} | 🔥: ${props.stats?.streak} | ⏱️: ${props.stats?.time} seconds |`
    return (
        <Text style={{
            fontSize: 16,
            alignSelf: 'center',
            color: '#7cb342',
            fontFamily: 'Helvetica',
            marginTop: 8,
            marginBottom: 12
        }}>
            {recordsText}
        </Text>
    )
}