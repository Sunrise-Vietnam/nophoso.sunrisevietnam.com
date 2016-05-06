import React from 'react'

import hat from 'hat'
import _ from 'lodash'
import db from '../db.js';

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
		let h4 = window.i18n.t('welcome:h4');
		let button = window.i18n.t('welcome:btnStart');
		return (
			<div className="row">
				<div className="col-xs-12 col-md-10 col-md-offset-1">
					<div className="jumbotron">
						<h4>{h4}</h4>
						<button className="btn btn-primary" onClick={this._startClick}>{button}</button>
					</div>
				</div>
			</div>
		)
	}
}