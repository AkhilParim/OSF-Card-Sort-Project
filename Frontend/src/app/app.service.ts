import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  displayCardData: any =
  {
    label: 'Home',
    preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../assets/home.svg',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc lobortis mattis aliquam faucibus. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique. 
    Bibendum enim facilisis gravida neque convallis a. Fermentum iaculis eu non diam phasellus vestibulum lorem. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Sit amet nisl suscipit adipiscing bibendum 
    est. Purus non enim praesent elementum facilisis leo vel fringilla est. Sit amet purus gravida quis. Lacus luctus 
    accumsan tortor posuere ac ut consequat. Pellentesque id nibh tortor id aliquet. Id aliquet lectus proin nibh nisl 
    m. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Sed pulvinar proin gravida hendrerit lectus a. Duis tristique sollicitudin nibh sit amet commodo nulla. Proin sed libero enim sed faucibus turpis in.`
  }

  placedCards: Array<any> = [
    {'label': 'Home5', 'x': 559.94921875, 'y': 155.6015625, 'z-index': 0},
    {'label': 'Home1', 'x': 753.6953125, 'y': 165.98046875, 'z-index': 0},
    {'label': 'Home2', 'x': 116.8515625, 'y': 40.43359375, 'z-index': 0},
    {'label': 'Home6', 'x': 204.640625, 'y': 257.1171875, 'z-index': 1}
  ]

  todoCards: Array<any> = [
    { label: 'Home3', x: 0, y: 0, 'z-index': 0 },
    { label: 'Home4', x: 0, y: 0, 'z-index': 0 },
    { label: 'Home7', x: 0, y: 0, 'z-index': 0 },
    { label: 'Home8', x: 0, y: 0, 'z-index': 0 },
  ];
}
