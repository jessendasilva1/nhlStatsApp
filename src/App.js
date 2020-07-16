import React, { Component } from 'react';
//import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom';
import './styles.scss';
import './App.scss';

import Home from './components/home/home';


class App extends Component {


	render(){
		return (
			<div id="mainDiv">
				<Home />
			</div> 
			/*<Router>
				<Switch>
					<div id="mainDiv">
						<Route exact path="/" component={Home} />
					</div> 
				</Switch>
			</Router>*/
		); 
	}	
}

export default (App);
