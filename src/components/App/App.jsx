import React from 'react';
import BpkText from 'bpk-component-text';
import BpkArrowIcon from 'bpk-component-icon/sm/native-android--forward';
import BpkAlertIcon from 'bpk-component-icon/sm/price-alerts';
import BpkLink, { BpkButtonLink } from 'bpk-component-link';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightXl, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

import STYLES from './App.scss';
import Header from './../Header';
import SearcherForm from './../Searcher'
import FlightCard from './FlightCard'
import Loader from './Loader'
console.log(location.hostname)
const API_URI= location.hostname === "localhost" ? "http://localhost:4000" : "https://flight-seeker-server.herokuapp.com";
const c = className => STYLES[className] || 'UNKNOWN';
const AlignedArrow = withAlignment( BpkArrowIcon, lineHeightXl, iconSizeSm );



const App = () => {
  const [data, setData] = React.useState([]);
  
  /** Given a day of the week (dayOfTheWeek), returns the date of the next ocurring dayOfTheWeek */
  const getDayDate = (day) => {
    let d = new Date();
    d.setDate(d.getDate() + (day + 7 - d.getDay()) % 7);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    d = yyyy + '-' + mm + '-' + dd; 
    return d;
  }

  const fetchFlights = async (data) => {
    //departing next Monday and returning the following day
    const monday = getDayDate(1);
    const tuesday = getDayDate(2);
    console.log('fetching results from server... From ' + data.origin + " to "+data.destination);
    setData("loading");
    fetch(API_URI+'/api/search?originplace='+data.origin+'&destinationplace='+data.destination+'&outbounddate='+monday+'&inbounddate='+tuesday)
      .then(response => response.json())
      .then((results) => {
        setData(results);
      })
      .catch(() => {
        setData("error");
        console.error;
      });
  }

  //if(data.length == 0)  fetchFlights();
  //onSubmit={this.fetchFlights}
  return (
    <div className={c('App')}>
      <Header />
      <SearcherForm parentCallback = {fetchFlights}/> 
      <main className={c('App__main')}>
        <div className={c('App__header')}>
          <div className={c('App__cities')}>
          <BpkText textStyle="xl">EDI <AlignedArrow fill={"white"} /> LONDON</BpkText></div>
          <div className={c('App__travellers')}>2 travellers, economy</div>
        </div>
        <div className={c('App__bar')}>
          <BpkLink href="#">Filter</BpkLink>
          <BpkLink className={c('App__barSortOption')} href="">Sort</BpkLink>
          <BpkLink href="#"><BpkAlertIcon fill={"#00b2d6"}/>Price alerts</BpkLink>
        </div>
        <div className={c('App__content')}>
          {data == "loading" ? (<Loader />) : data=="error" ? (<div>Problem getting data</div>) : 
            data.map((item, i) => (
              <FlightCard flight={item} key={i}/>
            ))
          }

        </div>
      </main>
    </div>
  );
}

export default App;