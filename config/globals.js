export const D = Object.freeze({
    "STOP": 0,
    "UP": 1, 
    "DOWN": 2, 
    "LEFT": 3, 
    "RIGHT": 4
}) // Directions

export const C = ['#1abc9c', '#2ecc71', '#3498db', '#e74c3c', '#9b59b6'] // Colors

export const R = [5, 5, 3, 2, 1] // Rounds

export const B = Object.freeze({
    "width": document.body.clientWidth || 1400,
    "height": document.body.clientHeight || 950, 
    "backgroundColor": '#2f3640', 
    "drawColor": '#fafafa'
}) // Board Params

export const Difficulty = Object.freeze({
    "NOOB": 5,
    "EASY": 7, 
    "MEDIUM": 8, 
    "HARD": 9, 
    "IMPOSSIBLE": 10
}) // Directions