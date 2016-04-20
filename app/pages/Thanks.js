import React from 'react';

export default class Thanks extends React.Component{
    constructor(props) {
        super(props);
        /*this.state = {
            step5: {}
        }
        this._preStep = this._preStep.bind(this);*/
        this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = 'Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
    }

    render(){
        return <div>
            <div className="row">
                <div className="col-md-12">
                    <p>Sunrise Vietnam </p>
                    <p>Với đơn đăng ký này, chúng tôi sẽ ưu tiên </p>
                    <p>Bạn biết đến Sunrise Vietnam từ nguồn nào? Xin vui lòng chia sẻ cùng chúng tôi</p>
                </div>
                <div className="col-md-12">
                    <div class="checkbox">
                        <label><input type="checkbox" value=""/>Website</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value=""/>Facebook</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value=""/></label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value=""/></label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value=""/></label>
                    </div>
                </div>
                <div className="col-md-12">
                    <p>Xin chân thành cảm ơn!</p>
                </div>
            </div>
        </div>
    }
}