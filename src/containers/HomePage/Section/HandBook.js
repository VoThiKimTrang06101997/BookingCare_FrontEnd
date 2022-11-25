import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import "./HandBook.scss";

// Import React-Slick
import Slider from "react-slick";


class HandBook extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-handbook">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section text-danger"><b>Cẩm nang</b></span>
              <button className="btn-section">Xem thêm</button>
            </div>

            <div className="handbook-body">
              <Slider {...this.props.settings} >
                <div className="handbook-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 1</div>
                </div>

                <div className="handbook-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 1</div>
                </div>
               
                <div className="handbook-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 1</div>
                </div>

                <div className="handbook-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 1</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
