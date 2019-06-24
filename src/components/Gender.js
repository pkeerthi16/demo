import React,{Component} from 'react';
export default class Gender extends Component{
    constructor(props){
        super(props);
    this.state={
        Gender:''
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
            <label className="col-sm-4">Gender</label><input className="col-sm-6" name="Gender" type="text" value={this.state.Gender} onChange={e => this.change(e)}/>
            </div>
        );
    }
}