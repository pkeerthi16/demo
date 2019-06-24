import React,{Component} from 'react';
export default class Name extends Component{
    constructor(props){
        super(props);
    this.state={
        Name:''
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
            <label className="col-sm-4" >Name</label><input className="col-sm-6" name="Name" type="text" data={this.state} value={this.state.Name} onChange={e => this.change(e)} />
            </div>
        );
    }
}