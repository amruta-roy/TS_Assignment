import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';

import LoginScreen from './src/Screens/Login';
import SignUpScreen from './src/Screens/SignUp';
import AllPostsScreen from './src/Screens/AllPosts';
import PostDetailsScreen from "./src/Screens/PostDetails";

export type HomeStackNavigator = {
  'Login': undefined;
  'SignUp': undefined;
  'AllPosts': undefined;
  'PostDetails': {post: postType;}
}

type postType = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Stack = createNativeStackNavigator<HomeStackNavigator>();

const App = () => {

  return (
    <SafeAreaView style={{ flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="AllPosts" component={AllPostsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ headerShown: true }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
  );
};

export default App;