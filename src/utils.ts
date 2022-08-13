import { Card } from './types.d';
import {Alert} from 'react-native'

export enum SoundTypes {
  WIN,
}
const IMAGE_COUNT:number = 24
const utilsService = 
{
  shuffle: (array: Card[]):void => {
    let currentIndex:number = array.length
    let randomIndex:number
    
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      [array[currentIndex], array[randomIndex]] = 
        [array[randomIndex], array[currentIndex]]
    }
  },
  loadImages: () => {
    const imagesObj = {}
    for (let i = 0; i<IMAGE_COUNT; i++) {
      imagesObj[i] = require(`../assets/images/cardfaces/${i}.svg`) as string
    }
    return imagesObj
  }
}


export default utilsService