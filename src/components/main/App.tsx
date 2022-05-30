import React, { Component } from 'react';

import './App.scss';
import { CanvasComponent } from '../canvas';

export class App extends Component {
  render() {
    return (
      <div>
        <CanvasComponent width={50} height={50}></CanvasComponent>
      </div>
    );
  }
}
export default App;
