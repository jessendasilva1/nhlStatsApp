import { 
    ADD_ARTICLE, 
    UPDATE_SEARCH_TERM,
    DATA_LOADED,
    LOAD_DATA_FROM_API,
    UPDATE_AUTOCOMPLETE,
 } from '../../constants/constants';

 import axios from 'axios';

 import { getPlayerPicture } from '../../parsing/parsing.js';

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
};

export function updateSearchTerm(payload) {
    // console.log("update search term from autocomplete:  " + "title: " + payload.target.title + ". ID: " + payload.target.id);
    // axios call to get team stats
    return { type: UPDATE_SEARCH_TERM, payload }  
};

export function handleSearchChange(payload){
    //console.log("handleSearch Change action: " + payload.target.value)
    return function(dispatch){
        dispatch({ type: UPDATE_SEARCH_TERM, payload: payload}),
        dispatch({ type: UPDATE_AUTOCOMPLETE, payload: payload})
    }
}

export function loadData(payload){
    console.log("load Data action");
    return function(dispatch){
        axios.get('https://statsapi.web.nhl.com/api/v1/teams')
            .then(response => {
                //console.log(response);
                dispatch({ type: LOAD_DATA_FROM_API, payload: response });
            })
    }
    //return { type: LOAD_DATA_FROM_API, payload}
}


export function getData(payload){
    payload.event.preventDefault();
    //console.log('SearchTerm: ' + payload.info.searchTerm + ". Index: " + payload.info.searchTermIndex);
    const teamID = payload.info.searchTermIndex;
    let url = 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID;
    let teamLogoURL = 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + teamID + '.svg';
    let teamRoster = 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '?expand=team.roster';
    return function(dispatch){

        /*
        axios.all([url, teamLogoURL, teamRoster])
            .then(response => {
                getPlayerPicture(teamRoster);
                //const playerPromise = (new Promise())
        }) */

        /* 
        use axios.all to get the inital info. Send the teamRoster to a promise "getPlayerPicture(teamRoster)"
        and loop through each of the players on the roster and add the player headshot to each player. Return the new roster
        and send all the info to the reducers 
        */



        axios.get(url)
            .then(teamResponse => {
                    teamResponse.data.teams[0].logoSrc = teamLogoURL;
                    //console.log(JSON.stringify(teamResponse));
                    axios.get(teamRoster)
                    .then(rosterResponse => {
                        //getPlayerPicture(teamRoster);
                        dispatch({ type: DATA_LOADED, payload: {team: teamResponse, roster: rosterResponse} });
                    })
            })
    }
}
