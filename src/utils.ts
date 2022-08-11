const utilsService = 
{
  shuffle: (array: Card[]):void => {
    let currentIndex:number = array.length;
    let randomIndex:number;
    
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = 
        [array[randomIndex], array[currentIndex]];
    }
  },
}

export default utilsService;