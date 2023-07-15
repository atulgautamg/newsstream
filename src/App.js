
import './App.css';
import React, { Component } from 'react'
import { NavBar } from './Components/NavBar';
import './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


export default class App extends Component {
  
   Pagesize=12;
   apikey=process.env.REACT_APP_NEWS_API;
   state={
    progress:100
   }
   setProgress=(progress)=>{
      this.setState({progress:progress})
   }
  render() {
    
    return (
      <div>
       <Router>  
     <NavBar/>
     <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={4}
      />
     <Routes>
          <Route path="/Sports"  element={<News setProgress={this.setProgress} pagesize={this.Pagesize}  key="sports" category='sports' country='in'/>} ></Route>
          <Route path="/Bussiness"  element={<News setProgress={this.setProgress} pagesize={this.Pagesize} key="business" category='business' country='in'/>} ></Route>
          <Route path="/Science"   element={<News setProgress={this.setProgress} pagesize={this.Pagesize} key="sceince" category='science' country='in'/>} ></Route>
          <Route path="/Entertainment"  element={<News setProgress={this.setProgress} pagesize={this.Pagesize} key="enter" category='entertainment' country='in'/>} ></Route>
          <Route path="/Health"  element={<News setProgress={this.setProgress} pagesize={this.Pagesize} key="health " category='health' country='in'/>} ></Route>
          <Route path="/Home"  element={<News setProgress={this.setProgress} pagesize={this.Pagesize} key="general" category='general' country='in'/>} ></Route>
          <Route path="/"  element={<News setProgress={this.setProgress} pagesize={this.Pagesize} key="general1" category='general' country='in'/>} ></Route>
          <Route path="/general1"  element={<News setProgress={this.setProgress} pagesize={this.Pagesize} key="general2" category='general' country='in'/>} ></Route>   
        </Routes>     
     </Router>
      </div>
      
    )
 
  }
}
