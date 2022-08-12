import { Card } from './types.d';

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
  loadImages: (size: number) => {
    const imgArr = {};
    for (let i = 0; i<size; i++) {
      imgArr[i] = require(`../assets/cardfaces/${i}.svg`) as string
    }
    return imgArr
  }
}

export default utilsService