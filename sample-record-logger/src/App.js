import React from 'react';
import skuData from './SKUNinja-sample-logs.json';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Form, FormControl, Button, ModalDialog,  ModalBody } from 'react-bootstrap';
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
      filterData: [],
    
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


  openModal = event  => {
    event.preventDefault()
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
  const datalogs = this.state.dataLogs
  const item = this.state.item
  return (
    <ModalDialog id={`${item}`}  centered>
    <ModalHeader closeButton onClick={this.closeModal} >
    {datalogs[item].subject}
    </ModalHeader>
    <ModalBody>
   {datalogs[item].body !== null ? datalogs[item].body : 'No body present'}
    </ModalBody>
  </ModalDialog> 
  )
 }


  filterDataFunction = () => {
    let dataT = [...this.state.dataLogs]
    let filteredSearch = dataT.filter((data) => {
      return data.subject.toLowerCase().includes(this.state.searchedItem.toLowerCase())
    })

    console.log('filteredSearch: ', filteredSearch)
    console.log('...', dataT)
  
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
  //console.log(event)
    // const findTarget = datalogs.filter(target => { 
    //   if (target.subject.includes(`${target.subject}`)
    //   .map(filteredTarget => { 
    //     console.log('find the filteredTarget...', filteredTarget) 
    //    }))
    
    // // return filteredTarget.subject
    // // this.setState({searchedItem: findItem})
    // this.setState({searchedItem: findTarget})
    // console.log('target...', event.target.value)
  // console.log('find the item...', findItem)
  // console.log('find the item...', findTarget)

  // console.log('filtered item', this.state.searchedItem)

handleChange = event => {
  console.log(event.target.value)
  this.setState({searchedItem: event.target.value});
}

 onHandleSubmit = event => {
   event.preventDefault()
   this.setState({
    searchedItem: ''
   })
 }




  render() {
    return (
      <Container className="App">
        <h1>SKU Sample Record Logger</h1>
        <Form inline>
          <FormControl type="text" placeholder="Search by Subject" className="mr-sm-2" onChange={this.handleChange} value={this.state.searchedItem}/>
          {/* <Button type="submit" variant="outline-success" onSubmit={this.onHandleSubmit} >Search</Button> */}
        </Form>

        {this.state.showModal ? this.findEntry() : null} 
        <Table className="Table">
          <thead>
            <tr className="table-active">
              <th>Date</th>
              <th>Time</th>
              <th>Subject</th>
            </tr>
          </thead>
          {this.state.searchedItem.length > 0 ? this.filterDataFunction() : this.renderData()}
        </Table>
      </Container>
    );
  }
}

export default App;
