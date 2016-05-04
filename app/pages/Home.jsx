import React from 'react'

import hat from 'hat'
import _ from 'lodash'
import db from '../db.js';

export default class Home extends React.Component{
	constructor(props){
		super(props);

		this._startClick = this._startClick.bind(this);
	}

	_startClick(e){
		e.preventDefault();
		db('nophoso').remove({});
		this.props.history.pushState(null, "/buoc-1");
	}
	render(){
		return (
			<div className="row">
				<div className="col-xs-12 col-md-10 col-md-offset-1">
					<div className="jumbotron">
						<h4>Quý phụ huynh, học sinh vui lòng điền các thông tin dưới đây để Sunrise Vietnam tư vấn chọn trường, học bổng nhanh nhất và chuẩn xác nhất.Cuối đơn sẽ có mục TẢI HỒ SƠ để quý phụ huynh, học sinh gửi các bản scan bằng cấp, học bạ/bảng điểm, thư giới thiệu, hộ chiếu để Sunrise Vietnam tiến hành nộp cho trường ngay.</h4>
						<button className="btn btn-primary" onClick={this._startClick}>Bắt đầu điền hồ sơ</button>
					</div>
				</div>
			</div>
		)
	}
}