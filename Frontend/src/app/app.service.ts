import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  displayCard = 'Home';  // card to be displayed in Display and Rank pages

  cardsData: any = {
    'Home': {
      label: 'Home',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'home',
      text: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'File': {
      label: 'File',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'file-solid',
      text: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'Gear': {
      label: 'Gear',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'gear-solid',
      text: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'Shield': {
      label: 'Shield',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'shield-solid',
      text: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'Filter': {
      label: 'Filter',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'filter-solid',
      text: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
  }

  usedCards: Array<any> = [
    'Home',
    'File',
    'Gear',
    'Shield',
    'Filter'
  ]
  
  placedCards: Array<any> = [
    // {'label': 'File', 'x': 559.94921875, 'y': 155.6015625, 'z-index': 0, tokens: new Set()},
    {'label': 'Gear', 'x': 753.6953125, 'y': 165.98046875, 'z-index': 0, tokens: new Set()},
    {'label': 'Shield', 'x': 116.8515625, 'y': 40.43359375, 'z-index': 0, tokens: new Set()},
    {'label': 'Filter', 'x': 204.640625, 'y': 257.1171875, 'z-index': 0, tokens: new Set()}
  ]

  todoCards: Array<any> = [
    'Home'
  ]

  discardedCards: Array<any> = [
    'File'
  ]

  tokens: {
    [tokenName: string]: {
        label: string, color: string
    }} = {
    'Angry': { label: 'Angry', color: '#931F1D' },
    'Frustrating': { label: 'Frustrating', color: '#3F6DA4' },
    'Okay': { label: 'Okay', color: '#DC851F' },
    'Great': { label: 'Great', color: '#417B5A' }
  }
}
