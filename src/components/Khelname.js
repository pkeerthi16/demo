import React,{Component} from 'react';
export default class KhelName extends Component{
    constructor(props){
        super(props);
    this.state={
        KhelName:''
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
            <label className="col-sm-4" >Khel Name</label><input className="col-sm-6" type="text" name="KhelName" value={this.state.KhelName} onChange={e => this.change(e)} />
            </div>
        );
    }
}