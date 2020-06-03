import React from 'react'
import { Icon } from 'native-base';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Strings from './Strings';

export default {
  Title: 'Grocery',
  SignInStack : {
    route: 'SignInStack'
  }, 
  DrawerStack : {
    route: 'DrawerStack'
  },
  Home : {
    route: 'Home',
    icon:'home',
    label: 'Home',
  },
  
  ProductList:{
    route: 'ProductList',
  },
 
  SignOutStack : {
    route: 'SignOutStack'
  }, 
 
  SignInEmail : {
    route: 'SignInEmail'
  }, 
  
  ForgotPassword : {
    route: 'ForgotPassword'
  }, 
};