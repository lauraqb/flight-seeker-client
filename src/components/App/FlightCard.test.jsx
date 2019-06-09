import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer'; // ES6
import FlightCard from './FlightCard';

const flight = {
    price: 120,
    origin: "EDI",
    destination: "LHR",
    outbound : {
      departure: "11:00",
      arrival: "13:00",
      duration : "2 h"
    },
    inbound : {
      departure: "12:00",
      arrival: "14:00",
      duration : "3h"
  }
}
describe('FlightCard', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FlightCard />, div);
  });

  it('should render correctly', () => {
    const testRenderer = TestRenderer.create(<FlightCard flight={flight}/>);
    const testInstance = testRenderer.root;
    const departures = [flight.outbound.departure, flight.inbound.departure];
    const arrivals = [flight.outbound.arrival, flight.inbound.arrival];
    testInstance.findAllByProps({className: "departure"}).forEach((element, index) => {
      expect(element.children[0]).toEqual(departures[index]);
    })
    testInstance.findAllByProps({className: "arrival"}).forEach((element, index) => {
      expect(element.children[0]).toEqual(arrivals[index]);
    })
  });
});

