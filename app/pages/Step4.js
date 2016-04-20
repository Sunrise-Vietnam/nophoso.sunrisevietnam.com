import React from 'react';

export default class Step4 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            step4: {}
        }
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = 'Bước 4 - Tải tài liệu ... Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-3");
    }

    _nextStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-5");
    }

    render(){
        return <div>
            <div className="panel panel-info">
                <div className="panel-heading"><h3 className="panel-title">Bước 4 - Tải tài liệu</h3></div>
                <div className="panel-body">
                    <div className="row">

                    </div>
                    <hr/>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-8">
                            <button className="btn btn-default" onClick={this._preStep}>Bước <span
                                className="badge">3</span></button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary" onClick={this._nextStep}>Bước <span
                                className="badge">5</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}