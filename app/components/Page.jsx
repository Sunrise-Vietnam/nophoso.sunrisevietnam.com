import React from 'react';

export default class Page extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        if(!window.i18n || window.i18n.t){
            this.props.history.pushState(null, "/");
        }
    }
    render(){
        return <div></div>
    }
}