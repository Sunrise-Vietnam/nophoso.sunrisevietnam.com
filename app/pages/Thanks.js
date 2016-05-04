import React from 'react';

export default class Thanks extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            thanks: {}
        }
        //this._preStep = this._preStep.bind(this);
        //this._nextStep = this._nextStep.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = 'Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
    }

    render(){
        return <div>
            <div className="panel panel-success">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 col-md-offset-1">
                            <h4>Sunrise Vietnam đã nhận được đơn đăng ký của bạn. Chúng tôi sẽ liên hệ lại cùng thông tin tư vấn phù hợp nhất với nhu cầu gia đình trong vòng 48h làm việc.</h4>
                            <h4>Với đơn đăng ký này, chúng tôi sẽ ưu tiên bạn trong danh sách thi học bổng, nhận ưu đãi và quà tặng của trường cũng như của Sunrise Vietnam.</h4>

                        </div>
                        <div className="col-xs-12 col-md-10 col-md-offset-1">
                            <h4>Xin chân thành cảm ơn!</h4>
                            <h4><a href="http://www.sunrisevietnam.com/">Trở về trang chủ</a></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}