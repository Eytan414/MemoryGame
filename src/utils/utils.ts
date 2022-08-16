import { Sounds } from './../types.d';
import { Card } from '../types';
import { Audio } from 'expo-av';
import {IMAGE_COUNT} from '../data/constants';
import { Asset } from 'expo-asset';

const utilsService = {
	shuffle: (array: Card[]):void => {
		let currentIndex:number = array.length
		let randomIndex:number
		
		while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		[array[currentIndex], array[randomIndex]] = 
			[array[randomIndex], array[currentIndex]]
		}
	},
	generateData: async (size:number):Promise<Array<Card>> => {
		let cards:Array<Card> = Array<Card>()
		const randomsSet:Set<number> = new Set<number>()
		const imageObj = await utilsService.loadImages()
		
		for(let index=0; index<size; index+=2){
			let randomImage: number = Math.round(Math.random() * size)
			while(randomsSet.has(randomImage))
				randomImage = Math.round(Math.random() * size)

			randomsSet.add(randomImage)
			const randomImageURL: string = imageObj[randomImage]

			const card: Card = {
				index,
				match: index+1,
				imageUrl: randomImageURL,
				revealed: false,
				disabled: false,
			}
			cards.push(card)
			const matchingCard: Card = {
				index: index+1,
				match: index,
				imageUrl: randomImageURL,
				revealed: false,
				disabled: false,
			}
			cards.push(matchingCard)
		}
		utilsService.shuffle(cards)
		return cards
	},
	showAlert: (text:string, duration:number) => { 
		let modal:HTMLElement = document.createElement("div")
		modal.setAttribute("style",`
			font-size: 2rem; 
			position: fixed; 
			background-color: peachpuff;
			left: 50%; top: 50%;
			transform: translate(-50%, -50%);
			padding: 1rem;
			min-width: 50%;
			height: 33%; max-width: 85%;
			border-radius: 1rem;
			color: blue;
			font-weight: bold;
			display: flex;
			text-align: center;
			align-items: center;
			justify-content: center;
		`)
		modal.innerHTML = text
		setTimeout(function(){
			modal.parentNode?.removeChild(modal)
		}, duration)
		document.body.appendChild(modal)
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
}
export default utilsService