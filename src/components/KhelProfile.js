import React,{Component} from 'react';
import './KhelProfile.css';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import $ from "jquery";
export default class Khelprofile extends Component{
    constructor(props){
        super(props)
    this.state={
        tasks: [{name:"haritha@gmail.com",
             category:"wip"},  
          
            {name:"sudheer@gmail.com", 
             category:"wip"},

            {name:"sravanthi@gmail.com", 
             category:"wip"},

            {name:"girish@gmail.com", 
             category:"wip"},

             {name:"vj@gmail.com", 
             category:"wip"},

             {name:"bhanu@gmail.com", 
             category:"wip"},

             {name:"pavan@gmail.com", 
             category:"wip"}         
      ],
      allowNew: false,
    isLoading: false,
    multiple: true,
      options: [],
    }
    this._handleSearch = this._handleSearch.bind(this);
}
_handleSearch(query) {
    if (!query) {
      return;
    }
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`)
      .then(resp => resp.json())
      .then(data => {
        let filterGeoJsonType = data.filter(function(data){
          return data.geojson.type === "MultiPolygon" || data.geojson.type === "Polygon"
        });
        this.setState({options: filterGeoJsonType});
      });
    }, 1000)
  }
  _handleChange = (e) => {
    const {checked, name} = e.target;
    this.setState({[name]: checked});
  }
    onDragOver =(ev) =>{
        ev.preventDefault();
    }
    onDrop = (ev, cat) => {       
        let id = ev.dataTransfer.getData("id");
        let tasks = this.state.tasks.filter((task) => {
            if (task.name == id) {
                     task.category = cat;           
            }              
             return task;       
         });        
         this.setState({           
            ...this.state,           
            tasks       
         });    
      }
    onDragStart = (ev,id)=>{
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id",id);
    }
    // removeuserid(){
    //     alert("helo");
    //     // $("custom-ss-userlist").remove();
    //     $(this).parent(".custom-ss-userlist").remove();
    // }
    componentDidMount(){
    $(".custom-ss-remove-users-btn").click(function(){
      $(this).parent().remove();
    });
}
    render(){
        var tasks={
            wip:[],
            complete:[]
        }
        this.state.tasks.forEach((t)=>{
            tasks[t.category].push(
                <div className="custom-ss-userlist" key={t.name} onDragStart={(e)=>this.onDragStart(e,t.name)} draggable className="draggable" style={{backgroundColor:t.bgcolor}}>
                 {t.name}
                 <button className="custom-ss-remove-users-btn">
                     <span>X</span>
                 </button>
                </div>
            );
        })
        const {multiple} = this.state;
        return(
            <div className="container">
                <div className="container-drag">
                <h3 className="custom-ss-titles">Frequent/Recent Users</h3>
                    <div className="wip" onDrop={(e)=>{this.onDrop(e,"wip")}} onDragOver={(e)=>this.onDragOver(e)}>
                    {/* <span className="task-header">WIP</span> */}
                    {tasks.wip}
                    </div>
                    <h3 className="custom-ss-titles">Users List</h3>
                    <div className="droppable" onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e,"complete")}>
                    {/* <span className="task-header">COMPLETE</span> */}
                    {tasks.complete}
                    <AsyncTypeahead
          {...this.state}
          align="justify"
          labelKey="display_name"
          multiple
          minLength={3}
          onSearch={this._handleSearch}
          placeholder="Search for a Github user..."
          renderMenuItemChildren={(option, props,index) => (
            <div>
                    <span>{option.display_name}</span>
                  </div>
          )}
        />
                    </div>
                </div>
            </div>
        );
    }
}