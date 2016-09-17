import React from 'react';
import db from 'localforage';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.__changeLanguage = this.__changeLanguage.bind(this);
    }

    __changeLanguage(e) {
        e.preventDefault();
        let lang = e.target.getAttribute('data-lang');
        db.setItem('lang', lang).then(()=> {
            window.location.href = '/';
        })
    }

    render() {
        let currentLanguage = (window.i18n) ? window.i18n.language : 'vi';
        return <div className="row">
            <div className="col-md-12 text-right flags">
                {currentLanguage === 'en' ?
                    <a type="button" className="btn btn-xs" data-lang="vi" id="vi-flag" onClick={this.__changeLanguage}>VI <img
                        src={require('../photos/qkvn.png')} data-lang="vi"/></a> :
                    <a type="button" className="btn btn-xs" data-lang="en" id="en-flag" onClick={this.__changeLanguage}>EN <img
                        src={require('../photos/flag-us.jpg')} data-lang="en"/></a>
                }
            </div>
        </div>
    }
}