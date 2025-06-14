import React, {useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import moment from 'moment';

import { wp } from '../libs/helper';
import {Fonts} from '../assets/fonts';
import {IMAGES} from '../assets/images';
import { NewsArticle } from '../libs/dummyData';

type Props = {
  article: NewsArticle;
  onPress?: () => void;
  onBookmarkPress?: () => void;
  isBookmarked?: boolean;
};

const Article: React.FC<Props> = ({
  article,
  onPress,
  onBookmarkPress,
  isBookmarked = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

    onBookmarkPress?.();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: article?.image_url}}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={handleBookmarkPress}
          activeOpacity={0.8}>
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            {isBookmarked ? (
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
      <View style={styles.contentContainer}>
        <View style={styles.sourceContainer}>
          <Text style={styles.source}>{article.source_name}</Text>
          <Text style={styles.date}>
            {moment(article.pubDate).format('DD MMM YYYY')}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {article.title}
        </Text>
        <Text numberOfLines={3} style={styles.description}>
          {article.description}
        </Text>
        {article.category && article.category.length > 0 && (
          <View style={styles.tagsContainer}>
            {article.category.map((tag, index) => (
              <View key={index} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Article;

const styles = StyleSheet.create({
  bookmarkIcon: {
    width: wp(4.8),
    height: wp(4.8),
    tintColor: '#FFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: wp(2),
    marginHorizontal: wp(2),
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: wp(50),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bookmarkButton: {
    position: 'absolute',
    top: wp(2),
    right: wp(2),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: wp(6),
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: wp(4),
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(2),
  },
  source: {
    fontFamily: Fonts.M_Medium,
    color: '#f89c1d',
    fontSize: wp(3),
    textTransform: 'uppercase',
  },
  date: {
    fontFamily: Fonts.M_Regular,
    color: '#999999',
    fontSize: wp(2.8),
  },
  title: {
    fontFamily: Fonts.M_SemiBold,
    color: '#1E1E1E',
    fontSize: wp(4.2),
    lineHeight: wp(5.5),
    marginBottom: wp(2),
  },
  description: {
    fontFamily: Fonts.M_Regular,
    color: '#666666',
    fontSize: wp(3.4),
    lineHeight: wp(4.8),
    marginBottom: wp(2),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(1.5),
    marginTop: wp(1),
  },
  tagChip: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: '#E0E0FF',
  },
  tagText: {
    fontFamily: Fonts.M_Medium,
    color: '#4A6FA1',
    fontSize: wp(2.8),
  },
});
