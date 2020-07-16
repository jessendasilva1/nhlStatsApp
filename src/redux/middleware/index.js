import { ADD_ARTICLE } from '../../constants/constants';
//import { FOUND_BAD_WORD } from '../../constants/constants';

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
    return function(next){
      return function(action){
        // do your stuff
        //console.log(action.payload);
        if (action.type === ADD_ARTICLE) {
            const foundWord = forbiddenWords.filter(word =>
              action.payload.title.includes(word)
            );
            if (foundWord.length) {
              return dispatch({ type: FOUND_BAD_WORD });
            }
          }
        return next(action);
      }
    }
}  