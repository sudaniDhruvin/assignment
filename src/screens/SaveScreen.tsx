import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {NewsArticle} from '../libs/dummyData';
import Article from '../components/Article';
import {saveArticle} from '../store/actions/saveArticle';
import {fontSize, hp, wp} from '../libs/helper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { Fonts } from '../assets/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootParamsList } from '../navigation/types';

const SaveScreen = () => {
  const styles = Styles();
  const navigation = useNavigation<NavigationProp<RootParamsList>>()
  const savedArticles = useSelector(
    (state: RootState) => state.articles.articles,
  );

  const [searchQuery, setSearchQuery] = useState('');

  const onBookmarkPress = (article: NewsArticle) => {
    const removed = savedArticles?.filter(
      i => i?.article_id !== article?.article_id,
    );
    saveArticle([...removed]);
  };

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

  const renderItem = useCallback(
    ({item}: {item: NewsArticle}) => {
      return (
        <Article
          article={item}
          isBookmarked={true}
          onBookmarkPress={() => {
            onBookmarkPress(item);
          }}
          onPress={() => navigation.navigate('articleDetail', {article: {...item, isSaved: true}})}
        />
      );
    },
    [savedArticles],
  );

  const listEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>{'You haven’t bookmarked anything yet.'}</Text>
        <Text style={styles.emptyDescription}>
          {'Tap the bookmark icon on any article to save it for later.'}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={savedArticles}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};

export default SaveScreen;

const Styles = () => {
  const {top} = useSafeAreaInsets();
  return StyleSheet.create({
  emptyDescription: {
    fontFamily: Fonts.O_Medium,
    fontSize: fontSize(16),
    textAlign: "center",
    letterSpacing: 0.5,
  },
  emptyTitle: {
    fontFamily: Fonts.M_SemiBold,
    fontSize: fontSize(18),
    letterSpacing: 0.5,
    textAlign: "center"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    flexDirection: "column",
    gap: wp(2),
  },
    container: {
      backgroundColor: '#F5F7FA',
      flex: 1,
    },
    listContainer: {
      paddingHorizontal: wp(2),
      paddingTop: hp(2),
      flexGrow: 1
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
  });
};
