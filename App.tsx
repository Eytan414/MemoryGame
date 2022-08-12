import { View } from 'react-native';
import { Grid } from './src/grid';

export default function App() {
  return (
    <View style={{
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}>
      <Grid size={12}/>
    </View>
  );
}