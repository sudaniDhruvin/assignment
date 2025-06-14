import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SaveScreen from '../screens/SaveScreen';
import {IMAGES} from '../assets/images';
import {fontSize, wp} from '../libs/helper';
import { Fonts } from '../assets/fonts';
import { TabBarNavigation } from './types';

const Tab = createBottomTabNavigator<TabBarNavigation>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#f89c1d',
        tabBarInactiveTintColor: '#808080',
        tabBarLabelStyle: {
            fontFamily: Fonts.M_SemiBold,
            fontSize: fontSize(14)
        }
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Image
                source={IMAGES.HOME}
                style={{tintColor: color, width: wp(5.5), height: wp(5.5)}}
                resizeMode='contain'
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Save"
        component={SaveScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Image
                source={IMAGES.BOOKMARK}
                style={{tintColor: color, width: wp(5.5), height: wp(5.5)}}
                resizeMode='contain'
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
