import React from 'react';
import ReactLoading from 'react-loading';
import STYLES from './App.scss';
const c = className => STYLES[className] || 'UNKNOWN';

const Loader = ({ type, color }) => (
    <div className={c('App__loader')}><ReactLoading type="spinningBubbles" color="#00b2d6" height={90} width={90} /></div>
);
 
export default Loader;