import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeArticle } from "../../redux/actions/index";

import List from '../list/list';

class Article extends Component {

    render(){
        return(
            <div>
                <h2>Article</h2>
                <List />
            </div>
        );
    };
}

export default Article;