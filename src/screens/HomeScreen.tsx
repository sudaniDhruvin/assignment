import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Article from '../components/Article';
import {NewsArticle, newsData} from '../libs/dummyData';
import {hp, wp} from '../libs/helper';
import {fetchArticles, fetchMoreArticles} from '../utils/articleAPIs';
import {saveArticle} from '../store/actions/saveArticle';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootParamsList} from '../navigation/types';

const HomeScreen = () => {
  const styles = Styles();
  const navigation = useNavigation<NavigationProp<RootParamsList>>();

  const savedArticles = useSelector(
    (state: RootState) => state.articles.articles,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const [nextPage, setNextPage] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getArticles = async () => {
    try {
      const articles = await fetchArticles(10);
      setAllArticles(articles?.data?.results);
      console.log('articles?.data =--->', articles?.data);
      setNextPage(articles?.data?.nextPage);
    } catch (error) {
      console.error('error getArticles =--->', error?.response);
      setNextPage('');
    } finally {
    }
  };

  const fetchMore = async (nextPage: string) => {
    try {
      setIsLoadingMore(true);
      const moreData = await fetchMoreArticles(nextPage);
      setAllArticles([...allArticles, ...moreData?.data?.results]);
      console.log('moreData?.data =--->', moreData?.data);
      setNextPage(moreData?.data?.nextPage);
    } catch (error) {
      console.log('error fetchMore =--->', error?.response);
      setNextPage('');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && nextPage) {
      fetchMore(nextPage);
    }
  }, [nextPage, isLoadingMore]);

  const onBookmarkPress = (article: NewsArticle) => {
    const isBookmarked = savedArticles?.some(
      i => i?.article_id == article?.article_id,
    );
    if (isBookmarked) {
      const removed = savedArticles?.filter(
        i => i?.article_id !== article?.article_id,
      );
      saveArticle([...removed]);
    } else {
      saveArticle([article, ...savedArticles]);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const renderItem = useCallback(
    ({item}: {item: NewsArticle}) => {
      const isBookmarked = savedArticles?.some(
        i => i?.article_id == item?.article_id,
      );
      return (
        <Article
          article={item}
          isBookmarked={isBookmarked}
          onBookmarkPress={() => {
            onBookmarkPress(item);
          }}
          onPress={() => {
            navigation.navigate('articleDetail', {article: {...item, isSaved: isBookmarked}});
          }}
        />
      );
    },
    [savedArticles],
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{'News Feed'}</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color="#f89c1d" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={allArticles}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default HomeScreen;

const Styles = () => {
  const {top} = useSafeAreaInsets();
  return StyleSheet.create({
    container: {
      backgroundColor: '#F5F7FA',
      flex: 1,
    },
    headerContainer: {
      paddingTop: top,
      paddingHorizontal: wp(4),
      paddingBottom: hp(2),
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E1E1E1',
    },
    headerTitle: {
      fontSize: wp(6),
      fontWeight: '700',
      color: '#1A1A1A',
      marginBottom: hp(2),
    },
    searchContainer: {
      backgroundColor: '#F5F5F5',
      borderRadius: wp(2),
      paddingHorizontal: wp(3),
      marginBottom: hp(1),
    },
    searchInput: {
      height: hp(5),
      fontSize: wp(3.5),
      color: '#1A1A1A',
    },
    listContainer: {
      paddingHorizontal: wp(2),
      paddingTop: hp(2),
    },
    footerContainer: {
      paddingVertical: hp(2),
      alignItems: 'center',
    },
  });
};
