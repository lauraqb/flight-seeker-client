import React from 'react';
import BpkCard from 'bpk-component-card';
import BpkArrowIcon from 'bpk-component-icon/sm/native-android--forward';
import BpkText from 'bpk-component-text';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightXl, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import BpkButton from 'bpk-component-button';
import STYLES from './App.scss';

const c = className => STYLES[className] || 'UNKNOWN';
const AlignedArrow = withAlignment( BpkArrowIcon, lineHeightXl, iconSizeSm );

class FlightCard extends React.Component {
    
    render() {
        const flight = this.props.flight;
        if (!flight){
            return(<div>No flights</div>);
        }
        return(
            <BpkCard className={c("Card__main")}>
                <div className={`${c("Card__row")} outbound`}>
                    <div className={c("Card__item")}>
                        <img width="20" className={c("Card__icon")} src={"https://logos.skyscnr.com/images/airlines/favicon/EZ.png"}/>
                    </div>
                    <div className={c("Card__item")}>
                        <div className="departure">{flight.outbound.departure}</div>
                        <BpkText className={c("Card__city")}>{flight.origin}</BpkText>
                    </div>
                    <span className={c("Card__arrow")}><AlignedArrow/></span>
                    <div className={`${c("Card__item")} ${c("Card__item-2")}`}>
                        <div className="arrival">{flight.outbound.arrival}</div>
                        <BpkText className={c("Card__city")}>{flight.destination}</BpkText>
                    </div>
                    <div className={`${c("Card__item")} ${c("Card__duration")}`}>
                        <div>{flight.outbound.duration}</div>
                        <div className={c("Card__stops")}>Direct</div>
                    </div>
                </div>
                <div className={c("Card__row")}>
                    <div className={c("Card__item")}>
                        <img width="20" className={c("Card__icon")} src={"https://logos.skyscnr.com/images/airlines/favicon/EZ.png"}/></div>
                    <div className={c("Card__item")}>
                        <div className="departure">{flight.inbound.departure}</div>
                        <BpkText className={c("Card__city")}>{flight.destination}</BpkText>
                    </div>
                    <span className={c("Card__arrow")}><AlignedArrow/></span>
                    <div className={`${c("Card__item")} ${c("Card__item-2")}`}>
                        <div className="arrival">{flight.inbound.arrival}</div>
                        <BpkText className={c("Card__city")}>{flight.origin}</BpkText>
                    </div>
                    <div className={`${c("Card__item")} ${c("Card__duration")}`}>
                        <div>{flight.outbound.duration}</div>
                        <div className={c("Card__stops")}>Direct</div>
                    </div>
                </div>
                <div className={c("Card__priceRow")}>
                    <div className={c("Card__price")}>£{flight.price}</div>
                    <BpkButton href={flight.deeplinkUrl}>Select</BpkButton>
                </div>
                
            </BpkCard>
        )
    }
}

export default FlightCard;
// {data.map( flight => (
//     <BpkCard>
//       <FlightCard flight={flight}/>
//     </BpkCard>
//   ))}