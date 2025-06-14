import {NewsArticle} from '../../libs/dummyData';
import {SAVE_ARTICLE} from '../types';

interface SavedArticles {
  articles: NewsArticle[];
};

const initialState = {
  articles: [],
};

const savedArticlesReducer = (state: SavedArticles = initialState, action) => {
  switch (action.type) {
    case SAVE_ARTICLE:
      return {...state, articles: action?.payload};
    default:
      return state;
  }
};

export default savedArticlesReducer;
