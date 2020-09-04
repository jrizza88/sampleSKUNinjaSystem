import React from 'react';
import skuData from './SKUNinja-sample-logs.json';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      data: skuData,
      showModal: false,
    }
  }

  // fetching data upon mounting the component
  componentDidMount(){
    fetch('./SKUNinja-sample-logs.json')
    // here I 
    .then((res) => res.json())
    .then(data => this.setState({data: data}))
    .catch(error => console.error(error))
  }


  render() {
    console.log('this.state', this.state)
    return (
      <div className="App">
        <h1>SKU Sample record Logger</h1>
        {this.state.data.map(logs => (
          <div key={logs.id}>
            {logs.created}
            {logs.subject}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
