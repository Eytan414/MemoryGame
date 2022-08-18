export interface GameCard{
    match: number,
    index: number,
    imageUrl: any,
    revealed: boolean,
    disabled: boolean,
    flipped: boolean,
}
export interface Sounds{
    win: any,
    click: any,
    correct: any,
    wrong: any,
}
export interface Records{
    easy: LevelStats,
    intermediate: LevelStats,
    hard: LevelStats,
}
export interface LevelStats{
    time: number,
    moves: number,
    streak: number,
}