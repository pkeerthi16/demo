import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Personalprofile from './components/Personal-profile';
import Khelprofile from './components/KhelProfile';
import Home from './components/Home';
import Navbar from './components/Menu';
import LookoutRequest from './components/LookoutRequest';
import Lookout from './components/Lookout';
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Personalprofile/> */}
        <Router>
          <div>
          <Navbar/>
              {/* <Route exact path="/" component={Home}/> */}
              <Route path="/Personal-profile" component={Personalprofile}/>
              <Route path="/KhelProfile" component={Khelprofile}/>
              <Route path="/LookoutRequest" component={LookoutRequest}/>
              <Route path="/Lookout" component={Lookout}/>
              {/* <Footer/> */}
          </div>
      </Router>
      </div>
    );
  }
}

export default App;
