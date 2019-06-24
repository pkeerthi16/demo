import React,{Component} from 'react';
export default class City extends Component{
    constructor(props){
        super(props);
    this.state={
        City:''
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
            <label className="col-sm-4">City</label><input className="col-sm-6" name="City" type="text" value={this.state.City} onChange={e => this.change(e)} />
            </div>
        );
    }
}