import React,{Component} from 'react';
export default class Location extends Component{
    constructor(props){
        super(props);
    this.state={
        Location:''
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
            <label className="col-sm-4">Location</label><input className="col-sm-6" name="Location" type="text" value={this.state.Location} onChange={e => this.change(e)}/>
            </div>
        );
    }
}