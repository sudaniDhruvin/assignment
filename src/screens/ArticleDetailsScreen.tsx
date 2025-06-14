import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

import moment from 'moment';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {RootState} from '../store';
import {hp, wp} from '../libs/helper';
import {IMAGES} from '../assets/images';
import {NewsArticle} from '../libs/dummyData';
import {RootParamsList} from '../navigation/types';
import {saveArticle} from '../store/actions/saveArticle';

const {width} = Dimensions.get('window');

const ArticleDetailsScreen = () => {
  const {top} = useSafeAreaInsets();
  const route = useRoute<RouteProp<RootParamsList, 'articleDetail'>>();
  const navigation = useNavigation<NavigationProp<RootParamsList>>();
  
  const articleData = route.params?.article;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const savedArticles = useSelector(
    (state: RootState) => state.articles.articles,
  );

  const [article, setArticle] = useState<NewsArticle | null>(null);

  const handleBookmarkPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (article?.isSaved) {
      const removed = savedArticles?.filter(
        i => i?.article_id !== article?.article_id,
      );
      saveArticle([...removed]);
      setArticle({...article, isSaved: false});
    } else {
      saveArticle([article, ...savedArticles]);
      setArticle({...article, isSaved: true});
    }
  };

  useEffect(() => {
    if (articleData) {
      setArticle(articleData);
    }
  }, [articleData]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View
        style={{
          position: 'absolute',
          right: wp(3.4),
          left: wp(3.4),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: top + hp(1),
          zIndex: 99999,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, {}]}>
          <Image
            source={IMAGES.BACK}
            style={{
              width: wp(5),
              height: wp(5),
              resizeMode: 'contain',
              tintColor: '#FFF',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={handleBookmarkPress}
          activeOpacity={0.8}>
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            {article?.isSaved ? (
              <Image
                source={IMAGES.FILLED_BOOKMARK}
                style={styles.bookmarkIcon}
              />
            ) : (
              <Image
                source={IMAGES.UNFILLED_BOOKMARK}
                style={styles.bookmarkIcon}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: article?.image_url}}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.source}>{article?.source_name}</Text>
          <Text style={styles.date}>
            {article?.pubDate && moment(article?.pubDate).format('DD MMM YYYY')}
          </Text>
        </View>

        <Text style={styles.title}>{article?.title}</Text>

        {article?.category && article?.category.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagsContainer}>
            {article?.category?.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        <Text style={styles.description}>{article?.description}</Text>
      </View>
    </ScrollView>
  );
};

export default ArticleDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: width * 0.75,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    lineHeight: 32,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    color: '#1976d2',
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: wp(6),
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: wp(6),
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: wp(4.8),
    height: wp(4.8),
    tintColor: '#FFF',
  },
});
