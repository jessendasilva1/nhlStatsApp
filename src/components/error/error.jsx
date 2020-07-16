import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return{ errorMessage: state.errorMessage };
}

const ErrorMessage = ({ errorMessage }) => (
    <div>
        {errorMessage}
    </div>
);

export default connect(mapStateToProps)(ErrorMessage);