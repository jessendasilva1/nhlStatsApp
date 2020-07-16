import { ADD_ARTICLE } from '../../constants/constants';
import { UPDATE_SEARCH_TERM } from '../../constants/constants';
import { DATA_LOADED } from '../../constants/constants';
import { LOAD_DATA_FROM_API } from '../../constants/constants';
import { UPDATE_AUTOCOMPLETE } from '../../constants/constants';

const initialState = {
    searchTerm: '',
    searchTermIndex: '',
    teams: [],
    displayedTeam: null,
    displayedTeamRoster: '',
    autoCompleteTeams: [],
    focus: false
};

export function rootReducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
          articles: state.articles.concat(action.payload),
          errorMessage: ''
        });
      }
    else if(action.type === UPDATE_SEARCH_TERM){
        const searchTerm = action.payload.target;
        if(searchTerm.title){
            return{
                ...state,
                searchTermIndex: searchTerm.id,
                searchTerm: searchTerm.title,
                autoCompleteTeams: [],
                focus: true
            }
        } else {
            return{
                ...state,
                searchTerm: searchTerm.value,
                focus: false
            }
        }
        //console.log("update state from autocomplete reducer.");
    } 
    else if(action.type === UPDATE_AUTOCOMPLETE){
        //console.log('update autocomplete key pressed: ' + action.payload);
        const searchTerm  = state.searchTerm;
        if(state.searchTerm){
            //console.log("update autocomplete state teams: " + searchTerm);
            function teamContainsCharacter(team){
            let letter = searchTerm.toLowerCase();
            let teamName = team.name.toLowerCase();

            if(teamName.includes(letter)) {
                //console.log("TeamName: " + teamName + ".  Letter: " + letter);
                return teamName;
            }
        }
            const filteredTeams = state.teams.filter(teamContainsCharacter);
            //console.log(filteredTeams);
            //action.payload.includes(team.name.trim().toLowerCase())
          
            return {
                ...state,
                autoCompleteTeams: filteredTeams,
                focus: true
            }
        } else {
            return{
                ...state,
                autoCompleteTeams: [],
                focus: true
            }
        }
        
    } 
    else if(action.type === DATA_LOADED){
        //console.log('dataloaded reducer \n' + JSON.stringify(action.payload.roster.data));
        let roster = action.payload.roster.data.teams[0].roster.roster;
        let team = action.payload.team.data.teams[0];
        return{
            ...state,
            searchTerm: '',
            displayedTeam: team,
            displayedTeamRoster: roster,
            focus: false
        }
    } 
    else if(action.type === LOAD_DATA_FROM_API){
        // console.log('loadData reducer');
       // console.log(action.payload.data.teams);
        return{
            ...state,
            teams: action.payload.data.teams
        }
    } 
    return state;
};

export default rootReducer;