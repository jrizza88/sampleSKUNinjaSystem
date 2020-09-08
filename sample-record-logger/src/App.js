import React from 'react';
import skuData from './SKUNinja-sample-logs.json';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Form, FormControl, ModalDialog, ModalBody } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataLogs: skuData,
      dataType: '',
      showModal: false,
      item: '',
      searchedItem: '',
    }
  }

  // fetching data upon mounting the component
  componentDidMount(){
    fetch(`./SKUNinja-sample-logs.json`)
    .then(res => res.text())          // convert to plain text to avoid the "Unexpected token < in JSON at position 0"
    // .then((res) => res.json())
    // .then(data => this.setState({dataLogs: data}))
    .catch(error => console.error('The following error occured: ', error, console.warn(error.responseText)))
  }

  renderData = () => {
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

  filterDataFunction = () => {
    let dataT = [...this.state.dataLogs]
    let filteredSearch = dataT.filter((data) => {
      return data.subject.toLowerCase().includes(this.state.searchedItem.toLowerCase())
    })
    if (filteredSearch.length  > 0) {
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
  else {
    return ( 
      <div> 
        <div className="nullSearch">No results available</div>
      </div>
    )
  }
  }

handleChange = event => {
  this.setState({searchedItem: event.target.value});
}

  openModal = event  => {
    event.preventDefault()
      this.setState({
        showModal: true,
        item: event.currentTarget.getAttribute('id'),
      })
  }

  closeModal = () => {
      this.setState({
        showModal: false
      })
  }

 findEntryModal = () => {
  const datalogs = this.state.dataLogs
  const item = this.state.item
  return (
      <ModalDialog centered>
        <ModalHeader closeButton onClick={this.closeModal} >
        {datalogs[item].subject}
        </ModalHeader>
        <ModalBody>
      {datalogs[item].body !== null ? datalogs[item].body : 'No body present'}
        </ModalBody>
    </ModalDialog> 
  )
 }

  render() {
    return (
      <Container className="App">
        <h1 className="siteHeader">SKU Sample Record Logger</h1>
        <Form fluid="md">
          <FormControl type="text" placeholder="Search by Subject" className="mr-sm-2" onChange={this.handleChange} value={this.state.searchedItem}/>
        </Form>
        {this.state.showModal ? this.findEntryModal() : null} 
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
