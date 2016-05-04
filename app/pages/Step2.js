import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';

class parentsInfo {
    constructor(relName, relPassport, relPassportDate, relAdd, relWorkOff, relWorkPos, relTel, relEmail){
        this.relId = hat();
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

export default class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step2: {
                relName: null,
                relationship: null,
                relAdd: null,
                relWorkOff: null,
                relWorkPos: null,
                relTel: null,
                relEmail: null,
                relCourse: null,
                relAtSchool: null,
                relCountry: null,
                relTimeRange: null,
                parentsInformation: [
                    new parentsInfo(),
                    new parentsInfo(),
                    new parentsInfo()
                ]
            }
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
        $('#formStep2')
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
            })
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-1");
    }

    _nextStep(e) {
        e.preventDefault();
        console.info(this.state.step2);
        let isValid = ($('#formStep2').data('formValidation').validate().isValid());
        if(isValid) {
            this.props.history.pushState(null, "/buoc-3");
        }
    }

    __inputOnChange(e){
        let keyState = e.target.getAttribute('data-state');
        let step2 = _.extend(this.state.step2, {[keyState] : e.target.value});
        this.setState(step2, function(){
            db.setItem('step2', this.state.step2);
        });
    }

    __InfoChange(history){
        let parentsInformation = _.map(this.state.step2.parentsInformation, (_history)=>{
            if(_history.relId == history.relId){
                _history = _.extend(_history, history);
            }
            return _history;
        });
        this.setState(_.extend(this.state.step2, {parentsInformation : parentsInformation}),function(){
            db.setItem('step2', this.state.step2);
        });
    }

    render() {
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
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>A. Thông tin Bố</b></h4>
                            </div>
                            <ParentsInfo key={history.relId} onInfoChange={this.__InfoChange}/>
                        </div>
                        <hr className="hr-style"/>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>B. Thông tin Mẹ</b></h4>
                            </div>
                            <ParentsInfo/>
                        </div>
                        <hr className="hr-style"/>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>C. Thông tin người thân từng đi du học</b></h4>
                            </div>
                            <div className="col-md-12">
                                <div>
                                    <fieldset>
                                        <div className="form-group">
                                            <label className="control-label col-xs-12 col-md-2">Họ và tên</label>
                                            <div className="col-xs-12 col-md-4 margin-space">
                                                <input type="text" name="txtRelativesName" className="form-control" placeholder="Họ và tên" value={this.state.step2.relName} data-state="relName" onChange={this.__inputOnChange}/>
                                            </div>

                                            <label className="control-label col-xs-12 col-md-2">Quan hệ với học sinh</label>
                                            <div className="col-xs-12 col-md-4">
                                                <input type="text" name="txtRelationship" className="form-control" placeholder="Quan hệ với học sinh" value={this.state.step2.relationship} data-state="relationship" onChange={this.__inputOnChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-xs-12 col-md-2">Địa chỉ hiện tại</label>
                                            <div className="col-xs-12 col-md-10">
                                                <textarea name="taAddress" className="form-control" placeholder="Địa chỉ" rows="2" value={this.state.step2.relAdd} data-state="relAdd" onChange={this.__inputOnChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-xs-12 col-md-2">Nơi công tác</label>
                                            <div className="col-xs-12 col-md-4 margin-space">
                                                <input type="text" name="txtWorkOffice" className="form-control" placeholder="Nơi công tác" value={this.state.step2.relWorkOff} data-state="relWorkOff" onChange={this.__inputOnChange}/>
                                            </div>
                                            <label className="control-label col-xs-12 col-md-2">Chức vụ (nếu có)</label>
                                            <div className="col-xs-12 col-md-4">
                                                <input type="text" className="form-control" placeholder="Chức vụ" value={this.state.step2.relWorkPos} data-state="relWorkPos" onChange={this.__inputOnChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-xs-12 col-md-2">Số điện thoại</label>
                                            <div className="col-xs-12 col-md-4 margin-space">
                                                <input type="tel" name="tlTel" className="form-control" placeholder="Số điện thoại" value={this.state.step2.relTel} data-state="relTel" onChange={this.__inputOnChange}/>
                                            </div>
                                            <label className="control-label col-xs-12 col-md-2">Email</label>
                                            <div className="col-xs-12 col-md-4">
                                                <input type="email" name="eEmail" className="form-control" placeholder="Địa chỉ email" value={this.state.step2.relEmail} data-state="relEmail" onChange={this.__inputOnChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-xs-12 col-md-2">Đã từng du học</label>
                                            <div className="col-xs-12 col-md-3 margin-space">
                                                <input type="text" name="txtCourse" className="form-control" placeholder="Khoá học" value={this.state.step2.relCourse} data-state="relCourse" onChange={this.__inputOnChange}/>
                                            </div>
                                            <div className="col-xs-12 col-md-3 margin-space">
                                                <input type="text" name="txtAtSchool" className="form-control" placeholder="Tại trường" value={this.state.step2.relAtSchool} data-state="relAtSchool" onChange={this.__inputOnChange}/>
                                            </div>
                                            <div className="col-xs-12 col-md-2 margin-space">
                                                <input type="text" name="txtCountry" className="form-control" placeholder="Tại nước" value={this.state.step2.relCountry} data-state="relCountry" onChange={this.__inputOnChange}/>
                                            </div>
                                            <div className="col-xs-12 col-md-2">
                                                <input type="text" name="txtTimeRange" className="form-control" placeholder="Vào khoảng thời gian" value={this.state.step2.relTimeRange} data-state="relTimeRange" onChange={this.__inputOnChange}/>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <hr className="hr-style"/>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="blue"><b>D. Thông tin người nhà khác &amp; có liên quan đến kế hoạch du học (VD: người nhà ở
                                    nước ngoài,...)</b></h4>
                            </div>
                            <ParentsInfo/>
                        </div>
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

let ParentsInfo = React.createClass({
    getInitialState(){
        return {
            relName: null,
            relPassport: null,
            relPassportDate: null,
            relAdd: null,
            relWorkOff: null,
            relWorkPos: null,
            relTel: null,
            relEmail: null
        }
    },

    __inputOnChange(e){
        let keyState = e.target.getAttribute('data-state');
        this.setState({[keyState] : e.target.value},()=>{
            this.props.onInfoChange(this.state);
        })
    },

    componentWillMount(){
        this.setState(_.extend(this.state, this.props.history));
    },

    render() {
        return <div>
            <div className="col-md-12">
                    <fieldset>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-md-2">Họ và tên</label>
                            <div className="col-xs-12 col-md-4">
                                <input type="text" name="txtRelativesName" className="form-control" placeholder="Họ và tên" value={this.state.relName} data-state="relName" onChange={this.__inputOnChange}/>
                            </div>
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
                    </fieldset>
            </div>
        </div>
    }
})