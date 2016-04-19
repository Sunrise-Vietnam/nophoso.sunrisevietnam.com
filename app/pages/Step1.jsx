import _ from 'lodash';
import hat from 'hat';
import db from '../db.js';

import React from 'react';

export default class Step1 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			step1 : {}
		}
	}
	componentWillMount(){
		let step1 = db('nophoso').find({step : 1});
		if(!step1){
			step1 = {
				step : 1,
				data : {}
			}
		}
		this.setState({
			step1 : step1
		});
	}
	componentDidMount(){
		document.title = 'Bước 1 - Thông tin học sinh ... Nộp hồ sơ online - SUNRISE VIETNAM Co.,Ltd';
	}
	render(){
		return <div>
			<div className="row">
				<div className="col-md-12">
					<h3>Bước 1 - Thông tin học sinh</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="form-horizontal">
						<fieldset>
							<div className="form-group">
								<label htmlFor="txtFullName" className="control-label col-xs-2">Họ và tên</label>
								<div className="col-xs-5">
									<input type="text" className="form-control" id="txtFullName" placeholder="Họ và tên"/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="txtSex" className="control-label col-xs-2">Giới tính</label>
								<div className="col-xs-5">
									<label className="radio-inline">
										<input type="radio" value="1" name="txtSex"/>Nam</label>
									<label className="radio-inline">
										<input type="radio" value="0" name="txtSex"/>Nữ</label>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="txtDob" className="control-label col-xs-2">Ngày sinh</label>
								<div className="col-xs-3">
									<input type="date" className="form-control" id="txtDob" placeholder="ngày/tháng/năm sinh"/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="txtIdentityNumber" className="control-label col-xs-2">Hộ Chiếu/CMND</label>
								<div className="col-xs-3">
									<input type="text" className="form-control" placeholder="Số Hộ chiếu hoặc CMND"/>
								</div>
								<div className="col-xs-2">
									<input type="text" className="form-control" placeholder="Ngày cấp"/>
								</div>
								<div className="col-xs-2">
									<input type="text" className="form-control" placeholder="Nơi cấp"/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="txtPhone" className="control-label col-xs-2">Số điện thoại</label>
								<div className="col-xs-3">
									<input type="text" className="form-control" placeholder="Số điện thoại"/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="txtEmail" className="control-label col-xs-2">Email</label>
								<div className="col-xs-3">
									<input type="text" className="form-control" placeholder="Địa chỉ Email"/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="txtAddrress" className="control-label col-xs-2">Địa chỉ hiện tại</label>
								<div className="col-xs-5">
									<textarea className="form-control" rows="2" width="100%"></textarea>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="txtSchools" className="control-label col-xs-2">Lịch sử học tập 3 năm gần nhất</label>
								<div className="col-xs-5">
									<historySchool/>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
		</div>
	}
}

let historySchool = React.createClass({
	render(){
		return <input type="number" min="1" max="12" step="1" className="form-control"/>
	}
})