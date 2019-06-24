import React,{Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './Personal-profile.css';
export default class DateofBirth extends Component{
    constructor(props){
        super(props);
    this.state={
        selectedDay: undefined
    };
}
    handleDayChange(day){
        this.setState({selectedDay:day});
    }
    render(){
        const{selectedDay}=this.state;
        return(
            <div className="form-group">
            <label className="col-sm-4 custom-ss-datepicker-label" >DOB</label><div className="col-sm-6 custom-ss-datepicker"><DayPickerInput onDayChange={this.handleDayChange.bind(this)}/></div>
            </div>
        );
    }
}