import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';

export default class Step4 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            step4: {
                knownBy: []
            }
        };
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
        this.__multiCheckboxChange = this.__multiCheckboxChange.bind(this);
    }

    componentWillMount() {
        let self = this;
        db.getItem('step4').then((step4)=>{
            self.setState(_.extend(this.state.step4, step4),function() {
                let {knownBy} = self.state.step4;
                _.each(knownBy, (c)=> {
                    $(`input[value="${c}"]`).prop('checked', true);
                })
            });
        })
    }

    componentDidMount() {
        document.title = 'Bước 4 - Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
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
                                message: 'Bạn cần đồng ý để tiếp tục'
                            }
                        }
                    }

                }
            })
            .on('err.form.fv', function(e) {
                // Show the message modal
                $('#messageModal').modal('show');
            });
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-3");
    }

    _nextStep(e) {
        e.preventDefault();
        let isValid = $('#formStep4').data('formValidation').validate().isValid();
        if(isValid) {
            this.props.history.pushState(null, "/buoc-5");
        }
    }

    __multiCheckboxChange(e){
        let knownBy = this.state.step4.knownBy;
        let isChecked = e.target.checked;
        let known = e.target.value;
        if(isChecked){
            knownBy = _.union(knownBy, [known])
        }else{
            knownBy = _.without(knownBy, known);
        }

        this.setState(_.extend(this.state.step4, {knownBy : knownBy}),function(){
            db.setItem('step4', this.state.step4);
        });
    }

    render(){
        return <div>
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title"><b>
                        <span className="green">Bước 1&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="green">Bước 2&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="green">Bước 3&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        Bước 4 - Xác nhận&nbsp;&nbsp;<span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="blue">Bước 5</span>
                    </b></h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <form id="formStep4" className="form-horizontal">
                            <div className="form-group">
                                <div className="col-xs-12 col-md-10 col-md-offset-1">
                                    <div className="panel panel-success">
                                        <div className="panel-heading text-center">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="chkAgreement" value="true"/>
                                                    Tôi xác nhận Sunrise Vietnam là đại diện hỗ trợ học sinh hoàn thiện hồ sơ du học
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 col-md-10 col-md-offset-1">
                                    <div className="panel panel-warning">
                                        <div className="panel-heading">
                                            <label>Bạn biết đến Sunrise Vietnam từ nguồn nào? Xin vui lòng chia sẻ cùng chúng
                                                tôi.</label>
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="chkKnownBy" value="Facebook" onChange={this.__multiCheckboxChange}/>Facebook</label>
                                            </div>
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="chkKnownBy" value="Google" onChange={this.__multiCheckboxChange}/>Google</label>
                                            </div>
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="chkKnownBy" value="Băng rôn" onChange={this.__multiCheckboxChange}/>Băng rôn</label>
                                            </div>
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="chkKnownBy" value="Qua bạn bè, người thân" onChange={this.__multiCheckboxChange}/>Qua bạn bè, người thân</label>
                                            </div>
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="chkKnownBy" value="CLB trong trường" onChange={this.__multiCheckboxChange}/>CLB trong trường</label>
                                            </div>
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="chkKnownBy" value="Dân trí" onChange={this.__multiCheckboxChange}/>Dân trí</label>
                                            </div>
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="chkKnownBy" value="VnExpress" onChange={this.__multiCheckboxChange}/>VnExpress</label>
                                            </div>
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="chkKnownBy" value="Nguồn khác" onChange={this.__multiCheckboxChange}/>Nguồn khác</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-xs-6 col-md-2 col-md-offset-8 text-right">
                            <button className="btn btn-default" onClick={this._preStep}>Bước <span
                                className="badge">3</span></button>
                        </div>
                        <div className="col-xs-6 col-md-2">
                            <button className="btn btn-primary" onClick={this._nextStep}>Bước <span
                                className="badge">5</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="agree" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div id="errors" className="blue"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}