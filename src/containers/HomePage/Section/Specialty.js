import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import "./Specialty.scss";

// Import React-Slick
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { FormattedMessage } from 'react-intl';
import { history } from './../../../redux';
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    // console.log("Check Response: ", res)
    if (res && res.errorCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if(this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`)
    }
  }

  render() {
    let { dataSpecialty } = this.state;

    return (
      <Fragment>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title-section text-danger">
                <b><FormattedMessage id="homepage.specialty-popular" /></b>
              </span>
              <button className="btn-section"><FormattedMessage id="homepage.more-infor"/></button>
            </div>

            <div className="specialty-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div className="specialty-customize" key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div className="bg-image" style={{backgroundImage: `url(${item.image})`}} /> 
                        <div className="specialty-name">{item.name}</div>
                      </div>
                    );
                  })}
              </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
