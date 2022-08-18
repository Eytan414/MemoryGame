import AsyncStorage from '@react-native-async-storage/async-storage';
import { EMPTY_RECORDS, RECORDS } from '../data/constants';
import { Records } from '../types';

const storage = {
	updateRecords: async (newValue: Records) => {
        try {
            const jsonValue = JSON.stringify(newValue)
            await AsyncStorage.setItem(RECORDS, jsonValue)
          } catch (e) {}        
	},
	getRecords: async () => {
        let value: string | Records;
        try {
            value = await AsyncStorage.getItem(RECORDS) as string
            if(!value) return EMPTY_RECORDS
            return JSON.parse(value) 
        } catch (e) {}        

	},
}
export default storage