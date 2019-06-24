import React, { Component } from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import './Personal-profile.css';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import 'react-day-picker/lib/style.css';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import moment from 'moment';
import 'rc-datetime-picker/dist/picker.css';
import Slider from 'react-rangeslider';
import _ from 'lodash';

let map;
let bounds = new window.google.maps.LatLngBounds();
let sub_area;
let coordinates=[];
let color = ['#FF0000', '#4286f4','#ffff00','#ff00b2','#bb00ff','#00ffff','#26ff00','#00ff87'];
const Range = Slider.Range;
const style = { width: 400, margin: 50 };
export default class LookoutRequest extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      options: [],
      selectedOptions: [],
      clicks:0,
      // selectedDay: undefined,
      value: [20, 40, 60, 80],
      moment: moment(),
      horizontal: 33.3
    }
    this._handleSearch = this._handleSearch.bind(this);
    this.renderCoordinate = this.renderCoordinate.bind(this);

  }

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
  // handledaytimeChange = (newDate) => {
  //   console.log("newDate", newDate);
  //   return this.setState({date: newDate});
  // }
  _handleChange (option) {
    this._initMap()
    this.renderToMaps(option)
  }
  handleChangeHorizontal = value => {
    this.setState({
      horizontal: value
    })
    console.log(value);
  };
//   handleDayChange(day){
//     this.setState({selectedDay:day});
// }
handleDatetimeChange = (moment) => {
  this.setState({
    moment
  });
  console.log(moment);
}
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

  render() {
    const { horizontal } = this.state
    const horizontalLabels = {
      0: '',
      33.3: 'Beginner',
      66.6: 'Intermediate',
      99.9:'Expert'
    }
    const shortcuts = {
      'Today': moment(),
      'Yesterday': moment().subtract(1, 'days'),
      'Clear': ''
    };
    return (
      <div className="container" style={{height: '100%'}}>
      <h3>Lookout</h3>
      <p>Game @ Private</p>
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
              <div>
                  <button className="btn btn-primary custom-ss-playerscount" onClick={this.Decrementitem.bind(this)}>-</button>
                  <button className="btn btn-primary custom-ss-playerscount">{ this.state.clicks }</button>
                  <button  className="btn btn-primary custom-ss-playerscount" onClick={this.Incrementitem}>+</button>
              </div>
              {/* <div className="custom-ss-datepicker-lookout-request">
              <label>When</label> <DayPickerInput onDayChange={this.handleDayChange.bind(this)}/>
              </div> */}
              {/* <DateTimeField
      dateTime={date}
      format={format}
      viewMode={mode}
      inputFormat={inputFormat}
      onChange={this.handledaytimeChange}
    /> */}
    <div className="custom-datetimepicker">
    <DatetimePickerTrigger
        shortcuts={shortcuts} 
        moment={this.state.moment}
        onChange={this.handleDatetimeChange}>
        <input type="text" value={this.state.moment.format('YYYY-MM-DD HH:mm')} readOnly />
      </DatetimePickerTrigger>
    </div>
    <div className="custom-rangeslider">
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
        {/* <div className='value'>{formatkg(horizontal)}</div> */}
        </div>
        <button className="btn btn-primary custom-ss-lookoutresponse-submit">Submit</button>
      </div>
    );
  }
}