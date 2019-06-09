import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import  DatePicker from "react-bootstrap-date-picker";
//var DatePicker = require("react-bootstrap-date-picker");

class SearcherForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: 'EDI',
            destination: 'LHR'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        console.log(event.target.name +": "+event.target.value)
        const name = event.target.name
        this.setState({[name]: event.target.value}) 
    }

    handleSubmit = (event) => {
        console.log("Form was submitted: "  + this.state.origin)
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.name);

        const obj = {
            origin: this.state.origin,
            destination: this.state.destination
        }
        this.props.parentCallback(obj);
    }
    //<DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
    render()
    {
        return <Form onSubmit={this.handleSubmit}>
        <Form.Group>
        <Form.Label>
          From:
          <Form.Control type="text" name="origin" value={this.state.origin} onChange={this.handleChange} />
        </Form.Label>
        <Form.Label>
          To:
        <Form.Control type="text" name="destination" value={this.state.destination} onChange={this.handleChange} />
        </Form.Label>
        
        <Button type="submit" value="Submit">Submit </Button>
        </Form.Group>
      </Form>
    }
}
export default SearcherForm;