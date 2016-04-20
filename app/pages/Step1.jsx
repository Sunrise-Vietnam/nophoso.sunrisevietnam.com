import _ from 'lodash';
import hat from 'hat';
import db from '../db.js';

import React from 'react';

export default class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step1: {}
        }
        this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {
        let step1 = db('nophoso').find({step: 1});
        if (!step1) {
            step1 = {
                step: 1,
                data: {}
            }
        }
        this.setState({
            step1: step1
        });
    }

    componentDidMount() {
        document.title = 'Bước 1 - Thông tin học sinh ... Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
    }

    _nextStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-2");
    }

    render() {
        return <div>
            <div className="panel panel-info">
                <div className="panel-heading"><h3 className="panel-title">Bước 1 - Thông tin học sinh</h3></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-horizontal">
                                <fieldset>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Họ và tên</label>

                                        <div className="col-xs-4">
                                            <input type="text" className="form-control" placeholder="Họ và tên"/>
                                        </div>
                                        <label className="control-label col-xs-2">Giới tính</label>

                                        <div className="col-xs-4">
                                            <label className="radio-inline">
                                                <input type="radio" value="1" name="txtSex"/>Nam</label>
                                            <label className="radio-inline">
                                                <input type="radio" value="0" name="txtSex"/>Nữ</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Ngày sinh</label>

                                        <div className="col-xs-4">
                                            <input type="date" className="form-control" id="txtDoB"
                                                   placeholder="ngày/tháng/năm sinh"/>
                                        </div>
                                        <label className="control-label col-xs-2">Nơi sinh</label>

                                        <div className="col-xs-4">
                                            <input type="text" className="form-control" placeholder="Nơi sinh"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Hộ
                                            Chiếu/ CMND</label>

                                        <div className="col-xs-4">
                                            <input type="text" className="form-control"
                                                   placeholder="Số Hộ chiếu hoặc CMND"/>
                                        </div>
                                        <div className="col-xs-3">
                                            <input type="date" className="form-control" placeholder="Ngày cấp"/>
                                        </div>
                                        <div className="col-xs-3">
                                            <input type="text" className="form-control" placeholder="Nơi cấp"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="txtPhone" className="control-label col-xs-2">Số điện
                                            thoại</label>

                                        <div className="col-xs-4">
                                            <input type="tel" className="form-control" placeholder="Số điện thoại"/>
                                        </div>
                                        <label htmlFor="txtEmail" className="control-label col-xs-2">Email</label>

                                        <div className="col-xs-4">
                                            <input type="email" className="form-control" placeholder="Địa chỉ Email"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="txtAddrress" className="control-label col-xs-2">Địa chỉ hiện
                                            tại</label>

                                        <div className="col-xs-10">
                                            <textarea className="form-control" rows="2" width="100%"></textarea>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Lịch sử học
                                            tập<br/>3 năm gần
                                            nhất</label>

                                        <div className="col-xs-10">
                                            <historySchool/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-12 col-md-2">Bằng
                                            cấp cao nhất
                                            hiện có</label>

                                        <div className="col-xs-12 col-md-3">
                                            <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                        <label className="control-label col-xs-12 col-md-2 col-md-offset-1">Bằng cấp
                                            khác (nếu có)</label>

                                        <div className="col-xs-12 col-md-3">
                                            <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Trình độ ngoại ngữ</label>

                                        <div className="col-xs-3">
                                            <select className="form-control">
                                                <option>IELTS</option>
                                                <option>TOEFL</option>
                                                <option>Khác</option>
                                            </select>
                                        </div>
                                        <div className="col-xs-3 hidden">
                                            <input type="text" className="form-control" placeholder="Bằng ngoại ngữ"/>
                                        </div>
                                        <div className="col-xs-3">
                                            <input type="text" className="form-control" placeholder="Điểm"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Khoá học mong muốn</label>

                                        <div className="col-xs-3">
                                            <select className="form-control">
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
                                        <div className="col-xs-3 hidden">
                                            <input type="text" className="form-control"
                                                   placeholder="Khoá học mong muốn"/>
                                        </div>
                                        <div className="col-xs-3 hidden">
                                            <input type="text" className="form-control" placeholder="Lớp"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Nơi mong muốn du học</label>

                                        <div className="col-xs-3">
                                            <select className="form-control">
                                                <option>Anh</option>
                                                <option>Mỹ</option>
                                                <option>Úc</option>
                                                <option></option>
                                                <option></option>
                                                <option></option>
                                                <option></option>
                                                <option></option>
                                                <option>Khác</option>
                                            </select>
                                        </div>
                                        <div className="col-xs-3 hidden">
                                            <input type="text" className="form-control"
                                                   placeholder="Nơi mong muốn du học"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Trường dự định<br/>(nếu có)</label>

                                        <div className="col-xs-10">
                                            <schoolOptions/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Yêu cầu đặc biệt</label>

                                        <div className="col-xs-10">
                                            <specialRequire/>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-10">
                            <button className="btn btn-primary" onClick={this._nextStep}>Bước <span
                                className="badge">2</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

let historySchool = React.createClass({
    render(){
        return <div className="table table-striped">
            <thead>
                <tr>
                    <th>Từ</th>
                    <th>Đến</th>
                    <th>Quá trình học tập</th>
                    <th>Thành tích</th>
                    <th>Tại trường</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="date"/></td>
                    <td><input type="date"/></td>
                    <td><input type="text"/></td>
                    <td><input type="text"/></td>
                    <td><input type="text"/></td>
                </tr>
            </tbody>
        </div>
    }
});

let schoolOptions = React.createClass({
    render(){
        return <div className="row">
            <div className="col-xs-11">
                <input type="text" className="form-control" placeholder="Lựa chọn 1" />
            </div>
            <div className="col-xs-11">
                <input type="text" className="form-control" placeholder="Lựa chọn 2" />
            </div>
            <div className="col-xs-11">
                <input type="text" className="form-control" placeholder="Lựa chọn 3" />
            </div>
        </div>
    }
});

let specialRequire = React.createClass({
    render(){
        return <div className="row">
            <label className="control-label col-xs-4">Ngành nghề</label>
            <div className="col-xs-8">
                <input type="text" className="form-control" placeholder="" />
            </div>
            <label className="control-label col-xs-4">Sở thích</label>
            <div className="col-xs-8">
                <input type="text" className="form-control" placeholder="" />
            </div>
            <label className="control-label col-xs-4">Mức chi phí du học</label>
            <div className="col-xs-8">
                <input type="text" className="form-control" placeholder="" />
            </div>
            <label className="control-label col-xs-4">Học bổng</label>
            <div className="col-xs-8">
                <input type="text" className="form-control" placeholder="" />
            </div>
            <label className="control-label col-xs-4">Điều kiện sinh hoạt</label>
            <div className="col-xs-8">
                <select className="form-control">
                    <option>Ký túc xá</option>
                    <option>Ở cùng gia đình bản xứ</option>
                    <option>Thuê căn hộ ngoài</option>
                    <option>Ở cùng người nhà</option>
                </select>
            </div>
            <label className="col-xs-4">Môi trường học</label>
            <div className="col-xs-8">
                <select className="form-control">
                    <option>Trung tâm sôi động</option>
                    <option>Ngoại ô, yên bình</option>
                    <option>Không có yêu cầu đặc biệt</option>
                </select>
            </div>
        </div>
    }
});

