import React,{Component} from 'react';
import moment from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import Slider from 'react-rangeslider';
import ReduxDemo from './reduxDemo';
// import 'react-rangeslider/lib/index.css';
export default class Home extends Component{
    constructor() {
        super();
        this.state = {
          moment: moment(),
          horizontal: 33.3
        };
    }
    handleChange = (moment) => {
        this.setState({
          moment
        });
      }
      handleChangeHorizontal = value => {
        this.setState({
          horizontal: value
        })
      };
    render(){
        const { horizontal } = this.state
    const horizontalLabels = {
      0: '',
      33.3: 'Beginner',
      66.6: 'Intermediate',
      99.9:'Expert'
    }
    // const formatkg = value => value + ' kg'
        const shortcuts = {
            'Today': moment(),
            'Yesterday': moment().subtract(1, 'days'),
            'Clear': ''
          };
        return(
            <div>
                Home
                <DatetimePickerTrigger
        shortcuts={shortcuts} 
        moment={this.state.moment}
        onChange={this.handleChange}>
        <input type="text" value={this.state.moment.format('YYYY-MM-DD HH:mm')} readOnly />
      </DatetimePickerTrigger>
      <div className="custom-rangeslider">
      <Slider
          min={0}
          max={100}
          value={horizontal}
          labels={horizontalLabels}
          tooltip={false}
        //   format={formatkg}
        //   handleLabel={horizontal}
          onChange={this.handleChangeHorizontal}
        />
        {/* <div className='value'>{formatkg(horizontal)}</div> */}
        </div>
            </div>
        );
    }
}