import React from 'react';
import skuData from './SKUNinja-sample-logs.json';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {Modal, ModalBody } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataLogs: skuData, // imported data entries from the JSON file
      dataType: '', // registers the 
      showModal: false, // boolean created to handle modal state change
      item: '', // created to maintain individually clicked on object entries from the JSON file
      searchedItem: '' // used to maintain state when search for an item based on the subject of the object in the JSON file.
    }
  }

  // fetching data upon mounting the component
  componentDidMount(){
    fetch(skuData) 
    .then(res => res.text()) // convert to plain text to avoid the "Unexpected token < in JSON at position 0". Otherwise, reading as a json file still works. 
    // .then((res) => res.json())
    .catch(error => console.error('The following error occured: ', error)) // displays errors in the console.
  }

  renderData = () => {
    // when renderData() is invoked, this uses the map method to list out the data details of the JSON file that is set into state
     return this.state.dataLogs.map((logs, i) => { 
      const { type, created, subject } = logs // 
        const splitDateAndTime = created.split(' ') // used split method to separate time and date for both presentation and styling purposes
        const date = splitDateAndTime[0]
        const time = splitDateAndTime[1]
        let colorType = ''; // defined colorType to handle the color based on the type integer
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
        default: colorType = 'table-light' // created this default in the case that a type beyond 1,2,3 occurs
        }
      return ( // Here the returned data is of the date, time and subject using a table row. 
      <tbody key={i} className="hover-table"> 
      {/* the index is set to the table row and the className is set to the defined colorType using an object literal */}
        <tr id={i} className={`${colorType}`} onClick={(event) => this.openModal(event)}>
          <td >{date}</td>
          <td >{time}</td>
          <td>{subject}</td>
        </tr>
      </tbody>
       )
    })
  }

  filterDataFunction = () => {
    // Using spread operator to update nested state object
    let dataT = [...this.state.dataLogs]
    // filteredSearch filters the data from datalogs and returns exact string matches that matches search input
    let filteredSearch = dataT.filter((data) => {
      return data.subject.toLowerCase().includes(this.state.searchedItem.toLowerCase())
    })
    // used if conditional to return searches if searched inputs match. Else statement handles if there is no match. 
    if (filteredSearch.length  > 0) {
    // This repeats the same functionality as the renderData() function. Would probably attempt to make this more DRY in a future version.
    return filteredSearch.map((logs, i) => {
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
      <tbody className="hover-table" key={i}> 
        <tr id={i} className={`${colorType}`} onClick={(event) => this.openModal(event)}>
          <td>{date}</td>
          <td>{time}</td>
          <td>{subject}</td>
        </tr>
      </tbody>
       )
    })
  } 
  else {
    return (
      <tbody> 
      <tr>
        <td></td>
        <td className="null-search">No results available</td>
        <td></td>
      </tr>       
    </tbody>
    )
  }
  }

// Here handle change will handle any event target changes from the search input. SearchedItem state is impacted here. 
handleChange = event => {
  this.setState({searchedItem: event.target.value});
}

// Here openModal handles the event when the showModal becomes true. This also handles item state for targeted ids from the tr row clicked received from the handleModalData function. 
  openModal = event  => {
    event.preventDefault()
      this.setState({
        showModal: true,
        item: event.currentTarget.getAttribute('id'),
      })
  }

// This handles setting showModal back to false upon clicking to close the modal.
  closeModal = () => {
      this.setState({
        showModal: false
      })
  }

// Here is the function that handles displaying the data in the Modal. 
 handleModalData = () => {
   // defined datalogs and item to make it easier to read the return statement below. 
  const datalogs = this.state.dataLogs
  const item = this.state.item
  // Here the modal id is set to the targeted item. Show handles the modal state itself. 
  // The modal displays the subject and boday of the individual data entry.
  return (
      <Modal  
      show={this.state.showModal}
      id={`${item}`}
      backdrop="static"
      keyboard={false} centered
      className="modal"
      >
        <ModalHeader className="modal-header"  closeButton onClick={this.closeModal}>
        {datalogs[item].subject}
        </ModalHeader>
        <ModalBody className="modal-body">
      {datalogs[item].body !== null ? datalogs[item].body : 'No body present'}
        </ModalBody>
    </Modal> 
  )
 }

  render() {
  
    return (
      // input handles the search and utilizes handleChange and the searchedItem values
      // if the length of searchedItem is more than 0, it will render the filterDataFunction. Otherwise it will just render the initial state via renderData.
      <Container className="app">
        <h1 className="site-header">SKU Sample Record Logger</h1>
          <input className="search-form" type="text" placeholder="Search by Subject"  onChange={this.handleChange} value={this.state.searchedItem}/>
        {this.state.showModal ? this.handleModalData() : null} 
        <Table className="Table">
          <thead>
            <tr className="table-active">
              <th sm={4}>Date</th>
              <th sm={4}>Time</th>
              <th sm={8}>Subject</th>
            </tr>
          </thead>
          {this.state.searchedItem.length > 0 ? this.filterDataFunction() : this.renderData()}
        </Table>
      </Container>
    );
  }
}

export default App;
