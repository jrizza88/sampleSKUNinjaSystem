import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      logs: null,
      showModal: false,
    }
  }
  render() {
    return (
      <div className="App">
        <h1>SKU Sample record Logger</h1>
      </div>
    );
  }
}

export default App;
