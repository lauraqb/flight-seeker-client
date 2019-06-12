import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import STYLES from './Searcher.scss';
const c = className => STYLES[className] || 'UNKNOWN';

class SearcherForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: 'EDI',
            destination: 'LHR',
            outbounddate: this.getDate(1), //next monday
            inbounddate: this.getDate(2),  //tuesday
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /** Given a day of the week (dayOfTheWeek), returns the date of the next ocurring dayOfTheWeek */
    getDate(day) {
        let d = new Date();
        d.setDate(d.getDate() + (day + 7 - d.getDay()) % 7);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        d = yyyy + '-' + mm + '-' + dd; 
        return d;
    }

    handleChange(event) {
        debugger;
        const name = event.target.name
        this.setState({[name]: event.target.value}) 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const obj = {
            origin: this.state.origin,
            destination: this.state.destination,
            outbounddate: this.state.outbounddate,
            inbounddate: this.state.inbounddate
        }
        this.props.parentCallback(obj);
    }

    render()
    {
        return <Container className={c('searcher-container')}>
            <Form onSubmit={this.handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label className={c('searcher-label')}>From</Form.Label>
                            <Form.Control name="origin" as="select" onChange={this.handleChange} value={this.state.origin}>
                                <option value="EDI">Edinburgh (EDI)</option>
                                <option value="BCN">Barcelona (BCN)</option>
                            </Form.Control>
                        </Form.Group>
                        {/* <Form.Control placeholder="From" type="text" name="origin" value={this.state.origin} onChange={this.handleChange} /> */}
                    </Col>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label className={c('searcher-label')}>To</Form.Label>
                            <Form.Control name="destination" as="select" onChange={this.handleChange} value={this.state.destination}>
                                <option value="EDI">Edinburgh (EDI)</option>
                                <option value="BCN">Barcelona (BCN)</option>
                                <option value="LHR">London (LHR)</option>
                            </Form.Control>
                        </Form.Group>
                        {/* <Form.Control placeholder="To" type="text" name="destination" value={this.state.destination} onChange={this.handleChange} /> */}
                    </Col>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label className={c('searcher-label')}>Depart</Form.Label>
                        <Form.Control placeholder="yyyy/mm/dd" type="text" name="outbounddate" value={this.state.outbounddate} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col >
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label className={c('searcher-label')}>Return</Form.Label>
                        <Form.Control placeholder="yyyy/mm/dd" type="text" name="inbounddate" value={this.state.inbounddate} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button type="submit" value="Submit" className={c('searcher-button')}>Search Flights</Button>
                    </Col>
                </Row>
            </Form>
      </Container>
    }
}
export default SearcherForm;