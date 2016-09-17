'use strict'
import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';
import T from '../libs/getLang.js';
import Dropzone from 'react-dropzone';
import DDP from 'ddp.js';

const request = require('superagent');

var Recaptcha = require('react-gcaptcha');

const mimeTypes = ['application/x-rar', 'application/zip', 'application/pdf'];
const _50MbtoBytes = 5e+7;
const _DropBox = {
    uploadUrl: 'https://content.dropboxapi.com/2/files/upload',
    removeUrl: 'https://api.dropboxapi.com/2/files/delete',
    "Authorization": "Bearer jop_2cNYe7AAAAAAAAAAB6L8o-5SDAx9PdLIw0XQXzDQYDJoNM01A3FJwrHbDlaQ",
}

const uploadScript = require('worker!../workers/upload.js');
const removeScript = require('worker!../workers/remove.js');
const socketServer = 'ws://http://system.sunrisevietnam.com/websocket';

const reCaptcha = '6Lc7GCATAAAAABlX7fNksGxN7J94ZXN1tfVbXUoD';

export default class Step4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step4: {
                knownBy: [],
                files: []
            },
            files: [],
            progress: 0,
            "g-recaptcha-response" : null
        };
        this._firstStep = this._firstStep.bind(this);
        this._secondStep = this._secondStep.bind(this);
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
        this.__multiCheckboxChange = this.__multiCheckboxChange.bind(this);

        this.__onDrop = this.__onDrop.bind(this);
        this.__removeFiles = this.__removeFiles.bind(this);

        this.__reCaptcha_callback = this.__reCaptcha_callback.bind(this);
    }

    __reCaptcha_loaded(){
        console.log('recaptchaLoaded');
    }

    __reCaptcha_callback(key){
        this.setState(_.extend(this.state,{"g-recaptcha-response" : key}));
    }

    __removeFiles(e) {
        e.preventDefault();
        if (this.state.step4.files.length > 0) {
            let file = this.state.step4.files[0];
            let self = this;
            let worker = new removeScript();
            worker.onmessage = function (e) {
                let {status, data} = e.data;
                if (status === 'REMOVE') {
                    console.warn(data);
                }

                if (status === 'FINISHED') {
                    self.setState(_.extend(self.state.step4, {files: []}), ()=> {
                        db.setItem('step4', self.state.step4);
                    });
                }
            }
            worker.postMessage({file: file, dropbox: _DropBox});
        }
    }

    __onDrop(files) {
        let self = this;

        let isValidFile = _.chain(files).map((file)=> {
            return _.some(mimeTypes, (type)=> {
                    return type === file.type
                }) && file.size <= _50MbtoBytes;
        }).value()[0];

        if (isValidFile) {
            this.setState(_.extend(this.state, {
                files: files
            }), ()=> {
                if (this.state.files.length > 0) {
                    let file = this.state.files[0];
                    let worker = new uploadScript();
                    worker.onmessage = function (e) {
                        let {status, data} = e.data;
                        if (status === 'UPLOADING') {
                            self.setState(_.extend(self.state, {progress: data}));
                        }

                        if (status === 'FINISHED') {
                            let files = [data];
                            self.setState(_.extend(self.state.step4, {files: files}), ()=> {
                                self.setState(_.extend(self.state, {files: []}))
                                db.setItem('step4', self.state.step4);
                            });
                        }
                    }
                    worker.postMessage({file: file, dropbox: _DropBox});
                }
            });
        }
    }

    componentWillMount() {
        let self = this;
        db.getItem('step4').then((step4)=> {
            if (step4 != null) {
                self.setState(_.extend(this.state, {step4: step4}), function () {
                    let {knownBy} = self.state.step4;
                    _.each(knownBy, (c)=> {
                        $(`input[value="${c}"]`).prop('checked', true);
                    })
                });
            }
        })
    }

    componentDidMount() {
        let options = {
            endpoint: socketServer,
            SocketConstructor: WebSocket
        };
        this.ddp = new DDP(options);
        this.ddp.on("connected", function () {
            console.info("Connected to Server...");
        });
        document.title = 'Step 4 - Documents upload';
        $('#formStep4')
            .formValidation({
                framework: 'bootstrap',
                err: {
                    container: '#errors'
                },
                row: {
                    valid: 'field-success',
                    invalid: 'field-error'
                },
                fields: {
                    chkAgreement: {
                        row: '.col-xs-12',
                        validators: {
                            notEmpty: {
                                message: T('step4:Noti')
                            }
                        }
                    }

                }
            })
            .on('err.form.fv', function (e) {
                // Show the message modal
                $('#messageModal').modal('show');
            });
    }

    _firstStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-1");
    }

    _secondStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-2");
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-3");
    }

    _nextStep(e) {
        e.preventDefault();
        let isValid = $('#formStep4').data('formValidation').validate().isValid();
        let isCheckReCaptcha = (this.state['g-recaptcha-response'] !== null);
        if (isValid && isCheckReCaptcha) {
            let obj = {};
            let self = this;
            db.iterate(function (value, key) {
                obj[key] = value;
            }).then(function () {
                    let register = _.extend({}, obj.step1, {parents: obj.step2, "g-recaptcha-response" : self.state['g-recaptcha-response']}, obj.step3, obj.step4);
                    const methodId = self.ddp.method('upsertRecord', [register]);
                    self.ddp.on("result", message => {
                        if (message.id === methodId && !message.error && message.result) {
                            console.log(message.result);
                            self.props.history.pushState(null, "/cam-on");
                        }
                    });
                }
            ).catch(function (err) {
                    // This code runs if there were any errors
                    console.log(err);
                });
        }
    }

    __multiCheckboxChange(e) {
        let knownBy = this.state.step4.knownBy;
        let isChecked = e.target.checked;
        let known = e.target.value;
        if (isChecked) {
            knownBy = _.union(knownBy, [known])
        } else {
            knownBy = _.without(knownBy, known);
        }

        this.setState(_.extend(this.state.step4, {knownBy: knownBy}), function () {
            db.setItem('step4', this.state.step4);
        });
    }

    render() {
        let files = this.state.files;
        let self = this;

        return <div>
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title white">
                        <a type="button" className="a-header" onClick={this._firstStep}>{T('step1:Step')}
                            1</a>&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        <a type="button" className="a-header" onClick={this._secondStep}>{T('step1:Step')}
                            2</a>&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        <a type="button" className="a-header" onClick={this._preStep}>{T('step1:Step')}
                            3</a>&nbsp;&nbsp;
                        <img src={require('../photos/line.png')} className="img-responsive"/>&nbsp;&nbsp;
                        <b>{T('step4:Step4')}</b>
                    </h3>
                </div>
                <div className="panel-body">

                    <div id="formStep4" className="form-horizontal">
                        <div className="form-group">
                            {this.state.step4.files.length <= 0 ?
                                <div className="col-xs-12 col-md-10 col-md-offset-1">
                                    <label>{T('step4:Label1')}</label>

                                    <div><p>{T('step4:Div1')}</p></div>
                                    <Dropzone onDrop={this.__onDrop} className="dropzone" multiple={false}
                                              accept=".zip, .rar, .pdf">
                                        <div><span className="bg-danger">{T('step4:Div2')}</span></div>
                                        <div>{T('step4:Div3')}</div>

                                    </Dropzone>

                                    <p className="help-block"></p>
                                </div>
                                : <div className="col-xs-12 col-md-10 col-md-offset-1">
                                <label>File đã tải</label>
                                {this.state.step4.files.length > 0 ?
                                    <div className="list-group">
                                        {this.state.step4.files.map((f)=> {
                                            return <li key={hat()} className="list-group-item">
                                                <span className="pull-left">{f.name}</span> &nbsp;
                                                <button className="btn btn-warning btn-xs" onClick={self.__removeFiles}>
                                                    Xoá
                                                </button>
                                            </li>
                                        })}
                                    </div> : null }
                            </div>}
                            <div className="col-xs-12 col-md-10 col-md-offset-1">
                                {this.state.files.length > 0 ?
                                    <div className="list-group">
                                        {this.state.files.map((f)=> {
                                            return <li key={hat()} className="list-group-item">
                                                <span className="pull-left">{f.name}</span> &nbsp;
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar progress-bar-success progress-bar-striped active"
                                                        role="progressbar" aria-valuenow={this.state.progress}
                                                        aria-valuemin="0" aria-valuemax="100"
                                                        style={{width : `${this.state.progress}%`}}>
                                                        <span className="sr-only">{this.state.progress}% Complete (success)</span>
                                                    </div>
                                                </div>
                                            </li>
                                        })}
                                    </div> : null }
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12 col-md-10 col-md-offset-1">
                                <div className="panel panel-warning">
                                    <div className="panel-footer">
                                        <label>{T('step4:Label2')}</label>

                                        <div className="checkbox">
                                            <label><input type="checkbox" name="chkKnownBy" value="Facebook"
                                                          onChange={this.__multiCheckboxChange}/>Facebook</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="chkKnownBy" value="Google"
                                                          onChange={this.__multiCheckboxChange}/>Google</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="chkKnownBy" value="Băng rôn"
                                                          onChange={this.__multiCheckboxChange}/>{T('step4:Banner')}
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="chkKnownBy"
                                                          value="Qua bạn bè, người thân"
                                                          onChange={this.__multiCheckboxChange}/>{T('step4:FromFriends')}
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="chkKnownBy" value="CLB trong trường"
                                                          onChange={this.__multiCheckboxChange}/>{T('step4:SchoolClub')}
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="chkKnownBy" value="Dân trí"
                                                          onChange={this.__multiCheckboxChange}/>Dân trí</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="chkKnownBy" value="VnExpress"
                                                          onChange={this.__multiCheckboxChange}/>VnExpress</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="chkKnownBy" value="Nguồn khác"
                                                          onChange={this.__multiCheckboxChange}/>{T('step4:OthersSources')}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12 col-md-10 col-md-offset-1">
                                <div className="panel panel-success">
                                    <div className="panel-heading text-center">
                                        <div className="checkbox">
                                            <label>
                                                <h4><input type="checkbox" name="chkAgreement"
                                                           value="true"/> {T('step4:Checkbox')}</h4>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12 col-md-10 col-md-offset-1">
                                <div className="panel panel-default">
                                    <div className="panel-heading text-center">
                                        <Recaptcha
                                            sitekey={reCaptcha}
                                            onloadCallback={this.__reCaptcha_loaded}
                                            verifyCallback={this.__reCaptcha_callback}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-xs-6 col-md-2 col-md-offset-7 text-right">
                            <button className="btn btn-warning" onClick={this._preStep}>{T('step1:Step')} <span
                                className="badge">3</span></button>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <button className="btn btn-primary text-uppercase" onClick={this._nextStep}>
                                <b>{T('step4:BtnText')}</b></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="messageModal" tabIndex="-1" role="dialog" aria-labelledby="agree"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div id="errors" className="blue text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
