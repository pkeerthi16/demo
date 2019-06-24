import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import GoogleMapReact from 'google-map-react';
import Lookoutpublic from './LookoutPublic';
import Lookoutprivate from './LookoutPrivate';
const AnyReactComponent = ({ text }) => <div>{ text }</div>;
export default class Lookout extends Component{
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };
    render(){
        return(
            <div className="container-fluid">
                <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCxqYE89IAcFk8XPJcrg8o0CmUTbdCnpPY&libraries=places' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={17.393986}
            lng={78.467759}
          />
        </GoogleMapReact>
      </div>
      <Lookoutpublic/>
      <Lookoutprivate/>
            </div>
        );
    }
}