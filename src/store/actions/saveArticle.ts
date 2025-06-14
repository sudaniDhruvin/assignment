import {store} from '..';
import {SAVE_ARTICLE} from '../types';
import {NewsArticle} from '../../libs/dummyData';

export const saveArticle = (articles: NewsArticle[]) => {
  store.dispatch({
    type: SAVE_ARTICLE,
    payload: articles,
  });
};
