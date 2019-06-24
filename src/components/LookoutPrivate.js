import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import $ from "jquery";
import {Modal, Button} from 'react-bootstrap';
import './LookoutPublic.css';
import './LookoutPrivate.css';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import moment from 'moment';
import Slider from 'react-rangeslider';
import 'rc-datetime-picker/dist/picker.css';
import './KhelProfile.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Khelprofile from './KhelProfile';
let map;
let bounds = new window.google.maps.LatLngBounds();
let sub_area;
let coordinates=[];
let color = ['#FF0000', '#4286f4','#ffff00','#ff00b2','#bb00ff','#00ffff','#26ff00','#00ff87'];
export default class Lookoutprivate extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: [],
            moment: moment(),
            clicks:0,
            value: [20, 40, 60, 80],
            horizontal: 33.3
        }
        this._handleSearch = this._handleSearch.bind(this);
        this.renderCoordinate = this.renderCoordinate.bind(this);
      }
      // Location map js START
  componentDidMount(){
    this._initMap()
  }
  _initMap () {
    map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat: 17.393986, lng: 78.467759},
      zoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      scrollwheel: true,
      streetViewControl: true,
      mapTypeControl: true,
      mapTypeId: 'roadmap',
    });
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
  renderCoordinate(paths){
    coordinates = [];
    let position = 0;
    paths.map((location) =>{
        if(position %10 === 0){
          coordinates.push({"lat": location[1], "lng": location[0]});
          bounds.extend({"lat": location[1], "lng": location[0]});
        }
        position++
        return true;
    });
  }
  renderToMaps (selectedOptions) {
    selectedOptions.forEach((option) => {
      
      if(option.geojson.type === "MultiPolygon"){
        this.renderCoordinate(option.geojson.coordinates[0][0]);
      }else if(option.geojson.type === "Polygon"){
        this.renderCoordinate(option.geojson.coordinates[0]);
      }else{
        alert('option.geojson.type: MultiPolygon & Polygon');
      }
      
      if(coordinates.length > 1){
        sub_area = new window.google.maps.Polygon({
          paths: coordinates,
          strokeColor: color[1],
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color[1],
          fillOpacity: 0.35,
          editable: true
        });
        
        sub_area.setMap(map);
        map.setOptions({ maxZoom: 15 });
        map.fitBounds(bounds);
  
        coordinates = [];
      }
    })
  }
  _handleChange (option) {
    this._initMap()
    this.renderToMaps(option)
  }
  // Location map js END
  // Datetime picker js STRAT
  handleDatetimeChange = (moment) => {
    this.setState({
      moment
    });
    console.log(moment);
  }
  // Datetime picker js END
  //Players count js START
  Decrementitem(){
    if(this.state.clicks == 0){
        this.setState({click:this.state.click})
    }
    else{
  this.setState({clicks:this.state.clicks-1});
    }
}
Incrementitem = () => {
    this.setState({clicks:this.state.clicks+1});
}
//Players count js END
//proficiency slider count js START
handleChangeHorizontal = value => {
  this.setState({
    horizontal: value
  })
  console.log(value);
};
//proficiency slider count js END
onSubmit =(e)=>{
    console.log(this.state);
  }
    render(){
        const shortcuts = {
            'Today': moment(),
            'Yesterday': moment().subtract(1, 'days'),
            'Clear': ''
          };
        const { horizontal } = this.state
        const horizontalLabels = {
          0: '',
          33.3: 'Beginner',
          66.6: 'Intermediate',
          99.9:'Expert'
        }
        return(
            <div>
<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#lookoutprivatemodal">
  Lookout private modal
</button>

<div className="modal fade" id="lookoutprivatemodal" tabindex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
        {/* <h4 className="modal-title" id="myModalLabel">Modal title</h4> */}
        <span className="custom-ss-host-title">Host a Khel</span>
        <span className="custom-ss-private-flag">Flag Private </span><i class="custom-ss-private-flag-icon fab fa-font-awesome-flag"></i>
      </div>
      <div className="modal-body">
        <div className="row">
            <div className="col-md-6 custom-ss-border-right">
                <div className="row">
                    <div className="col-md-3">
                    <p>Where</p>
                    </div>
                    <div className="col-md-9">
                    <AsyncTypeahead
                align="justify"
                multiple
                labelKey="display_name"
                onSearch={this._handleSearch.bind(this)}
                onChange={this._handleChange.bind(this)}
                options={this.state.options}
                placeholder="Search city, ex: tomang or jakarta selatan..."
                renderMenuItemChildren={(option, props, index) => (
                  <div>
                    <span>{option.display_name}</span>
                  </div>
                )}/>
              
              <div className="maps" id="map"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    <p>When</p>
                    </div>
                    <div className="col-md-9">
                    <DatetimePickerTrigger
        shortcuts={shortcuts} 
        moment={this.state.moment}
        onChange={this.handleDatetimeChange}>
        <input type="text" value={this.state.moment.format('YYYY-MM-DD HH:mm')} readOnly />
      </DatetimePickerTrigger>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <button className="custom-ss-playerscount" onClick={this.Decrementitem.bind(this)}>-</button>
            <button className="custom-ss-playerscount-value">{ this.state.clicks }</button>
            <button className="custom-ss-playerscount" onClick={this.Incrementitem}>+</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    <p>Proficiency</p>
                    </div>
                    <div className="col-md-9">
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
                    </div>
                </div>
            </div>
            <div className="col-md-6">
            <Khelprofile/>
            </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={e => this.onSubmit(e)}>Submit</button>
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        </div>
        );
    }
}