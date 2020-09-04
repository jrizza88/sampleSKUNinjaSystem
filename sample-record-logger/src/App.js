import React from 'react';
import skuData from './SKUNinja-sample-logs.json';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

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
      <Container className="App">
        <h1>SKU Sample record Logger</h1>
        <Table className="Table">
          <thead>
            <tr>
             
              <th>Date and Time</th>
              <th>Subject</th>
            </tr>
          </thead>
          {this.state.data.map(logs => (
              <tbody key={logs.id}>
                <tr>
                  <td>{logs.created}</td>
                  <td> {logs.subject}</td>
                </tr>
              </tbody>
          ))}
        </Table>
      </Container>
    );
  }
}

export default App;
