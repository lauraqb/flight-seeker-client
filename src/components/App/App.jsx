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
  const [results, setResults] = React.useState([]);
  const [data, setData] = React.useState([]);

  const fetchFlights = async (obj) => {
    debugger;
    console.log('fetching results from server... From ' + obj.origin + " to "+obj.destination);
    setData(obj);
    setResults("loading");
    fetch(API_URI+'/api/search?originplace='+obj.origin+'&destinationplace='+obj.destination+'&outbounddate='+obj.outbounddate+'&inbounddate='+obj.inbounddate)
      .then(response => response.json())
      .then((results) => {
        setResults(results);
      })
      .catch(() => {
        setResults("error");
        console.error;
      });
  }

  return (
    <div className='App'>
      <Header />
      <SearcherForm parentCallback = {fetchFlights}/> 
      <main className={c('App__main')}>
        <div className={c('App__header')}>
          <div className={c('App__cities')}>
            {data.length != 0 ?
          (<BpkText textStyle="xl">{data.origin} <AlignedArrow fill={"white"} />{data.destination}</BpkText>) : ""
        }
        </div> 
          <div className={c('App__travellers')}>1 traveller, economy</div>
        </div>
        <div className={c('App__bar')}>
          <BpkLink href="#">Filter</BpkLink>
          <BpkLink className={c('App__barSortOption')} href="">Sort</BpkLink>
          {/* <BpkLink href="#"><BpkAlertIcon fill={"#00b2d6"}/>Price alerts</BpkLink> */}
        </div>
        <div className={c('App__content')}>
          {results == "loading" ? (<Loader />) : results=="error" ? (<div>Problem getting data</div>) : 
            results.map((item, i) => (
              <FlightCard flight={item} key={i}/>
            ))
          }

        </div>
      </main>
    </div>
  );
}

export default App;