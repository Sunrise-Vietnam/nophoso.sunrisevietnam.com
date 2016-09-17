import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';
import T from '../libs/getLang.js';

class parentsInfo {
    constructor(title,relName, relPassport, relPassportDate, relAdd, relWorkOff, relWorkPos, relTel, relEmail){
        this.relId = hat();
	    this.title = title;
        this.relName = relName;
        this.relPassport = relPassport;
        this.relPassportDate = relPassportDate;
        this.relAdd = relAdd;
        this.relWorkOff = relWorkOff;
        this.relWorkPos = relWorkPos;
        this.relTel = relTel;
        this.relEmail = relEmail;
    }
}

class parentsInfoExtra extends parentsInfo{
	constructor(title,relName, relPassport, relPassportDate, relAdd, relWorkOff, relWorkPos, relTel, relEmail, relationship, relCourse, relSchool, relCountry, relYears){
		super(title,relName, relPassport, relPassportDate, relAdd, relWorkOff, relWorkPos, relTel, relEmail);
		this.relationship = relationship;
		this.relCourse = relCourse;
        this.relSchool = relSchool;
        this.relCountry = relCountry;
		this.relYears = relYears;
	}
}

export default class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step2: [
				new parentsInfo(T('step2:Father')),
	            new parentsInfo(T('step2:Mother')),
	            new parentsInfoExtra(T('step2:Rel1')),
	            new parentsInfo(T('step2:Rel2'))
            ]
        };
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
        this.__inputOnChange = this.__inputOnChange.bind(this);
        this.__InfoChange = this.__InfoChange.bind(this);
    }

    componentWillMount() {
        let self = this;
        db.getItem('step2').then((step2)=>{
            self.setState(_.extend(this.state.step2,step2));
        })
    }

    componentDidMount() {
        document.title = 'Step 2 - Family data';
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-1");
    }

    _nextStep(e) {
        e.preventDefault();
        console.info(this.state.step2);
        let formId1 = `#frm_${this.state.step2[0].relId}`
        let formId2 = `#frm_${this.state.step2[1].relId}`
        let isValid1 = $(formId1).data('formValidation').validate().isValid();
        let isValid2 = $(formId2).data('formValidation').validate().isValid();
        if(isValid1 && isValid2){
	        this.props.history.pushState(null, "/buoc-3");
        }
    }

    __inputOnChange(e){
        let keyState = e.target.getAttribute('data-state');
        let step2 = _.extend(this.state.step2, {[keyState] : e.target.value});
        this.setState(step2, function(){
            console.log(keyState,this.state.step2);
            db.setItem('step2', this.state.step2);
        });
    }

    __InfoChange(info){
        let parentsInformation = _.map(this.state.step2, (_info)=>{
            if(_info.relId == info.relId){
	            _info = _.extend(_info, info);
            }
            return _info;
        });
        this.setState(_.extend(this.state.step2, parentsInformation),function(){
            db.setItem('step2', this.state.step2);
        });
    }

    render() {
	    let infoA = this.state.step2[0];
	    let infoB = this.state.step2[1];
	    let infoC = this.state.step2[2];
	    let infoD = this.state.step2[3];
        return <div>
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title white">
                        <a type="button" className="a-header" onClick={this._preStep}>{T('step1:Step')} 1&nbsp;&nbsp;</a>
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        <b>{T('step2:Step2')}</b>&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        {T('step1:Step')} 3&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        {T('step1:Step')} 4
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="smallspace"></div>
                    <ParentElement key={`pe_${infoA.relId}`} info={infoA} isValidate={true}
                                   onInfoChange={this.__InfoChange}/>
                    <hr className="hr-style"/>
                    <ParentElement key={`pe_${infoB.relId}`} info={infoB} isValidate={true}
                                   onInfoChange={this.__InfoChange}/>
                    <hr className="hr-style"/>
                    <ParentElement key={`pe_${infoC.relId}`} info={infoC} onInfoChange={this.__InfoChange}/>
                    <hr className="hr-style"/>
	                    <ParentElement key={`pe_${infoD.relId}`} info={infoD} onInfoChange={this.__InfoChange}/>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-xs-6 col-md-2 col-md-offset-7 text-right">
                            <button className="btn btn-warning" onClick={this._preStep}>{T('step1:Step')} <span
                                className="badge">1</span></button>
                        </div>
                        <div className="col-xs-6 col-md-2">
                            <button className="btn btn-success" onClick={this._nextStep}>{T('step1:Step')} <span
                                className="badge">3</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

let ParentElement = React.createClass({
    getInitialState(){
        return this.props.info;
    },

    __inputOnChange(e){
        let keyState = e.target.getAttribute('data-state');
        this.setState({[keyState] : e.target.value},()=>{
            this.props.onInfoChange(this.state);
        })
    },

    componentDidMount(){
        if(this.props.isValidate){
        let formId = `#frm_${this.state.relId}`
        $(formId)
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
                    txtRelativesName: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    taAddress: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    tlTel: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            },
                            regexp: {
                                regexp: /^[+0-9\s]{8,20}$/,
                                message: T('step1:RETel')
                            }
                        }
                    },
                    eEmail: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            },
                            regexp: {
                                regexp: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                                message: T('step1:REEmail')
                            }
                        }
                    },
                    txtRelationship: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step2:NERelationship')
                            }
                        }
                    },
                    txtCourse: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step2:NERelCourse')
                            }
                        }
                    },
                    txtAtSchool: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step2:NERelSchool')
                            }
                        }
                    },
                    txtCountry: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step2:NERelCountry')
                            }
                        }
                    },
                    txtTimeRange: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step2:NERelTime')
                            }
                        }
                    }
                }
            })
        }
    },

    componentWillMount(){
        //this.setState(_.extend(this.state, this.props.history));
    },

    render() {
	    let info = this.state;
	    let display_relationshipWithStudent = '';
	    let display_studyInfo = '';
	    if(_.has(info,'relationship') && _.has(info,'relCourse')){
		    display_relationshipWithStudent = <div>
			    <label className="control-label col-xs-12 col-md-2">{T('step2:Relationship')}</label>
			    <div className="col-xs-12 col-md-4">
				    <input type="text" name="txtRelationship" className="form-control" value={info.relationship} data-state="relationship" onChange={this.__inputOnChange}/>
			    </div>
		    </div>

		    display_studyInfo = <div className="form-group">
			    <label className="control-label col-xs-12 col-md-2">{T('step2:RelCourse')}</label>
			    <div className="col-xs-12 col-md-3 margin-space">
				    <input type="text" name="txtCourse" className="form-control" placeholder={T('step2:RelMajor')} value={info.relCourse} data-state="relCourse" onChange={this.__inputOnChange}/>
			    </div>
			    <div className="col-xs-12 col-md-3 margin-space">
				    <input type="text" name="txtAtSchool" className="form-control" placeholder={T('step2:RelSchool')} value={info.relSchool} data-state="relSchool" onChange={this.__inputOnChange}/>
			    </div>
			    <div className="col-xs-12 col-md-2 margin-space">
				    <input type="text" name="txtCountry" className="form-control" placeholder={T('step2:RelCountry')} value={info.relCountry} data-state="relCountry" onChange={this.__inputOnChange}/>
			    </div>
			    <div className="col-xs-12 col-md-2">
				    <input type="text" name="txtTimeRange" className="form-control" placeholder={T('step2:RelTime')} value={info.relYears} data-state="relYears" onChange={this.__inputOnChange}/>
			    </div>
		    </div>
	    }
        return <div className="row">
		    <div className="col-md-12">
			    <h4 className="blue"><b>{info.title}</b></h4>
		    </div>
		    <div className="col-md-12">
			    <form className="form-horizontal form-fieldSets" id={`frm_${info.relId}`}>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">{T('step2:RelName')}</label>
					    <div className="col-xs-12 col-md-4">
						    <input type="text" name="txtRelativesName" className="form-control nameField" value={this.state.relName} data-state="relName" onChange={this.__inputOnChange}/>
					    </div>
					    {display_relationshipWithStudent}
				    </div>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">{T('step2:Passport')}</label>
					    <div className="col-xs-12 col-md-4 margin-space">
						    <input type="text" name="txtPassport" className="form-control" value={this.state.relPassport} data-state="relPassport" onChange={this.__inputOnChange}/>
					    </div>
					    <label className="control-label col-xs-12 col-md-2">{T('step2:PassportDate')}</label>
					    <div className="col-xs-12 col-md-4">
						    <input type="date" name="dPassport" className="form-control" value={this.state.relPassportDate} data-state="relPassportDate" onChange={this.__inputOnChange}/>
					    </div>
				    </div>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">{T('step2:Address')}</label>
					    <div className="col-xs-12 col-md-10">
						    <textarea name="taAddress" className="form-control" rows="2" value={this.state.relAdd} data-state="relAdd" onChange={this.__inputOnChange}></textarea>
					    </div>
				    </div>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">{T('step2:WorkOffice')}</label>
					    <div className="col-xs-12 col-md-4 margin-space">
						    <input type="text" name="txtWorkOffice" className="form-control" value={this.state.relWorkOff} data-state="relWorkOff" onChange={this.__inputOnChange}/>
					    </div>
					    <label className="control-label col-xs-12 col-md-2">{T('step2:WorkPosition')}</label>
					    <div className="col-md-4">
						    <input type="text" name="txtWorkPos" className="form-control" value={this.state.relWorkPos} data-state="relWorkPos" onChange={this.__inputOnChange}/>
					    </div>
				    </div>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">{T('step2:Tel')}</label>
					    <div className="col-xs-12 col-md-4 margin-space">
						    <input type="tel" name="tlTel" className="form-control" value={this.state.relTel} data-state="relTel" onChange={this.__inputOnChange}/>
					    </div>
					    <label className="control-label col-xs-12 col-md-2">Email</label>
					    <div className="col-xs-12 col-md-4">
						    <input type="text" name="eEmail" className="form-control" value={this.state.relEmail} data-state="relEmail" onChange={this.__inputOnChange}/>
					    </div>
				    </div>
				    {display_studyInfo}
			    </form>
		    </div>
	    </div>
    }
})