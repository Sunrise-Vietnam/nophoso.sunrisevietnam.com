import _ from 'lodash';
import hat from 'hat';
import db from 'localforage';

import React from 'react';


export default class Step5 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            step5: {
                uploadFiles: null
            }
        };
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {
        let self = this;
        db.getItem('step5').then((step5)=>{
            self.setState(_.extend(this.state.step5,step5));
        })
    }

    componentDidMount() {
        document.title = 'Bước 5 - Tải tài liệu - Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
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

                }
            })
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-4");
    }

    _nextStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/cam-on");
    }

    __fileValidate() {
        if (window.File && window.FileReader && window.FileList && window.Blob)
        {
            //get the file size and file type from file input field
            var fsize = $('#inputFile')[0].files[0].size;

            if(fsize>1048576) //do something if file size more than 1 mb (1048576)
            {
                alert(fsize +" bites\nToo big!");
            }else{
                alert(fsize +" bites\nYou are good to go!");
            }
        }else{
            alert("Please upgrade your browser, because your current browser lacks some new features we need!");
        }
    }

    render(){
        return <div>
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title"><b>
                        <span className="green">Bước 1&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="green">Bước 2&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="green">Bước 3&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        <span className="green">Bước 4&nbsp;&nbsp;</span><span className="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;
                        Bước 5 - Tải tài liệu
                    </b></h3>
                </div>
                <div className="panel-body">
                    <div className="smallspace"></div>
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Ví dụ: Ảnh, hộ chiếu, học bạ, giấy khai sinh, xác nhận ngân hàng, thư giới thiệu của giáo viên,...</h4>
                            <h4>Không bắt buộc</h4>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Tải file</label>
                                <input type="file" name="" id="inputFile" multiple/>
                                <p className="help-block"></p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-xs-6 col-md-2 col-md-offset-8 text-right">
                            <button className="btn btn-default" onClick={this._preStep}>Bước <span
                                className="badge">4</span></button>
                        </div>
                        <div className="col-xs-6 col-md-2">
                            <button className="btn btn-primary" onClick={this._nextStep}>Tiếp theo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}