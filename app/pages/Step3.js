import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';
import T from '../libs/getLang.js';

export default class Step3 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            step3: {
                answerA: null,
                answerB: null,
                answerC: null
            }
        };
        this._firstStep = this._firstStep.bind(this);
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
        this.__inputOnChange = this.__inputOnChange.bind(this);
    }

    componentWillMount() {
        let self = this;
        db.getItem('step3').then((step3)=>{
            self.setState(_.extend(this.state.step3,step3));
        })
    }

    componentDidMount() {
        document.title = 'Step 3 - Essay questions';
        $('#formStep3')
            .formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                row: {
                    valid: 'field-success',
                    invalid: 'field-error'
                },
                fields: {
                    taAnswer: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step3:NEAn')
                            },
                            stringLength: {
                                message: T('step3:SLAn'),
                                /*max: function (value, validator, $field) {
                                    var regex = /\s+/gi;
                                    var wordCount = value.trim().replace(regex, ' ').split(' ').length;
                                    //console.info(value, wordCount, 20-wordCount);
                                    return 1400;
                                }*/
                                max: 2000,
                                min: 50
                            }
                        }
                    }
                }
            })
    }
    _firstStep(e){
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-1");
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-2");
    }

    _nextStep(e) {
        e.preventDefault();
        let isValid = $('#formStep3').data('formValidation').validate().isValid();
        if(isValid){
            this.props.history.pushState(null, "/buoc-4");
        }

    }

    __inputOnChange(e){
        let keyState = e.target.getAttribute('data-state');
        let step3 = _.extend(this.state.step3, {[keyState] : e.target.value});
        this.setState(step3, function(){
            db.setItem('step3', this.state.step3);
        });
        //this.state.step1 = step1;
    }

    render(){
        return <div>
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title white">
                        <a type="button" className="a-header" onClick={this._firstStep}>{T('step1:Step')} 1</a>&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        <a type="button" className="a-header" onClick={this._preStep}>{T('step1:Step')} 2</a>&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        <b>{T('step3:Step3')}&nbsp;&nbsp;</b>
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        {T('step1:Step')} 4
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="col-xs-12">
                        <p><i>{T('step3:Note')}</i></p>
                    </div>
                    <form id="formStep3">
                        <div className="smallspace"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>{T('step3:QuestA')}</b></h4>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea rows="5" className="form-control" name="taAnswer" onChange={this.__inputOnChange} data-state="answerA" value={this.state.step3.answerA}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="smallspace"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>{T('step3:QuestB')}</b></h4>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea rows="5" className="form-control" name="taAnswer" onChange={this.__inputOnChange} data-state="answerB" value={this.state.step3.answerB}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="smallspace"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>{T('step3:QuestC')}</b></h4>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea rows="5" className="form-control" name="taAnswer" onChange={this.__inputOnChange} data-state="answerC" value={this.state.step3.answerC}></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-xs-6 col-md-2 col-md-offset-7 text-right">
                            <button className="btn btn-warning" onClick={this._preStep}>{T('step1:Step')} <span
                                className="badge">2</span></button>
                        </div>
                        <div className="col-xs-6 col-md-2">
                            <button className="btn btn-success" onClick={this._nextStep}>{T('step1:Step')} <span
                                className="badge">4</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}