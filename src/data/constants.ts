import { Records, LevelStats } from './../types.d';
export const CardsCount:any = {
    EASY: 16,
    INTERMEDIATE: 20,
    HARD: 24,
    INSANE: 32,
}
export const Level:any = {
    EASY: 'easy',
    INTERMEDIATE: 'intermediate',
    HARD: 'hard',
    INSANE: 'insane',
}
export const IMAGE_COUNT:number = 41 //number of image assets
/* Game settings */
export const CARD_DELAY_BEFORE_FLIP_BACK:number = 1800
export const FLIP_ANIMATION_SPEED:number = 1000
export const DEFAULT_VOLUME:number = .33
export const PAGE_GRID:string = 'Game'
export const PAGE_HOME:string = 'Home'

/* Visual settings */
export const MODAL_WIDTH_DESKTOP:string = '50%'
export const MODAL_WIDTH_MOBILE:string = '90%'
export const DESKTOP_MIN_WIDTH:number = 500

export const GRID_HEAD_HEIGHT:number = 80
export const GRID_HEAD_PADDING_TOP:number = 15
export const GRID_HEAD_PADDING_BOTTOM:number = 30

export const CARD_MARGIN_TOP:number = 8
export const CARD_MARGIN_BOTTOM:number = 8
export const CARD_MARGIN_SIDE:number = 4
export const ITEMS_IN_EASY_ROW:number = 4 
export const ITEMS_IN_INTERMEDIATE_ROW:number = 5
export const ITEMS_IN_HARD_ROW:number = 6 
export const ITEMS_IN_INSANE_ROW:number = 8 

// Dark theme
export const DEFAULT_BUTTON_COLOR:string = 'indigo'
export const DEFAULT_BACKGROUND_COLOR:string = '#212121'
export const DEFAULT_TEXT_COLOR:string = 'lightblue'
// Light theme:
//

// storage
export const RECORDS:string ='records'
export const EMPTY_RECORD:LevelStats = {
    time: 999,
    moves: 999,
    streak: 0,
}
export const EMPTY_RECORDS:Records = {
    easy: EMPTY_RECORD,
    intermediate: EMPTY_RECORD,
    hard: EMPTY_RECORD,
    insane: EMPTY_RECORD,
}

