import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';

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
        document.title = 'Bước 3 - Một số câu hỏi tự luận - Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
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
                    taAnswerA: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập câu trả lời'
                            }
                        }
                    },
                    taAnswerB: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập câu trả lời'
                            }
                        }
                    },
                    taAnswerC: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập câu trả lời'
                            }
                        }
                    }
                }
            })
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
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title"><b>
                        <span className="green">Bước 1&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="green">Bước 2&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        Bước 3 - Một số câu hỏi tự luận&nbsp;&nbsp;<span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 4&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 5</span>
                    </b></h3>
                </div>
                <div className="panel-body">
                    <form id="formStep3">
                        <div className="smallspace"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>A. Vì sao bạn nghĩ mình phù hợp với việc du học?</b></h4>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea rows="5" className="form-control" name="taAnswerA" onChange={this.__inputOnChange} data-state="answerA" value={this.state.step3.answerA}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="smallspace"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>B. Vì sao bạn nghĩ mình xứng đáng nhận học bổng?</b></h4>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea rows="5" className="form-control" name="taAnswerB" onChange={this.__inputOnChange} data-state="answerB" value={this.state.step3.answerB}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="smallspace"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>C. Nếu được 3 điều có thể thay đổi thế giới, bạn muốn thay đổi điều gì?</b></h4>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea rows="5" className="form-control" name="taAnswerC" onChange={this.__inputOnChange} data-state="answerC" value={this.state.step3.answerC}></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-xs-6 col-md-2 col-md-offset-8 text-right">
                            <button className="btn btn-default" onClick={this._preStep}>Bước <span
                                className="badge">2</span></button>
                        </div>
                        <div className="col-xs-6 col-md-2">
                            <button className="btn btn-primary" onClick={this._nextStep}>Bước <span
                                className="badge">4</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}