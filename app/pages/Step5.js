import React from 'react';

export default class Step5 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            step5: {}
        }
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = 'Bước 5 ... Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-4");
    }

    _nextStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/thanks");
    }

    render(){
        return <div>
            <div className="panel panel-info">
                <div className="panel-heading"><h3 className="panel-title">Bước 5</h3></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12">
                            <label>Tôi xác nhận Sunrise Vietnam là đại diện hỗ trợ học sinh hoàn thiện hồ sơ du
                                học</label>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-8">
                            <button className="btn btn-default" onClick={this._preStep}>Bước <span
                                className="badge">4</span></button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary" onClick={this._nextStep}>Đồng ý</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}