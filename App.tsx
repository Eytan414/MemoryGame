import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './src/card';
import { Grid } from './src/grid';

export default function App() {
  return (
    <View style={styles.container}>
      <Grid size={10}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: '#f0f',
    // alignItems: 'center',
  },
});
