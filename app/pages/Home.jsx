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
			<div>
				<div className="row">
					<div className="col-md-12">
					<h4 className="text-muted">Quý phụ huynh, học sinh vui lòng điền các thông tin dưới đây để Sunrise Vietnam tư vấn chọn trường, học bổng nhanh nhất và chuẩn xác nhất.Cuối đơn sẽ có mục TẢI HỒ SƠ để quý phụ huynh, học sinh gửi các bản scan bằng cấp, học bạ/bảng điểm, thư giới thiệu, hộ chiếu để Sunrise Vietnam tiến hành nộp cho trường ngay.</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<button className="btn btn-primary" onClick={this._startClick}>Bắt đầu điền hồ sơ</button>
					</div>
				</div>
			</div>
		)
	}
}