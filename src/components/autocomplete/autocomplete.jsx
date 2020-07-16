import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearchTerm } from "../../redux/actions/index";

import './autocomplete.scss';

const mapStateToProps = state => {
    return { 
        autoCompleteTeams: state.autoCompleteTeams 
    };
}

const mapDispatchToProps = dispatch => {
    return {
      updateSearchTerm: (event) => dispatch(updateSearchTerm(event))
    };
}

class AutoComplete extends Component{
    render(){
        return(
            <ul id="autoCompleteList">
                {/* () instead of {} */}
                {this.props.autoCompleteTeams.map(teamName => (
                    <li 
                        className="autoCompleteItem"   
                        key={teamName.id} 
                        id={teamName.id} 
                        title={teamName.name}
                        onClick={(event)=> { this.props.updateSearchTerm(event) }}
                    >
                        {teamName.name}
                    </li>
                ))}
            </ul>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);