import {NewsArticle} from '../libs/dummyData';

export type RootParamsList = {
  tabBar: TabBarNavigation;
  articleDetail: {article: NewsArticle} | undefined;
};

export type TabBarNavigation = {
  Home: undefined;
  Save: undefined;
};
