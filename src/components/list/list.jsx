import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { teams: state.teams };
}

const ConnectedList = ({ teams }) => (
    <ul>
        {/* () instead of {} */}
        {teams.map(team => (
            <li key={team.name}>{team.name}</li>
        ))}
    </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;