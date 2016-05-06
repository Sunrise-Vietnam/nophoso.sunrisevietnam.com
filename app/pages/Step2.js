import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';

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
	constructor(title,relName, relPassport, relPassportDate, relAdd, relWorkOff, relWorkPos, relTel, relEmail, relationshipWithStudent,studyCourse, studyCountry, studySchool, studyYear){
		super(title,relName, relPassport, relPassportDate, relAdd, relWorkOff, relWorkPos, relTel, relEmail);
		this.relationshipWithStudent = relationshipWithStudent;
		this.studyCourse = studyCourse;
		this.studyCountry = studyCountry;
		this.studySchool = studySchool;
		this.studyYear = studyYear;
	}
}

export default class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step2: [
				new parentsInfo('A. Thông tin Bố'),
	            new parentsInfo('B. Thông tin Mẹ'),
	            new parentsInfoExtra('C. Thông tin người thân từng đi du học'),
	            new parentsInfo('D. Thông tin người nhà khác & có liên quan đến kế hoạch du học (VD: người nhà ở nước ngoài,...)')
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
        document.title = 'Bước 2 - Thông tin gia đình - Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
        /*$('#formStep2')
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
                                message: 'Bạn chưa nhập họ tên'
                            }
                        }
                    },
                    txtPassport: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập số hộ chiếu hoặc CMND'
                            }
                        }
                    },
                    dPassport: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn ngày cấp hộ chiếu/CMND'
                            }
                        }
                    },
                    taAddress: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập địa chỉ'
                            }
                        }
                    },
                    txtWorkOffice: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập nơi công tác'
                            }
                        }
                    },
                    tlTel: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập số điện thoại'
                            },
                            regexp: {
                                regexp: /^[+0-9\s]{8,20}$/,
                                message: 'Số điện thoại không hợp lệ'
                            }
                        }
                    },
                    eEmail: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập email'
                            },
                            emailAddress: {
                                message: 'Email không hợp lệ'
                            }
                        }
                    },
                    txtRelationship: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập'
                            }
                        }
                    },
                    txtCourse: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập tên khoá học'
                            }
                        }
                    },
                    txtAtSchool: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập tên trường'
                            }
                        }
                    },
                    txtCountry: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập tên nước'
                            }
                        }
                    },
                    txtTimeRange: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập khoảng thời gian'
                            }
                        }
                    },
                    dStart: {
                        row: '.col-md-4',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn ngày bắt đầu'
                            },
                            date: {
                                min: 'dDoB',
                                max: 'dEnd',
                                message: 'Xin nhập ngày bắt đầu trước ngày kết thúc'
                            }
                        }
                    },
                    dEnd: {
                        row: '.col-md-4',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn ngày kết thúc'
                            },
                            date: {
                                min: 'dStart',
                                message: 'Xin nhập ngày kết thúc sau ngày bắt đầu'
                            }
                        }
                    },
                    txtClass: {
                        row: '.col-md-4',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập thông tin học tập'
                            }
                        }
                    },
                    txtScore: {
                        row: '.col-md-4',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập điểm số'
                            },
                            regexp: {
                                regexp: /^[0-9,.\s]+$/,
                                message: 'Điểm số chỉ được điền ký tự số, dấu . hoặc dấu ,'
                            }
                        }
                    },
                    txtSchool: {
                        row: '.col-md-4',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập tên trường'
                            }
                        }
                    }
                }
            })*/
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-1");
    }

    _nextStep(e) {
        e.preventDefault();
        console.info(this.state.step2);
        //let isValid = ($('#formStep2').data('formValidation').validate().isValid());
	    this.props.history.pushState(null, "/buoc-3");
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
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title"><b>
                        <span className="green">Bước 1&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        Bước 2 - Thông tin gia đình&nbsp;&nbsp;<span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 3&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 4&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 5</span>
                    </b></h3>
                </div>
                <div className="panel-body">
                    <form id="formStep2" className="form-horizontal">
                        <div className="smallspace"></div>
						<ParentElement key={`pe_${infoA.relId}`} info={infoA} onInfoChange={this.__InfoChange}/>
                        <hr className="hr-style"/>
	                    <ParentElement key={`pe_${infoB.relId}`} info={infoB} onInfoChange={this.__InfoChange}/>
                        <hr className="hr-style"/>
	                    <ParentElement key={`pe_${infoC.relId}`} info={infoC} onInfoChange={this.__InfoChange}/>
                        <hr className="hr-style"/>
	                    <ParentElement key={`pe_${infoD.relId}`} info={infoD} onInfoChange={this.__InfoChange}/>
                    </form>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-xs-6 col-md-2 col-md-offset-8 text-right">
                            <button className="btn btn-default" onClick={this._preStep}>Bước <span
                                className="badge">1</span></button>
                        </div>
                        <div className="col-xs-6 col-md-2">
                            <button className="btn btn-primary" onClick={this._nextStep}>Bước <span
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

    componentWillMount(){
        //this.setState(_.extend(this.state, this.props.history));
    },

    render() {
	    let info = this.state;
	    let display_relationshipWithStudent = '';
	    let display_studyInfo = '';
	    if(_.has(info,'relationshipWithStudent') && _.has(info,'studyCourse')){
		    display_relationshipWithStudent = <div>
			    <label className="control-label col-xs-12 col-md-2">Quan hệ với học sinh</label>
			    <div className="col-xs-12 col-md-4">
				    <input type="text" name="txtRelationship" className="form-control" placeholder="Quan hệ với học sinh" value={info.relationshipWithStudent} data-state="relationshipWithStudent" onChange={this.__inputOnChange}/>
			    </div>
		    </div>

		    display_studyInfo = <div className="form-group">
			    <label className="control-label col-xs-12 col-md-2">Đã từng du học</label>
			    <div className="col-xs-12 col-md-3 margin-space">
				    <input type="text" name="txtCourse" className="form-control" placeholder="Khoá học" value={info.studyCourse} data-state="studyCourse" onChange={this.__inputOnChange}/>
			    </div>
			    <div className="col-xs-12 col-md-3 margin-space">
				    <input type="text" name="txtAtSchool" className="form-control" placeholder="Tại trường" value={info.studySchool} data-state="studySchool" onChange={this.__inputOnChange}/>
			    </div>
			    <div className="col-xs-12 col-md-2 margin-space">
				    <input type="text" name="txtCountry" className="form-control" placeholder="Tại nước" value={info.studyCountry} data-state="studyCountry" onChange={this.__inputOnChange}/>
			    </div>
			    <div className="col-xs-12 col-md-2">
				    <input type="text" name="txtTimeRange" className="form-control" placeholder="Vào khoảng thời gian" value={info.studyYear} data-state="studyYear" onChange={this.__inputOnChange}/>
			    </div>
		    </div>
	    }
        return <div className="row">
		    <div className="col-md-12">
			    <h4 className="blue"><b>{info.title}</b></h4>
		    </div>
		    <div className="col-md-12">
			    <fieldset id={`frm_${info.relId}`}>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">Họ và tên</label>
					    <div className="col-xs-12 col-md-4">
						    <input type="text" name="txtRelativesName" className="form-control" placeholder="Họ và tên" value={this.state.relName} data-state="relName" onChange={this.__inputOnChange}/>
					    </div>
					    {display_relationshipWithStudent}
				    </div>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">Hộ chiếu/CMTND</label>
					    <div className="col-xs-12 col-md-4 margin-space">
						    <input type="text" name="txtPassport" className="form-control" placeholder="Số hộ chiếu/CMTND" value={this.state.relPassport} data-state="relPassport" onChange={this.__inputOnChange}/>
					    </div>
					    <label className="control-label col-xs-12 col-md-2">Ngày cấp</label>
					    <div className="col-xs-12 col-md-4">
						    <input type="date" name="dPassport" className="form-control" placeholder="Ngày cấp" value={this.state.relPassportDate} data-state="relPassportDate" onChange={this.__inputOnChange}/>
					    </div>
				    </div>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">Địa chỉ hiện tại</label>
					    <div className="col-xs-12 col-md-10">
						    <textarea name="taAddress" className="form-control" placeholder="Địa chỉ" rows="2" value={this.state.relAdd} data-state="relAdd" onChange={this.__inputOnChange}></textarea>
					    </div>
				    </div>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">Nơi công tác</label>
					    <div className="col-xs-12 col-md-4 margin-space">
						    <input type="text" name="txtWorkOffice" className="form-control" placeholder="Nơi công tác" value={this.state.relWorkOff} data-state="relWorkOff" onChange={this.__inputOnChange}/>
					    </div>
					    <label className="control-label col-xs-12 col-md-2">Chức vụ (nếu có)</label>
					    <div className="col-md-4">
						    <input type="text" name="txtWorkPos" className="form-control" placeholder="Chức vụ" value={this.state.relWorkPos} data-state="relWorkPos" onChange={this.__inputOnChange}/>
					    </div>
				    </div>
				    <div className="form-group">
					    <label className="control-label col-xs-12 col-md-2">Số điện thoại</label>
					    <div className="col-xs-12 col-md-4 margin-space">
						    <input type="text" name="tlTel" className="form-control" placeholder="Số điện thoại" value={this.state.relTel} data-state="relTel" onChange={this.__inputOnChange}/>
					    </div>
					    <label className="control-label col-xs-12 col-md-2">Email</label>
					    <div className="col-xs-12 col-md-4">
						    <input type="email" name="eEmail" className="form-control" placeholder="Địa chỉ email" value={this.state.relEmail} data-state="relEmail" onChange={this.__inputOnChange}/>
					    </div>
				    </div>
				    {display_studyInfo}
			    </fieldset>
		    </div>
	    </div>
    }
})