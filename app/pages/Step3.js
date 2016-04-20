import React from 'react';

export default class Step3 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            step3: {}
        }
        this._preStep = this._preStep.bind(this);
        this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = 'Bước 3 - Một số câu hỏi tự luận ... Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
    }

    _preStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-2");
    }

    _nextStep(e) {
        e.preventDefault();
        this.props.history.pushState(null, "/buoc-4");
    }

    render(){
        return <div>
            <div className="panel panel-info">
                <div className="panel-heading"><h3 className="panel-title">Bước 3 - Một số câu hỏi tự luận</h3></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12">
                            <label>A. Vì sao bạn nghĩ mình phù hợp với việc du học?</label>
                        </div>
                        <div className="col-md-12">
                            <textarea rows="5" class="form-control"></textarea>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-12">
                            <label>B. Vì sao bạn nghĩ mình xứng đáng nhận học bổng?</label>
                        </div>
                        <div className="col-md-12">
                            <textarea rows="5" class="form-control"></textarea>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-12">
                            <label>C. Nếu được 3 điều có thể thay đổi thế giới, bạn muốn thay đổi điều gì?</label>
                        </div>
                        <div className="col-md-12">
                            <textarea rows="5" class="form-control"></textarea>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-8">
                            <button className="btn btn-default" onClick={this._preStep}>Bước <span
                                className="badge">2</span></button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary" onClick={this._nextStep}>Bước <span
                                className="badge">4</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}