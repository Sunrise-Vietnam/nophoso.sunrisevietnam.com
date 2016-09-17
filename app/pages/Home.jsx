import React from 'react'
import Page from '../components/Page.jsx';

import hat from 'hat'
import _ from 'lodash'
import db from '../db.js';
import T from '../libs/getLang.js';

export default class Home extends React.Component{
	constructor(props){
		super(props);

		this._startClick = this._startClick.bind(this);
	}

	_startClick(e){
		e.preventDefault();
		db('nophoso').remove({});
		this.props.history.pushState(null, "/buoc-1");
	}
	render(){
		let button = T('welcome:btnStart');
		let logos = T('welcome:logos');
		return (
			<div className="col-xs-12">
				<div className="space"></div>
				<div className="row special-background">
					<div className="col-xs-12 text-center">
						<div className="smallspace"></div>
						<img id="img-logo" src={require('../photos/logo-en.png')}/>
						<div className="smallspace"></div>
					</div>
					<div className="col-xs-12 col-md-10 col-md-offset-1">
						<h4 className="text-uppercase text-center mblue">{T('welcome:h4-1')}<br/>{T('welcome:h4-2')}</h4>
						<button className="btn btn-orange bgorange white text-uppercase center-block" onClick={this._startClick}><b>{button}</b></button>
						<div className="smallspace"></div>
					</div>
					<div className="smallspace"></div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-md-10 col-md-offset-1">
						<img id="img-bottom" className="center-block img-responsive" src={require('../photos/world.png')}/>
					</div>
				</div>
			</div>
		)
	}
}