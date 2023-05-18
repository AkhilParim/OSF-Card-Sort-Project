import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  cardData: any =
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
}
