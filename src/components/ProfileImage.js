import React,{Component} from 'react';
export default class Profileimage extends Component{
    constructor(props){
        super(props);
    this.state={
        ProfileImage:''
    };
}
    change = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    render(){
        return(
            <div className="form-group">
            <label className="col-sm-4">Profile Image</label><input className="col-sm-6" type="file" name="ProfileImage" value={this.state.ProfileImage} onChange={e => this.change(e)}/>
            </div>
        );
    }
}