import React from 'react';
import T from '../libs/getLang.js';
import db from 'localforage';

export default class Thanks extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            thanks: {}
        }
        //this._preStep = this._preStep.bind(this);
        //this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = 'Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
        db.clear();
    }

    render(){
        return <div>
            <div className="row">
                <div className="col-xs-12">
                    <img width="100%" className="center-block img-thanks" src={require('../photos/thanks-heading.png')}/>
                </div>
            </div>
            <div className="smallspace"></div>
            <div className="row">
                <div className="col-xs-12 col-md-8 col-md-offset-2">
                    <h4 className="text-uppercase text-center">{T('thanks:h4-1')}<br/>{T('thanks:h4-2')}</h4>
                    <h4  className="text-uppercase text-center">{T('thanks:h4-3')}</h4>
                </div>
                <div className="col-xs-12 col-md-8 col-md-offset-2">
                    <h4 className="text-uppercase text-center"><b>{T('thanks:h4-4')}</b></h4>
                    <h4 className="text-center"><a type="button" className="btn btn-orange bgorange white" href="http://www.sunrisevietnam.com/">{T('thanks:BtnText')}</a></h4>
                </div>
            </div>
        </div>
    }
}