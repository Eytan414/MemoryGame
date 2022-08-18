import { Sounds } from './../types.d';
import { GameCard } from '../types';
import { Audio } from 'expo-av';
import {IMAGE_COUNT} from '../data/constants';
import { Asset } from 'expo-asset';

const utils = {
	shuffle: (array: GameCard[]):void => {
		let currentIndex:number = array.length
		let randomIndex:number
		
		while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		[array[currentIndex], array[randomIndex]] = 
			[array[randomIndex], array[currentIndex]]
		}
	},
	generateData: async (size:number):Promise<Array<GameCard>> => {
		const cards:Array<GameCard> = Array<GameCard>()
		const randomsSet:Set<number> = new Set<number>()
		const imageObj = await utils.loadImages()
		
		for(let index=0; index<size; index+=2){
			let randomImage: number = Math.round(Math.random() * size)
			while(randomsSet.has(randomImage))
				randomImage = Math.round(Math.random() * size)

			randomsSet.add(randomImage)
			const randomImageURL: string = imageObj[randomImage]

			const card: GameCard = {
				index,
				match: index+1,
				imageUrl: randomImageURL,
				revealed: false,
				disabled: false,
				flipped: true
			}
			cards.push(card)
			const matchingCard: GameCard = {
				index: index+1,
				match: index,
				imageUrl: randomImageURL,
				revealed: false,
				disabled: false,
				flipped: true
			}
			cards.push(matchingCard)
		}
		utils.shuffle(cards)
		return cards
	},
	loadImages: async () => {
		const imagesObj = {}
		for (let i = 0; i<IMAGE_COUNT; i++)
			imagesObj[i] = await require(`../../assets/images/cardfaces/${i}.svg`) as string
		
		return imagesObj
	},
	loadSounds: async ():Promise<Sounds>=>{		
		const [winSrc, wrongSrc, clickSrc, correctSrc] = 
			await Asset.loadAsync([
				require('../../assets/sounds/win.wav'),
				require('../../assets/sounds/wrong.mp3'),
				require('../../assets/sounds/click.wav'),
				require('../../assets/sounds/correct.wav')
		])
		const win = await Audio.Sound.createAsync(winSrc)
		const wrong = await Audio.Sound.createAsync(wrongSrc)
		const click = await Audio.Sound.createAsync(clickSrc)
		const correct = await Audio.Sound.createAsync(correctSrc)
		 
		const sounds = {
			win: win.sound,
			click: click.sound,
			correct: correct.sound,
			wrong: wrong.sound,
		}
		return sounds
	},
	shareScore: async (text: string) => {
		const dataToShare = {
		  title: 'Memory Challenge',
		  text: text,
		  url: ''
		}; 
		try {
		  await navigator.share(dataToShare);
		} catch(err) {}
	  }
}
export default utils