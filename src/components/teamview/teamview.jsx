import React, { Component } from 'react';
import { connect } from 'react-redux';

import './teamview.scss';

import RosterView from '../rosterview/rosterview';

const mapStateToProps = state => {
    return { 
            displayedTeam: state.displayedTeam 
        };
}

/*
const mapDispatchToProps = dispatch => {
    return {
      updateSearchTerm: (event) => dispatch(updateSearchTerm(event))
    };
}
*/

class TeamView extends Component{
    render(){
        return(
            <div id="teamViewDiv">

                <div id="teamInfo">
                    <img src={this.props.displayedTeam.logoSrc} height="150px" width="150px"/>
                    <h2> {this.props.displayedTeam.name} </h2>
                </div>

               <RosterView />
               
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(TeamView);