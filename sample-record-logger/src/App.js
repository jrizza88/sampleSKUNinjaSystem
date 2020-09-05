import React from 'react';
import skuData from './SKUNinja-sample-logs.json';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { ModalDialog, ModalTitle, ModalBody } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


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
      const { id, type, created, subject } = logs
        const splitDateAndTime = created.split(' ')
        const date = splitDateAndTime[0]
        const time = splitDateAndTime[1]
        let colorType = '';
        switch (this.state.dataType === ''){
        case (type === "1"):
          colorType = 'table-success'
          break;
        case (type === "2"):
          colorType = 'table-warning'
          break;
        case (type === "3"):
          colorType = 'table-danger'
          break;
        default: colorType = 'table-light'
        }
      return ( 
      <tbody key={id} >
        <tr className={`${colorType}`} onClick={this.openModal}>
          <td>{date}</td>
          <td>{time}</td>
          <td>{subject}</td>
        </tr>
      </tbody>
       )
    })
  }

  openModal = e => {
    e.preventDefault()
      this.setState({
        showModal: true
      })
      console.log('modal is open')
  }

  closeModal = () => {
      this.setState({
        showModal: false
      })
      console.log('modal is closed')
  }




  render() {
    console.log('this.state', this.state)


    
    return (
      <Container className="App">
        <h1>SKU Sample Record Logger</h1>
        { (this.state.showModal) ?
          <ModalDialog >
            <ModalHeader closeButton onClick={this.closeModal}>
             <ModalTitle>Title</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>Subject goes here.</p>
            </ModalBody>
          </ModalDialog>  : null
  }
        <Table className="Table">
          <thead>
            <tr className="table-active">
              <th>Date</th>
              <th>Time</th>
              <th>Subject</th>
            </tr>
          </thead>
          {this.renderData()}

        </Table>
      </Container>
    );
  }
}

export default App;
