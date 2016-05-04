import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';

class historySchool {
    constructor(dStart, dEnd, ClassName, Score, School){
        this.historyId = hat();
        this.dStart = dStart;
        this.dEnd = dEnd;
        this.ClassName = ClassName;
        this.Score = Score;
        this.School = School;
    }
}

class schoolOpt {
    constructor(schoolOption){
        this.schoolId = hat();
        this.schoolOption = schoolOption
    }
}

export default class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step1: {
                fullName : null,
                sex : null,
                DoB : null,
                bornPlace: null,
                passport: null,
                passportDate: null,
                email: null,
                phone: null,
                skypeName: null,
                address: null,
                historySchools: [
                    new historySchool(),
                    new historySchool(),
                    new historySchool()
                ],
                certificate: null,
                anotherCercate: null,
                langCercate: null,
                langScore: null,
                langDate: null,
                course: null,
                countries: [],
                schoolOptions: [
                    new schoolOpt(),
                    new schoolOpt(),
                    new schoolOpt()
                ],
                subjectRequire: null,
                hobbies: null,
                costRequire: null,
                scholarship: null,
                residence: null,
                studyRequire: null
            }
        };
        this._nextStep = this._nextStep.bind(this);
        this.__inputOnChange = this.__inputOnChange.bind(this);
        this.__multiCheckboxChange = this.__multiCheckboxChange.bind(this);
        this.__historySchoolsChange = this.__historySchoolsChange.bind(this);
        this.__schoolOptionsChange = this.__schoolOptionsChange.bind(this);
    }

    componentWillMount() {
        let self = this;
        db.getItem('step1').then((step1)=>{
            self.setState(_.extend(this.state.step1,step1),function(){
                let {sex, countries} = self.state.step1;
                if(sex){
                    $(`input[value="${sex}"]`).prop('checked', true);
                }
                _.each(countries, (c)=>{
                    $(`input[value="${c}"]`).prop('checked', true);
                })
            });
        })
    }

    componentDidMount() {
        document.title = 'Bước 1 - Thông tin học sinh - Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
        var MAX_OPTIONS = 3;
        $('#formStep1')
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
                    txtFullname: {
                        row: '.col-xs-8',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập họ tên'
                            }
                        }
                    },
                    txtSex: {
                        row: '.col-xs-8',
                        validators: {
                            notEmpty: {
                                message: 'Xin chọn 1 trong 2'
                            }
                        }
                    },
                    dDoB: {
                        row: '.col-xs-8',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập ngày tháng năm sinh'
                            }
                        }
                    },
                    txtBornPlace: {
                        row: '.col-xs-8',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập nơi sinh'
                            }
                        }
                    },
                    txtPassport: {
                        row: '.col-xs-8',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập số hộ chiếu'
                            }
                        }
                    },
                    dPassport: {
                        row: '.col-xs-8',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập ngày cấp hộ chiếu'
                            },
                            date: {
                                format: 'DD/MM/YYYY',
                                min: 'dDoB',
                                message: 'Xin nhập ngày cấp hộ chiếu sau ngày sinh'
                            }
                        }
                    },
                    tlTel: {
                        row: '.col-xs-8',
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
                        row: '.col-xs-8',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập email'
                            },
                            emailAddress: {
                                message: 'Email không hợp lệ'
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
                    txtHighCercate: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập tên bằng cấp'
                            }
                        }
                    },
                    txtLangCercate: {
                        row: '.col-xs-8',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn bằng ngoại ngữ'
                            }
                        }
                    },
                    txtLangScore: {
                        row: '.col-xs-4',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập điểm'
                            },
                            regexp: {
                                regexp: /^[0-9.]{2,3}$/,
                                message: 'Điểm không hợp lệ'
                            }
                        }
                    },
                    dLang: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn ngày thi'
                            },
                            date: {
                                min: 'dDoB',
                                message: 'Xin nhập ngày thi sau ngày sinh'
                            }
                        }
                    },
                    txtCourse: {
                        row: '.col-xs-6',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn khoá học'
                            }
                        }
                    },
                    chkCountry: {
                        row: '.col-xs-12',
                        err: '#countryMessage',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn nơi mong muốn du học'
                            }
                        }
                    },
                    txtSubject: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập ngành học mong muốn'
                            }
                        }
                    },
                    txtHobbies: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập sở thích'
                            }
                        }
                    },
                    txtCost: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập yêu cầu chi phí'
                            }
                        }
                    },
                    txtScholarship: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập yêu cầu học bổng'
                            }
                        }
                    },
                    txtResidence: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn yêu cầu điều kiện sinh hoạt '
                            }
                        }
                    },
                    txtStudy: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn yêu cầu môi trường học'
                            }
                        }
                    }/*,
                    dStart: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn ngày bắt đầu'
                            }
                        }
                    },
                    dEnd: {
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn ngày kết thúc'
                            }
                        }
                    },
                    txtClass: {
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập thông tin học tập'
                            }
                        }
                    },
                    txtScore: {
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
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập tên trường'
                            }
                        }
                    }*/
                }
            })
            .on('success.validator.fv', function(e, data) {
                if (data.field === 'eEmail' && data.validator === 'remote') {
                    var response = data.result;  // response is the result returned by MailGun API
                    if (response.did_you_mean) {
                        // Update the message
                        data.element                    // The field element
                            .data('fv.messages')        // The message container
                            .find('[data-fv-validator="remote"][data-fv-for="eEmail"]')
                            .html('Did you mean ' + response.did_you_mean + '?')
                            .show();
                    }
                }
            })
            .on('err.validator.fv', function(e, data) {
                if (data.field === 'eEmail' && data.validator === 'remote') {
                    var response = data.result;
                    // We need to reset the error message
                    data.element                // The field element
                        .data('fv.messages')    // The message container
                        .find('[data-fv-validator="remote"][data-fv-for="email"]')
                        .html(response.did_you_mean
                            ? 'Did you mean ' + response.did_you_mean + '?'
                            : 'The email is not valid')
                        .show();
                }
            })
            .on('change', '[name="txtLangCercate"]', function(e) {
                $('#formStep1').formValidation('revalidateField', 'nottest');
            })
            .on('success.field.fv', function(e, data) {
                if (data.fv.getInvalidFields().length > 0) {    // There is invalid field
                    data.fv.disableSubmitButtons(true);
                }
                if (data.field !== 'nottest') {
                    var channel = $('#formStep1').find('[name="txtLangCercate"]:selected').val();
                    // User choose given channel
                    if (channel === 'nottest') {
                        // Remove the success class from the container
                        data.element.closest('.form-group').removeClass('has-success');

                        // Hide the tick icon
                        data.element.data('fv.icon').hide();
                    }
                }
            })
            //validate chọn nước du học
            .on('init.field.fv', function(e, data) {
                if (data.field === 'chkCountry') {
                    var $icon = data.element.data('fv.icon');
                    /*$icon.appendTo('#alertDayIcon');*/
                }
            });
    }

    _nextStep(e) {
        e.preventDefault();
        console.info(this.state.step1);
        let isValid = $('#formStep1').data('formValidation').validate().isValid();
        if(isValid){
            this.props.history.pushState(null, "/buoc-2");
        }
    }

    __inputOnChange(e){
        let keyState = e.target.getAttribute('data-state');
        let step1 = _.extend(this.state.step1, {[keyState] : e.target.value});
        this.setState(step1, function(){
            db.setItem('step1', this.state.step1);
        });
        //this.state.step1 = step1;
    }

    __multiCheckboxChange(e){
        let countries = this.state.step1.countries;
        let isChecked = e.target.checked;
        let country = e.target.value;
        if(isChecked){
            countries = _.union(countries, [country])
        }else{
            countries = _.without(countries, country);
        }

        this.setState(_.extend(this.state.step1, {countries : countries}),function(){
            db.setItem('step1', this.state.step1);
        });
    }

    __historySchoolsChange(history){
        let historySchools = _.map(this.state.step1.historySchools, (_history)=>{
            if(_history.historyId == history.historyId){
                _history = _.extend(_history, history);
            }
            return _history;
        });
        this.setState(_.extend(this.state.step1, {historySchools : historySchools}),function(){
            db.setItem('step1', this.state.step1);
        });
    }

    __schoolOptionsChange(school){
        //console.info(school)
        let schoolOptions = _.map(this.state.step1.schoolOptions, (_school)=>{
            if(_school.schoolId == school.schoolId){
                _school = _.extend(_school, school);
            }
            return _school;
        });
        this.setState(_.extend(this.state.step1, {schoolOptions : schoolOptions}),function(){
            db.setItem('step1', this.state.step1);
        });
    }

    render() {
        return <div>
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title"><b>
                        Bước 1 - Thông tin học sinh&nbsp;&nbsp;<span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 2</span>&nbsp;&nbsp;<span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 3&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 4&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 5</span>
                    </b></h3>
                </div>
                <div className="panel-body">
                    <div className="smallspace"></div>
                    <div className="row">
                        <div className="col-md-12">
                            <form id="formStep1" className="form-horizontal">
                                <fieldset>
                                    <div className="form-group">
                                        <label className="control-label col-xs-4 col-md-2">Họ và tên</label>
                                        <div className="col-xs-8 col-md-4 margin-space">
                                            <input type="text" name="txtFullname" className="form-control" placeholder="Họ và tên" onChange={this.__inputOnChange} data-state="fullName" value={this.state.step1.fullName}/>
                                        </div>
                                        <label className="control-label col-xs-4 col-md-2">Giới tính</label>
                                        <div className="col-xs-8 col-md-4 radio radioContainer" >
                                            <label className="radio-inline" >
                                                <input type="radio" value="Nam" name="txtSex" onChange={this.__inputOnChange} data-state='sex' />Nam</label>
                                            <label className="radio-inline">
                                                <input type="radio" value="Nữ" name="txtSex" onChange={this.__inputOnChange} data-state='sex' />Nữ</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-4 col-md-2">Ngày sinh</label>
                                        <div className="col-xs-8 col-md-4 margin-space">
                                            <input type="date" className="form-control" name="dDoB"
                                                   placeholder="ngày/tháng/năm sinh" onChange={this.__inputOnChange} data-state="DoB" value={this.state.step1.DoB}/>
                                        </div>
                                        <label className="control-label col-xs-4 col-md-2">Nơi sinh</label>
                                        <div className="col-xs-8 col-md-4">
                                            <input type="text" name="txtBornPlace" className="form-control" placeholder="Nơi sinh" onChange={this.__inputOnChange} data-state="bornPlace" value={this.state.step1.bornPlace}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-4 col-md-2">Hộ
                                            Chiếu</label>
                                        <div className="col-xs-8 col-md-4 margin-space">
                                            <input type="text" name="txtPassport" className="form-control"
                                                   placeholder="Số hộ chiếu" onChange={this.__inputOnChange} data-state="passport" value={this.state.step1.passport}/>
                                        </div>
                                        <label className="control-label col-xs-4 col-md-2">Ngày cấp</label>
                                        <div className="col-xs-8 col-md-4">
                                            <input type="date" name="dPassport" className="form-control" placeholder="Ngày cấp" onChange={this.__inputOnChange} data-state="passportDate" value={this.state.step1.passportDate}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-4 col-md-2">Số điện
                                            thoại</label>
                                        <div className="col-xs-8 col-md-3 margin-space">
                                            <input type="tel" name="tlTel" className="form-control" placeholder="Số điện thoại" onChange={this.__inputOnChange} data-state="phone" value={this.state.step1.phone}/>
                                        </div>
                                        <label htmlFor="txtEmail" className="control-label col-xs-4 col-md-2 col-md-1">Email</label>
                                        <div className="col-xs-8 col-md-3 margin-space">
                                            <input type="email" name="eEmail" className="form-control" placeholder="Địa chỉ Email" onChange={this.__inputOnChange} data-state="email" value={this.state.step1.email}/>
                                        </div>
                                        <label className="control-label col-xs-4 col-md-2 col-md-1">Skype</label>
                                        <div className="col-xs-8 col-md-2">
                                            <input type="text" name="txtSkype" className="form-control" placeholder="Tên đăng nhập" onChange={this.__inputOnChange} data-state="skypeName" value={this.state.step1.skypeName}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-4 col-md-2">Địa chỉ hiện
                                            tại</label>
                                        <div className="col-xs-8 col-md-10">
                                            <textarea name="taAddress" className="form-control" rows="2" width="100%" placeholder="Địa chỉ" onChange={this.__inputOnChange} data-state="address" value={this.state.step1.address}></textarea>
                                        </div>
                                    </div>
                                    <hr className="hr-style"/>
                                    <div className="form-group">
                                        <label className="control-label col-xs-7 col-md-4">Lịch sử học
                                            tập 3 năm gần
                                            nhất:</label>

                                        <div className="col-xs-12">
                                            <table className="table bg-table">
                                                <thead>
                                                    <tr>
                                                        <th width="15%">Từ</th>
                                                        <th width="15%">Đến</th>
                                                        <th width="35%">Quá trình học tập</th>
                                                        <th width="20%">Điểm học tập</th>
                                                        <th width="15%">Tại trường</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.step1.historySchools.map((hs)=>{
                                                    return <HistorySchool key={hs.historyId} history={hs} onHistoryChange={this.__historySchoolsChange}/>
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">Bằng cấp cao nhất hiện có</label>
                                        <div className="col-xs-12 col-md-3 margin-space">
                                            <input type="text" name="txtHighCercate" className="form-control" placeholder="Tên bằng cấp cao nhất hiện có" onChange={this.__inputOnChange} data-state="certificate" value={this.state.step1.certificate}/>
                                        </div>
                                        <label className="control-label col-xs-12 col-md-3">Bằng cấp
                                            khác (nếu có)</label>
                                        <div className="col-xs-12 col-md-3">
                                            <input type="text" name="txtDifCercate" className="form-control" placeholder="Bằng cấp khác" onChange={this.__inputOnChange} data-state="anotherCercate" value={this.state.step1.anotherCercate}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">Trình độ ngoại ngữ</label>
                                        <div className="col-xs-8 col-md-3 selectContainer">
                                            <select name="txtLangCercate" className="form-control" onChange={this.__inputOnChange} data-state="langCercate" value={this.state.step1.langCercate}>
                                                <option value="IELTS">IELTS</option>
                                                <option value="TOEFL">TOEFL</option>
                                                <option value="other">Khác</option>
                                                <option value="nottest">Chưa thi</option>
                                            </select>
                                        </div>
                                        <div className="col-xs-4 col-md-3 hidden">
                                            <input type="text" className="form-control" placeholder="Bằng ngoại ngữ"/>
                                        </div>
                                        <div className="col-xs-4 col-md-3 margin-space">
                                            <input type="text"  name="txtLangScore" className="form-control" placeholder="Điểm số" onChange={this.__inputOnChange} data-state="langScore" value={this.state.step1.langScore}/>
                                        </div>
                                        <div className="col-xs-12 col-md-3">
                                            <input type="date"  name="txtLangDate" className="form-control" placeholder="Ngày thi" onChange={this.__inputOnChange} data-state="langDate" value={this.state.step1.langDate}/>
                                        </div>
                                    </div>
                                    <hr className="hr-style"/>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">Khoá học mong muốn</label>
                                        <div className="col-xs-6 col-md-3 selectContainer">
                                            <select name="txtCourse" className="form-control" onChange={this.__inputOnChange} data-state="course" value={this.state.step1.course}>
                                                <option>Trung học</option>
                                                <option>Cao đẳng</option>
                                                <option>Dự bị đại học</option>
                                                <option>Đại học</option>
                                                <option>Dự bị thạc sỹ</option>
                                                <option>Thạc sỹ</option>
                                                <option>Học tiếng ngắn hạn</option>
                                                <option>Du học hè</option>
                                                <option>Khác</option>
                                            </select>
                                        </div>
                                        <div className="col-xs-6 col-md-3 hidden">
                                            <input type="text" className="form-control"
                                                   placeholder="Khoá học mong muốn"/>
                                        </div>
                                        <div className="col-xs-6 col-md-3 hidden">
                                            <input type="text" className="form-control" placeholder="Lớp"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">Nơi mong muốn du học</label>
                                        <div className="col-xs-12 col-md-9">
                                            <div className="row">
                                                <div className="col-xs-12 col-md-4">
                                                    <div className="checkbox">
                                                        <label className="checkbox">
                                                            <input type="checkbox" name="chkCountry" id="chkEngland" value="England" onChange={this.__multiCheckboxChange}/> Anh
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkUSA" value="USA" onChange={this.__multiCheckboxChange}/> Mỹ
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkSingapore" value="Singapore" onChange={this.__multiCheckboxChange}/> Singapore
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkAustralia" value="Australia" onChange={this.__multiCheckboxChange}/> Úc
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkCanada" value="Canada" onChange={this.__multiCheckboxChange}/> Canada
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkFinland" value="Finland" onChange={this.__multiCheckboxChange}/> Phần Lan
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-md-4">
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkMalaysia" value="Malaysia" onChange={this.__multiCheckboxChange}/> Malaysia
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkThailand" value="Thailand"
                                                                   onChange={this.__multiCheckboxChange}/> Thái Lan
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkSwitzerland" value="Switzerland"
                                                                   onChange={this.__multiCheckboxChange}/> Thuỵ Sỹ
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkChina" value="China"
                                                                   onChange={this.__multiCheckboxChange}/> Trung Quốc
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkNetherlands" value="Netherlands"
                                                                   onChange={this.__multiCheckboxChange}/> Hà Lan
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkNewZealand" value="New Zealand"
                                                                   onChange={this.__multiCheckboxChange}/> New Zealand
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-md-4">
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkItaly" value="Italy"
                                                                   onChange={this.__multiCheckboxChange}/> Ý
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkKorea" value="Korea"
                                                                   onChange={this.__multiCheckboxChange}/> Hàn Quốc
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkJapan" value="Japan"
                                                                   onChange={this.__multiCheckboxChange}/> Nhật
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkGermany" value="Germany"
                                                                   onChange={this.__multiCheckboxChange}/> Đức
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkPhillipines" value="Phillipines"
                                                                   onChange={this.__multiCheckboxChange}/> Phillipines
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <span id="alertDayIcon" className="col-xs-3"></span>
                                                <div id="countryMessage" className="col-xs-9"></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">Trường dự định (nếu có)</label>

                                        <div className="col-xs-12 col-md-9">
                                            {this.state.step1.schoolOptions.map((sp)=>{
                                                return <SchoolOpt key={sp.schoolId} history={sp} onSchoolChange={this.__schoolOptionsChange}/>
                                            })}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">Yêu cầu đặc biệt:</label>
                                        <div className="col-xs-12 bg-table">
                                            <div className="form-group">
                                                <label className="control-label col-xs-12 col-md-3 sublabel">Ngành
                                                    nghề</label>
                                                <div className="col-xs-12 col-md-3 margin-space">
                                                    <input type="text" className="form-control" name="txtSubject"
                                                           placeholder="Ngành nghề mong muốn"
                                                           onChange={this.__inputOnChange} data-state="subjectRequire"
                                                           value={this.state.step1.subjectRequire}/>
                                                </div>
                                                <label className="control-label col-xs-12 col-md-3 sublabel">Sở
                                                    thích</label>
                                                <div className="col-xs-12 col-md-3">
                                                    <input type="text" className="form-control" name="txtHobbies" placeholder="Sở thích"
                                                           onChange={this.__inputOnChange} data-state="hobbies"
                                                           value={this.state.step1.hobbies}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-xs-12 col-md-3 sublabel">Mức chi phí
                                                    du học/năm</label>
                                                <div className="col-xs-12 col-md-3 margin-space">
                                                    <input type="text" className="form-control" name="txtCost"
                                                           placeholder="Mức chi phí mong muốn"
                                                           onChange={this.__inputOnChange} data-state="costRequire"
                                                           value={this.state.step1.costRequire}/>
                                                </div>
                                                <label className="control-label col-xs-12 col-md-3 sublabel">Học
                                                    bổng</label>

                                                <div className="col-xs-12 col-md-3">
                                                    <input type="text" className="form-control" name="txtScholarship" placeholder=""
                                                           onChange={this.__inputOnChange} data-state="scholarship"
                                                           value={this.state.step1.scholarship}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-xs-12 col-md-3 sublabel">Điều kiện
                                                    sinh hoạt</label>

                                                <div className="col-xs-12 col-md-3 margin-space selectContainer">
                                                    <select className="form-control" name="txtResidence" onChange={this.__inputOnChange} data-state="residence"
                                                            value={this.state.step1.residence}>
                                                        <option>Ký túc xá</option>
                                                        <option>Ở cùng gia đình bản xứ</option>
                                                        <option>Thuê căn hộ ngoài</option>
                                                        <option>Ở cùng người nhà</option>
                                                    </select>
                                                </div>
                                                <label className="control-label col-xs-12 col-md-3 sublabel">Môi trường
                                                    học</label>

                                                <div className="col-xs-12 col-md-3 selectContainer">
                                                    <select className="form-control" name="txtStudy" onChange={this.__inputOnChange}
                                                            data-state="studyRequire"
                                                            value={this.state.step1.studyRequire}>
                                                        <option>Trung tâm sôi động</option>
                                                        <option>Ngoại ô, yên bình</option>
                                                        <option>Không có yêu cầu đặc biệt</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-xs-6 col-xs-offset-6 col-md-2 col-md-offset-10">
                            <button type="submit" className="btn btn-primary" onClick={this._nextStep}>Bước <span
                                className="badge">2</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}


let HistorySchool = React.createClass({
    getInitialState(){
        return {
            historyId : null,
            dStart : null,
            dEnd : null,
            ClassName : null,
            Score : null,
            School : null
        }
    },

    __inputOnChange(e){
        let keyState = e.target.getAttribute('data-state');
        this.setState({[keyState] : e.target.value},()=>{
            this.props.onHistoryChange(this.state);
        })
        //this.state.step1 = step1;
    },

    componentWillMount(){
        this.setState(_.extend(this.state, this.props.history));
    },

    componentDidMount() {
        $('.row_info')
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
                    dStart: {
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn ngày bắt đầu'
                            }
                        }
                    },
                    dEnd: {
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa chọn ngày kết thúc'
                            }
                        }
                    },
                    txtClass: {
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập thông tin học tập'
                            }
                        }
                    },
                    txtScore: {
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
                        validators: {
                            notEmpty: {
                                message: 'Bạn chưa nhập tên trường'
                            }
                        }
                    }
                }
            })
    },

    render() {
        return <tr className='row_info'>
            <td className="col-xs-2"><input type="date" name="dStart" className="form-control noneborder" value={this.state.dStart} data-state="dStart" onChange={this.__inputOnChange}/></td>
            <td className="col-xs-2"><input type="date" name="dEnd" className="form-control noneborder" value={this.state.dEnd} data-state="dEnd" onChange={this.__inputOnChange}/></td>
            <td className="col-xs-3"><input type="text" name="txtClass" className="form-control noneborder" placeholder="Quá trình học tập" data-state="ClassName" value={this.state.ClassName} onChange={this.__inputOnChange}/></td>
            <td className="col-xs-2"><input type="text" name="txtScore" className="form-control noneborder" placeholder="Điểm trung bình/năm" data-state="Score" value={this.state.Score} onChange={this.__inputOnChange}/></td>
            <td className="col-xs-2"><input type="text" name="txtSchool" className="form-control noneborder" placeholder="Tại trường" data-state="School" value={this.state.School} onChange={this.__inputOnChange}/></td>
        </tr>
    }
})

let SchoolOpt = React.createClass({
    getInitialState(){
        return {
            schoolId: null,
            schoolOption: null
        }
    },
    __inputOnChange(e){
        let keyState = e.target.getAttribute('data-state');
        this.setState({[keyState] : e.target.value},()=>{
            this.props.onSchoolChange(this.state);
        })
        //this.state.step1 = step1;
    },
    componentWillMount(){
        this.setState(_.extend(this.state, this.props.history));
    },
    render() {
        return <div className="form-group">
            <div className="col-xs-10 col-md-6">
                <input type="text" className="form-control" name="options[]" placeholder="Lựa chọn trường" onChange={this.__inputOnChange} data-state="schoolOption"
                       value={this.state.schoolOption}/>
            </div>
        </div>
    }
})
