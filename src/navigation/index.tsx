import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import ArticleDetailsScreen from '../screens/ArticleDetailsScreen';
import { RootParamsList } from './types';

const Stack = createStackNavigator<RootParamsList>();

const index = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='tabBar' component={TabNavigation}/>
    <Stack.Screen name='articleDetail' component={ArticleDetailsScreen}/>
   </Stack.Navigator> 
  )
}

export default index

const styles = StyleSheet.create({})