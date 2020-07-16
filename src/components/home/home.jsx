import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSearchChange, getData, loadData } from "../../redux/actions/index";

//import List from '../list/list';
import Autocomplete from '../autocomplete/autocomplete';
import TeamView from '../teamview/teamview';

import './home.scss';

const mapDispatchToProps = dispatch => {
    return {
      handleSearchChange: searchLetter => dispatch(handleSearchChange(searchLetter)),
      getData: (searchTerm) => dispatch(getData(searchTerm)),
      loadData: () => dispatch(loadData())
    };
}

const mapStateToProps = state => {
    return { 
      searchTerm: state.searchTerm,
      searchTermIndex: state.searchTermIndex,
      displayedTeam: state.displayedTeam,
      teams: state.teams,
      autoCompleteTeams: state.autoCompleteTeams,
      focus: state.focus
    };
}

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount(){
    this.props.loadData();
  }

  componentDidUpdate(){
    if(this.props.focus === true){
      this.textInput.current.focus();
    } 
    else if (this.props.focus === false){
      this.textInput.current.blur();
    }
  }
  
  render() {

    return (
        <div id="homeDiv">
          <div id="searchForm">
          <h1 id="mainHeader">NHL Stats</h1>
          <form onSubmit={(event) => { this.props.getData({event: event, info: {searchTerm: this.props.searchTerm, searchTermIndex: this.props.searchTermIndex} })} } >
            <input ref={ this.textInput } type="text" placeholder="Search for a team" name="searchTerm" value={this.props.searchTerm} onChange={() => { this.props.handleSearchChange(event)} }></input>
            <input type="submit" id="submitButton" value="Search"></input>
          </form>
  
          <div id="autoComplete">
              <Autocomplete /> 
            </div>    
          </div>

        <div id="teamView">
          {this.props.displayedTeam ? <TeamView /> : ''}
        </div>

        </div> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);