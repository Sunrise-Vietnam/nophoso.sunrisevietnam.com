import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';
import T from '../libs/getLang.js';

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
                gender : null,
                DoB : null,
                birthPlace: null,
                passport: null,
                passportDate: null,
                email: null,
                tel: null,
                skype: null,
                address: null,
                studyProgress: null,
                certificate: null,
                anotherCercate: null,
                langCercate: null,
                langScore: null,
                langDate: null,
                course: null,
                grade: null,
                countries: [],
                schoolOptions: [
                    new schoolOpt(),
                    new schoolOpt(),
                    new schoolOpt()
                ],
                major: null,
                hobbies: null,
                fees: null,
                scholarship: null,
                residence: null,
                studyEnvi: null
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
                let {gender, countries} = self.state.step1;
                if(gender){
                    $(`input[value="${gender}"]`).prop('checked', true);
                }
                _.each(countries, (c)=>{
                    $(`input[value="${c}"]`).prop('checked', true);
                })
            });
        })
    }

    componentDidMount() {
        document.title = 'Bước 1 - Thông tin học sinh - Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
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
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    txtGender: {
                        row: '.col-xs-7',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEGender')
                            }
                        }
                    },
                    dDoB: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEDoB')
                            }
                        }
                    },
                    txtBirthPlace: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    txtPassport: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    dPassport: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEPassportDate')
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
                    taAddress: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    taStudyProgress: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    txtHighCercate: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    txtLangCercate: {
                        row: '.col-xs-6',
                        validators: {
                            notEmpty: {
                                message: T('step1:NELangCer')
                            }
                        }
                    },
                    txtLangScore: {
                        row: '.col-xs-6',
                        validators: {
                            notEmpty: {
                                message: T('step1:NELangScore')
                            },
                            regexp: {
                                regexp: /^[0-9.]{1,3}$/,
                                message: T('step1:RELangScore')
                            }
                        }
                    },
                    txtCourse: {
                        row: '.col-xs-6',
                        validators: {
                            notEmpty: {
                                message: T('step1:NECourse')
                            }
                        }
                    },
                    chkCountry: {
                        row: '.col-xs-12',
                        err: '#countryMessage',
                        validators: {
                            notEmpty: {
                                message: T('step1:NECountry')
                            }
                        }
                    },
                    txtSubject: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    txtHobbies: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    txtCost: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    txtScholarship: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEInput')
                            }
                        }
                    },
                    txtResidence: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEResidence')
                            }
                        }
                    },
                    txtStudy: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step1:NEStudyEnvironment')
                            }
                        }
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

        let isValid = $('#formStep1').data('formValidation').validate().isValid();
        //console.info(this.state.step1, isValid);
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
            <div className="panel panel-warning">
                <div className="panel-heading bgdorange">
                    <h3 className="panel-title white">
                        <b>{T('step1:Step1')}&nbsp;&nbsp;</b><img src={require('../photos/line.png')}/>&nbsp;&nbsp;
                        {T('step1:Step')} 2&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        {T('step1:Step')} 3&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        {T('step1:Step')} 4
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="smallspace"></div>
                    <div className="row">
                        <div className="col-md-12">
                            <form id="formStep1" className="form-horizontal">
                                <fieldset>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-2">{T('step1:FullName')}</label>
                                        <div className="col-xs-12 col-md-4 margin-space">
                                            <input type="text" name="txtFullname" className="form-control" onChange={this.__inputOnChange} data-state="fullName" value={this.state.step1.fullName}/>
                                        </div>
                                        <label id="lblGender" className="control-label col-xs-4 col-md-2">{T('step1:Gender')}</label>
                                        <div className="col-xs-8 col-md-4 radioContainer">
                                            <label className="radio-inline col-xs-3" >
                                                <input type="radio" value="Nam" name="txtGender" onChange={this.__inputOnChange} data-state='gender' />{T('step1:Male')}
                                            </label>
                                            <label className="radio-inline col-xs-3">
                                                <input type="radio" value="Nữ" name="txtGender" onChange={this.__inputOnChange} data-state='gender' />{T('step1:Female')}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-2">{T('step1:DofB')}</label>
                                        <div className="col-xs-12 col-md-4 margin-space">
                                            <input type="date" className="form-control" name="dDoB"
                                                   placeholder="ngày/tháng/năm sinh" onChange={this.__inputOnChange} data-state="DoB" value={this.state.step1.DoB}/>
                                        </div>
                                        <label className="control-label col-xs-12 col-md-2">{T('step1:BirthPlace')}</label>
                                        <div className="col-xs-12 col-md-4">
                                            <input type="text" name="txtBirthPlace" className="form-control" onChange={this.__inputOnChange} data-state="birthPlace" value={this.state.step1.birthPlace}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-2">{T('step1:Passport')}</label>
                                        <div className="col-xs-12 col-md-4 margin-space">
                                            <input type="text" name="txtPassport" className="form-control" onChange={this.__inputOnChange} data-state="passport" value={this.state.step1.passport}/>
                                        </div>
                                        <label className="control-label col-xs-12 col-md-2">{T('step1:PassportDate')}</label>
                                        <div className="col-xs-12 col-md-4">
                                            <input type="date" name="dPassport" className="form-control" onChange={this.__inputOnChange} data-state="passportDate" value={this.state.step1.passportDate}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-2">{T('step1:Tel')}</label>
                                        <div className="col-xs-12 col-md-3 margin-space">
                                            <input type="tex" name="tlTel" className="form-control" onChange={this.__inputOnChange} data-state="tel" value={this.state.step1.tel}/>
                                        </div>
                                        <label htmlFor="txtEmail" className="control-label col-xs-12 col-md-2 col-md-1">Email</label>
                                        <div className="col-xs-12 col-md-3 margin-space">
                                            <input type="text" name="eEmail" className="form-control" onChange={this.__inputOnChange} data-state="email" value={this.state.step1.email}/>
                                        </div>
                                        <label className="control-label col-xs-12 col-md-2 col-md-1">{T('step1:Skype')}</label>
                                        <div className="col-xs-12 col-md-2">
                                            <input type="text" name="txtSkype" className="form-control" onChange={this.__inputOnChange} data-state="skype" value={this.state.step1.skype}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-2">{T('step1:Address')}</label>
                                        <div className="col-xs-12 col-md-10">
                                            <textarea name="taAddress" className="form-control" rows="2" width="100%" onChange={this.__inputOnChange} data-state="address" value={this.state.step1.address}></textarea>
                                        </div>
                                    </div>
                                    <hr className="hr-style"/>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">{T('step1:StudyProgress')}</label>
                                        <div className="col-xs-12 col-md-9">
                                            <textarea name="taStudyProgress" className="form-control" rows="3" width="100%" placeholder={T('step1:PHProgress')} onChange={this.__inputOnChange} data-state="studyProgress" value={this.state.step1.studyProgress}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">{T('step1:HighCertificate')}</label>
                                        <div className="col-xs-12 col-md-3 margin-space">
                                            <input type="text" name="txtHighCercate" className="form-control" onChange={this.__inputOnChange} data-state="certificate" value={this.state.step1.certificate}/>
                                        </div>
                                        <label className="control-label col-xs-12 col-md-3">{T('step1:AnotherCertificate')}</label>
                                        <div className="col-xs-12 col-md-3">
                                            <input type="text" name="txtDifCercate" className="form-control" onChange={this.__inputOnChange} data-state="anotherCercate" value={this.state.step1.anotherCercate}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">{T('step1:LangCertificate')}</label>
                                        <div className="col-xs-6 col-md-2 selectContainer">
                                            <select name="txtLangCercate" className="form-control" onChange={this.__inputOnChange} data-state="langCercate" value={this.state.step1.langCercate}>
                                                <option></option>
                                                <option value="IELTS">IELTS</option>
                                                <option value="TOEFL">TOEFL</option>
                                                <option value="Haven't test">{T('step1:LangNotTest')}</option>
                                            </select>
                                        </div>
                                        <div className="col-xs-6 col-md-2 margin-space">
                                            <input type="text" name="txtLangScore" className="form-control" placeholder={T('step1:Score')} onChange={this.__inputOnChange} data-state="langScore" value={this.state.step1.langScore}/>
                                        </div>
                                        <label className="control-label col-xs-12 col-md-2">{T('step1:PassportDate')}</label>
                                        <div className="col-xs-12 col-md-3">
                                            <input type="date"  name="txtLangDate" className="form-control" onChange={this.__inputOnChange} data-state="langDate" value={this.state.step1.langDate}/>
                                        </div>
                                    </div>
                                    <hr className="hr-style"/>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">{T('step1:Course')}</label>
                                        <div className="col-xs-6 col-md-3 selectContainer">
                                            <select name="txtCourse" className="form-control" onChange={this.__inputOnChange} data-state="course" value={this.state.step1.course}>
                                                <option></option>
                                                <option value="High school">{T('step1:High school')}</option>
                                                <option value="College">{T('step1:College')}</option>
                                                <option value="Foundation">{T('step1:Foundation')}</option>
                                                <option value="University">{T('step1:University')}</option>
                                                <option value="Pre-master">{T('step1:Pre-master')}</option>
                                                <option value="Master">{T('step1:Master')}</option>
                                                <option value="Language courses">{T('step1:Language courses')}</option>
                                                <option value="Summer study course">{T('step1:Summer study course')}</option>
                                                <option value="Other">{T('step1:Other')}</option>
                                            </select>
                                        </div>
                                        <div className="col-xs-6 col-md-3 hidden">
                                            <input type="text" className="form-control"
                                                   placeholder="Khoá học mong muốn"/>
                                        </div>
                                        <div className="col-xs-6 col-md-3">
                                            <input type="text" className="form-control" onChange={this.__inputOnChange} data-state="grade" value={this.state.step1.grade} placeholder={T('step1:Grade')}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">{T('step1:Country')}</label>
                                        <div className="col-xs-12 col-md-9">
                                            <div className="row">
                                                <div className="col-xs-6 col-md-4">
                                                    <div className="checkbox">
                                                        <label className="checkbox">
                                                            <input type="checkbox" name="chkCountry" id="chkEngland" value="England" onChange={this.__multiCheckboxChange}/> {T('step1:England')}
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkUSA" value="USA" onChange={this.__multiCheckboxChange}/> {T('step1:USA')}
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkSingapore" value="Singapore" onChange={this.__multiCheckboxChange}/> Singapore
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkAustralia" value="Australia" onChange={this.__multiCheckboxChange}/> {T('step1:Australia')}
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkCanada" value="Canada" onChange={this.__multiCheckboxChange}/> Canada
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkFinland" value="Finland" onChange={this.__multiCheckboxChange}/> {T('step1:Finland')}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-md-4">
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry" id="chkMalaysia" value="Malaysia" onChange={this.__multiCheckboxChange}/> Malaysia
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkThailand" value="Thailand"
                                                                   onChange={this.__multiCheckboxChange}/> {T('step1:Thailand')}
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkSwitzerland" value="Switzerland"
                                                                   onChange={this.__multiCheckboxChange}/> {T('step1:Switzerland')}
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkChina" value="China"
                                                                   onChange={this.__multiCheckboxChange}/> {T('step1:China')}
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkNetherlands" value="Netherlands"
                                                                   onChange={this.__multiCheckboxChange}/> {T('step1:Netherlands')}
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
                                                <div className="col-xs-6 col-md-4">
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkItaly" value="Italy"
                                                                   onChange={this.__multiCheckboxChange}/> {T('step1:Italy')}
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkKorea" value="Korea"
                                                                   onChange={this.__multiCheckboxChange}/> {T('step1:Korea')}
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <label className="checkbox">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkJapan" value="Japan"
                                                                   onChange={this.__multiCheckboxChange}/> {T('step1:Japan')}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-md-4">
                                                    <div className="checkbox">
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="chkCountry"
                                                                   id="chkGermany" value="Germany"
                                                                   onChange={this.__multiCheckboxChange}/> {T('step1:Germany')}
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
                                        <label className="control-label col-xs-12 col-md-3">{T('step1:SchoolOptions')}</label>

                                        <div className="col-xs-12 col-md-9">
                                            {this.state.step1.schoolOptions.map((sp)=>{
                                                return <SchoolOpt key={sp.schoolId} history={sp} onSchoolChange={this.__schoolOptionsChange}/>
                                            })}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-3">{T('step1:Customized requirements')}</label>
                                        <div className="col-xs-12 bg-table">
                                            <div className="form-group">
                                                <label className="control-label col-xs-12 col-md-3 sublabel">{T('step1:Major')}</label>
                                                <div className="col-xs-12 col-md-3 margin-space">
                                                    <input type="text" className="form-control" name="txtSubject"
                                                           onChange={this.__inputOnChange} data-state="major"
                                                           value={this.state.step1.major}/>
                                                </div>
                                                <label className="control-label col-xs-12 col-md-3 sublabel">{T('step1:Hobbies')}</label>
                                                <div className="col-xs-12 col-md-3">
                                                    <input type="text" className="form-control" name="txtHobbies" onChange={this.__inputOnChange} data-state="hobbies"
                                                           value={this.state.step1.hobbies}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-xs-12 col-md-3 sublabel">{T('step1:Fees')}</label>
                                                <div className="col-xs-12 col-md-3 margin-space">
                                                    <input type="text" className="form-control" name="txtCost"
                                                           onChange={this.__inputOnChange} data-state="fees"
                                                           value={this.state.step1.fees}/>
                                                </div>
                                                <label className="control-label col-xs-12 col-md-3 sublabel">{T('step1:Scholarship')}</label>

                                                <div className="col-xs-12 col-md-3">
                                                    <input type="text" className="form-control" name="txtScholarship" placeholder=""
                                                           onChange={this.__inputOnChange} data-state="scholarship"
                                                           value={this.state.step1.scholarship}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-xs-12 col-md-3 sublabel">{T('step1:ResidenceRequire')}</label>

                                                <div className="col-xs-12 col-md-3 margin-space selectContainer">
                                                    <select className="form-control" name="txtResidence" onChange={this.__inputOnChange} data-state="residence"
                                                            value={this.state.step1.residence}>
                                                        <option></option>
                                                        <option value="Dormitory">{T('step1:Dormitory')}</option>
                                                        <option value="Homestay">{T('step1:Homestay')}</option>
                                                        <option value="Private apartment">{T('step1:Private apartment')}</option>
                                                        <option value="With family members">{T('step1:With family members')}</option>
                                                    </select>
                                                </div>
                                                <label className="control-label col-xs-12 col-md-3 sublabel">{T('step1:EnvironmentRequire')}</label>

                                                <div className="col-xs-12 col-md-3 selectContainer">
                                                    <select className="form-control" name="txtStudy" onChange={this.__inputOnChange}
                                                            data-state="studyEnvi"
                                                            value={this.state.step1.studyEnvi}>
                                                        <option></option>
                                                        <option value="City center">{T('step1:City center')}</option>
                                                        <option value="Suburb area">{T('step1:Suburb area')}</option>
                                                        <option value="No specific order">{T('step1:No specific order')}</option>
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
                        <div className="col-xs-6 col-xs-offset-6 col-md-2 col-md-offset-9">
                            <button type="button" className="btn btn-success" onClick={this._nextStep}>{T('step1:Step')} <span
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
                                message: 'Bạn chưa nhập điểm số. Nhập 0 nếu chưa thi'
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
            <div className="col-xs-12 col-md-6">
                <input type="text" className="form-control" name="options[]" placeholder={T('step1:PHSchoolOpt')} onChange={this.__inputOnChange} data-state="schoolOption"
                       value={this.state.schoolOption}/>
            </div>
        </div>
    }
})
