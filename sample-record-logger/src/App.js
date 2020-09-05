import React from 'react';
import skuData from './SKUNinja-sample-logs.json';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { ModalDialog,  ModalBody } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataLogs: skuData,
      dataType: '',
      showModal: false,
      item: ''
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
    return this.state.dataLogs.map((logs, i) => {
      const { type, created, subject } = logs
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
      <tbody key={i}>
        <tr id={i} className={`${colorType}`} onClick={(event) => this.openModal(event)}>
          <td>{date}</td>
          <td>{time}</td>
          <td>{subject}</td>
        </tr>
      </tbody>
       )
    })
  }


  openModal = event  => {
    event.preventDefault()
    let idx = event.target.selectedIndex;
    let dataset = event.target.options[idx].dataset;
    console.log('ISD Code: ', dataset);
      this.setState({
        showModal: true,
        item: event.currentTarget.getAttribute('id'),
      })
      console.log('modal is open')
      console.log('this.state.item', this.state.item)
  }

  closeModal = () => {
      this.setState({
        showModal: false
      })
      console.log('modal is closed')
  }

 findEntry = () => {
  //  const itemlocation = this.state.dataLogs[this.state.item].id
  // const findIt = this.state.dataLogs.filter(target => target.subject === itemlocation.subject)
  // console.log('findit..', findIt)
  return (
    <ModalDialog id={`${this.state.item}`}  centered>
    <ModalHeader closeButton onClick={this.closeModal} >
    {this.state.dataLogs[this.state.item].subject}
    </ModalHeader>
    <ModalBody>
   {this.state.dataLogs[this.state.item].body !== null ? this.state.dataLogs[this.state.item].body : 'No body present'}
    </ModalBody>
  </ModalDialog> 
  )
 }




  render() {

    return (
      <Container className="App">
        <h1>SKU Sample Record Logger</h1>
        {this.state.showModal ? this.findEntry() : null} 
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
