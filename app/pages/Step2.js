import React from 'react';

export default class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step2: {}
        }
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = 'Bước 2 - Thông tin gia đình ... Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-1");
    }

    _nextStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-3");
    }

    render() {
        return <div>
            <div className="panel panel-warning">
                <div className="panel-heading"><h3 className="panel-title">Bước 2 - Thông tin gia đình</h3></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12">
                            <label>A. Thông tin bố</label>
                        </div>
                        <testElement/>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-12">
                            <label>B. Thông tin mẹ</label>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-12">
                            <label>C. Thông tin người thân từng đi du học</label>
                        </div>
                        <div className="col-md-12">
                            <div className="form-horizontal">
                                <fieldset>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Họ và Tên</label>

                                        <div className="col-md-4">
                                            <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                        <label className="control-label col-xs-2">Quan hệ với học sinh</label>

                                        <div className="col-md-4">
                                            <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Địa chỉ hiện tại</label>

                                        <div className="col-md-10">
                                            <textarea className="form-control" placeholder="" rows="2"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Nơi công tác</label>

                                        <div className="col-md-4">
                                            <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                        <label className="control-label col-xs-2">Chức vụ (nếu có)</label>

                                        <div className="col-md-4">
                                            <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Số điện thoại</label>

                                        <div className="col-md-4">
                                            <input type="tel" className="form-control" placeholder=""/>
                                        </div>
                                        <label className="control-label col-xs-2">Email</label>

                                        <div className="col-md-4">
                                            <input type="email" className="form-control" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-xs-2">Đã từng du học</label>

                                        <div className="col-xs-2"><input type="text" className="form-control"
                                                                         placeholder="Khoá học"/></div>
                                        <div className="col-xs-2"><input type="text" className="form-control"
                                                                         placeholder="Tại nước"/></div>
                                        <div className="col-xs-2"><input type="text" className="form-control"
                                                                         placeholder="Tại trường"/></div>
                                        <div className="col-xs-2"><input type="text" className="form-control"
                                                                         placeholder="Vào khoảng thời gian"/></div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>D. Thông tin người nhà khác &amp; có liên quan đến kế hoạch du học (VD: người nhà ở
                                nước ngoài,...)</label>
                        </div>
                        <parentsInfo/>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-8">
                            <button className="btn btn-default" onClick={this._preStep}>Bước <span
                                className="badge">1</span></button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary" onClick={this._nextStep}>Bước <span
                                className="badge">3</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

class testElement extends React.Component {
    componentWillMount() {
        console.log('will mount')
    }

    componentDidMount() {
        console.log('mount...')
    }

    render() {
        return <h1>Test Element</h1>
    }
}

let parentsInfo = React.createClass({
    render() {
        return <div>
            <div className="col-md-12">
                <div className="form-horizontal">
                    <fieldset>
                        <div className="form-group">
                            <label className="control-label col-xs-2">Họ và Tên</label>

                            <div className="col-md-4">
                                <input type="text" className="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-2">Hộ chiếu/CMTND</label>

                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="Số hộ chiếu/CMTND"/>
                            </div>
                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="Ngày cấp"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-2">Địa chỉ hiện tại</label>

                            <div className="col-md-10">
                                <textarea className="form-control" placeholder="" rows="2"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-2">Nơi công tác</label>

                            <div className="col-md-4">
                                <input type="text" className="form-control" placeholder=""/>
                            </div>
                            <label className="control-label col-xs-2">Chức vụ (nếu có)</label>

                            <div className="col-md-4">
                                <input type="text" className="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-2">Số điện thoại</label>

                            <div className="col-md-4">
                                <input type="tel" className="form-control" placeholder=""/>
                            </div>
                            <label className="control-label col-xs-2">Email</label>

                            <div className="col-md-4">
                                <input type="email" className="form-control" placeholder=""/>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    }
})