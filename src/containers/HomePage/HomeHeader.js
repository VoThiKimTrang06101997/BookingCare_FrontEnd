import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import "./HomeHeader.scss";

import logo from "../../assets/images/logo.svg"

import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";


class HomeHeader extends Component {
  changeLanguage = (language) => {
    // this.props.dispatch(changeLanguageApp(language))
    this.props.changeLanguageAppRedux(language)

    // Fire Redux Event: Actions

  }

  render() {
    let language = this.props.language;


    return (
      <Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img className="header-logo" src={logo} alt="" />
            </div>

            <div className="center-content">
              <div className="child-content">
                <div>
                   <b> <FormattedMessage id="home-header.speciality" /> </b>
                </div> 

                <div className="subs-title"><FormattedMessage id="home-header.search-doctor"/> </div>
              </div>

              <div className="child-content"> 
                <div>
                  <b><FormattedMessage id="home-header.health-facility"/></b>
                </div>

                <div className="subs-title"><FormattedMessage id="home-header.select-hospital-room"/></div>  
              </div>

              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.doctor"/></b>
                </div>

                <div className="subs-title"><FormattedMessage id="home-header.select-doctor"/></div>
              </div>

              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.fee"/></b>
                </div>
 
                <div className="subs-title"><FormattedMessage id="home-header.general-check-health"/></div>   
              </div>
            </div>

            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i> <FormattedMessage id="home-header.support"/>
              </div>
              <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi active'}>
                <span onClick={() => {this.changeLanguage(LANGUAGES.VI)}}>VN</span>
              </div>
              <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en active'}>
                <span onClick={() => {this.changeLanguage(LANGUAGES.EN)}}>EN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1"><FormattedMessage id="banner.titlel"/></div>
            <div className="title2"><b><FormattedMessage id="banner.title2"/></b></div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>

          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child"><i className="far fa-hospital"></i></div>
                <div className="text-child"><b><FormattedMessage id="banner.child1"/></b></div>
              </div>

              <div className="option-child">
                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                <div className="text-child"><b><FormattedMessage id="banner.child2"/></b></div>
              </div>

              <div className="option-child">
                <div className="icon-child"><i className="fas fa-procedures"></i></div>
                <div className="text-child"><b><FormattedMessage id="banner.child3"/></b></div>
              </div>

              <div className="option-child">
                <div className="icon-child"><i className="fas fa-microscope"></i></div>
                <div className="text-child"><b><FormattedMessage id="banner.child4"/></b></div>
              </div>

              <div className="option-child">
                <div className="icon-child"><i className="fas fa-user-md"></i></div>
                <div className="text-child"><b><FormattedMessage id="banner.child5"/></b></div>
              </div>
              
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-tooth"></i></div>
                <div className="text-child"><b><FormattedMessage id="banner.child6"/></b></div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
