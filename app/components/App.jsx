import React from 'react';
import Header from './Header.jsx';

export default class App extends React.Component{
    constructor(props){
        super(props);
    }
	componentDidMount(){
		if(!window.i18n || window.i18n.t){
			this.props.history.pushState(null, "/");
		}
	}

	render(){
		return (
			<div className="container">
				<Header/>
				{this.props.children}
			</div>
		)
	}
}