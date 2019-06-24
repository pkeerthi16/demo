import React,{Component} from 'react';
import Name from './Name';
import KhelName from './Khelname';
import Profileimage from './ProfileImage';
import DateofBirth from './DateofBirth';
import Gender from './Gender';
import City from './City';
import Location from './Location';
import './Personal-profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Personalprofile extends Component{
    state={
        Name:'',
        KhelName:'',
        ProfileImage:'',
        Gender:'',
        City:'',
        Location:'',
        selectedDay: undefined
    };
    // handleDayChange(day){
    //     this.setState({selectedDay:day});
    // }
    // change = e =>{
    //     this.setState({
    //         [e.target.name]:e.target.value
    //     });
    // }
    onSubmit =(e)=>{
         e.preventDefault();
        if(this.state.Name==""){
            alert("Fill Name");
            return false;
        }
        if(this.state.KhelName==""){
            alert("Fill Khel Name");
            return false;
        }
        if(this.state.Location==""){
            alert("Add Location");
            return false;
        }
        
        console.log(this.state);
        this.setState({
        Name:'',
        KhelName:'',
        ProfileImage:'',
        Gender:'',
        City:'',
        Location:'',
        selectedDay: undefined
        });
    }
    render(){
        return(
            <div className="container">
                <div class="row">
                <h3 className="custom-ss-user-profile-title">User personal profile</h3>
                    <div className="col-md-12">
                        <form className="custom-ss-user-personal-profile-form">
                            <Name/>
                            <KhelName/>
                            <Profileimage/>
                            <DateofBirth/>
                            <Gender/>
                            <City/>
                            <Location/>
                            <button className="btn btn-primary custom-ss-profile-submit-btn" onClick={e => this.onSubmit(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}