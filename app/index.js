import './libs/i18n.js';
require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");
require('./libs/formValidation/dist/js/formValidation.min.js');
require('./libs/formValidation/dist/js/framework/bootstrap.min.js');
require('./libs/formValidation/dist/js/language/vi_VN');
require('./libs/formValidation/dist/css/formValidation.min.css');
require('./index.css');
require('react-dropzone');
/*require('//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css')*/
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Home from './pages/Home.jsx';
import Step1 from './pages/Step1.jsx';
import Step2 from './pages/Step2.js';
import Step3 from './pages/Step3.js';
import Step4 from './pages/Step4.js';
import Step5 from './pages/Step5.js';
import Thanks from './pages/Thanks.js';


ReactDom.render((
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/" component={Home}/>
			<Route path="/buoc-1" component={Step1}/>
			<Route path="/buoc-2" component={Step2}/>
			<Route path="/buoc-3" component={Step3}/>
			<Route path="/buoc-4" component={Step4}/>
			<Route path="/buoc-5" component={Step5}/>
			<Route path="/cam-on" component={Thanks}/>
		</Route>
	</Router>
), document.getElementById('app'))