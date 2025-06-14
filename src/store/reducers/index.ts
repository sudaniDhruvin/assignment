import {combineReducers} from 'redux';
import savedArticlesReducer from './savedArticle';


const rootReducer = combineReducers({
  articles: savedArticlesReducer,
});

export default rootReducer;
