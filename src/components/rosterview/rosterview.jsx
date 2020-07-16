import React, { Component } from 'react';
import { connect } from 'react-redux';

import './rosterview.scss';

const mapStateToProps = state => {
    return { 
            teamRoster: state.displayedTeamRoster,
        };
}

/*
const mapDispatchToProps = dispatch => {
    return {
      updateSearchTerm: (event) => dispatch(updateSearchTerm(event))
    };
}
*/

class RosterView extends Component{
    render(){
        return(
            <ul id="rosterView">
                {/* () instead of {} */}
                {this.props.teamRoster.map(player => (
                    <li 
                        className="rosterPlayer"   
                        key={player.person.id} 
                        id={player.person.id} 
                    >
                        <h4>{player.person.fullName}</h4>
                        <h4>Jersey #: {player.jerseyNumber}</h4>
                        <h4>Position: {player.position.abbreviation}</h4>
                    </li>
                ))}
            </ul>
        );
    }
}

export default connect(mapStateToProps, null)(RosterView);