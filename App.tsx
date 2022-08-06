import { StyleSheet, Text, View } from 'react-native';
import { Grid } from './src/grid';

export default function App() {
  return (
    <View style={{
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Grid size={12}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
