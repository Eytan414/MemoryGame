import { Card } from '../types';
import { Audio } from 'expo-av';
import {IMAGE_COUNT, SoundType} from '../data/constants';

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
	loadImages: () => {
		const imagesObj = {}
		for (let i = 0; i<IMAGE_COUNT; i++) {
		imagesObj[i] = require(`../../assets/images/cardfaces/${i}.svg`) as string
		}
		return imagesObj
	},
	generateData: (size:number):Array<Card> => {
		let cards:Array<Card> = Array<Card>()
		const randomsSet:Set<number> = new Set<number>()
		const imageObj = utilsService.loadImages()
		for(let index=0; index<size; index+=2){
			let randomImage: number = Math.round(Math.random() * size)
			while(randomsSet.has(randomImage))
				randomImage = Math.round(Math.random() * size/2)

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
	//TODO: replace with working alert (might be broken only in chrome)
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
	playSound: async (soundType:number) => {
		switch(soundType){
			case SoundType.WIN: {
				const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/win.wav'))
				await sound.playAsync()
				break
			}
			case SoundType.CARD_CLICKED: {
				const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/click.wav'))
				await sound.playAsync()
				break
			}
			case SoundType.PAIR_CORRECT: {
				const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/correct.wav'))
				await sound.playAsync()
				break
			}
			case SoundType.PAIR_WRONG: {
				const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/wrong.mp3'))
				await sound.playAsync()
				break
			}
			default:
		}
	}
}
export default utilsService