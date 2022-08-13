import React from 'react';
import { View, Image } from 'react-native';
import { Grid } from './src/grid';

export default function App() {
  return (
    <View style={{
      backgroundColor: '#212121',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}>
      <Grid size={16}/>
    </View>
  )
}