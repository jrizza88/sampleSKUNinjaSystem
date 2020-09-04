import React from 'react';
import skuData from './SKUNinja-sample-logs.json';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
//import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      dataLogs: skuData,
      dataType: '',
      showModal: false,
    }
  }

  // fetching data upon mounting the component
  componentDidMount(){
    fetch('./SKUNinja-sample-logs.json')
    .then((res) => res.json())
    .then(data => this.setState({dataLogs: data}))
    .catch(error => console.error('The following error occured: ', error))
  }



  renderData(){
      return this.state.dataLogs.map(logs => {
       let splitDateAndTime = logs.created.split(' ')
       let date = splitDateAndTime[0]
       let time = splitDateAndTime[1]
       let colorType = '';
       switch (this.state.dataType === ''){
         case (logs.type === "1"):
          colorType = 'table-success'
         break;
         case (logs.type === "2"):
          colorType = 'table-warning'
          break;
          case (logs.type === "3"):
            colorType = 'table-danger'
            break;
         default: colorType = 'table-primary'
       }
       return ( <tbody key={logs.id}>
          <tr className={`${colorType}`}>
            <td>{date}</td>
            <td>{time}</td>
            <td> {logs.subject}</td>
          </tr>
        </tbody>
       )
    })
  }


  render() {
    console.log('this.state', this.state)
    return (
      <Container className="App">
        <h1>SKU Sample Record Logger</h1>
        <Table className="Table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Subject</th>
            </tr>
          </thead>
          {this.renderData()}
          {/* {this.state.data.map(logs => (
              <tbody key={logs.id}>
                <tr>
                  <td>{logs.created}</td>
                  <td> {logs.subject}</td>
                </tr>
              </tbody>
          ))} */}
        </Table>
      </Container>
    );
  }
}

export default App;
