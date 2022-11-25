import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import "./HomeFooter.scss";

class HomeFooter extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-footer">
         <p>&copy; 2022 Võ Thị Kim Trang. More Information, please visit my Page. 
            <a target="_blank" href="#">&#8594; Click here &#8592; </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
