require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");
require('./libs/formValidation/dist/js/formValidation.min.js');
require('./libs/formValidation/dist/js/language/vi_VN');
require('./libs/formValidation/dist/css/formValidation.min.css');

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Home from './pages/Home.jsx';
import Step1 from './pages/Step1.jsx';


ReactDom.render((
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/" component={Home}/>
			<Route path="/buoc-1" component={Step1}/>
		</Route>
	</Router>
), document.getElementById('app'))