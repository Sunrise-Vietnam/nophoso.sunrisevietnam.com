import React from 'react';

export default class Loading extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        let self = this;
        window.emitter.addListener('loadedLanguage',(isLoaded)=>{
            if(isLoaded){
                console.log(window.i18n.t('welcome:h4'));
                setTimeout(()=>{
                    self.props.history.pushState(null, "/bat-dau");
                },100)
            }
        })
    }
    render(){
        return <h1>Loading...</h1>
    }
}