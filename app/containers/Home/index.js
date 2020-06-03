import React from 'react'
import { StyleSheet, UIManager, LayoutAnimation,  View,TouchableHighlight,Image,FlatList,ScrollView, ImageBackground, StatusBar,TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers, Catalog, List,Accordion_Panel } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header,Item, Left,Input, Body, Title, Right, Grid, Col, Card, Accordion 

} from 'native-base';

import {allOrders} from '../data/data';
//import MasonryList from "react-native-masonry-list";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const cartCount = 1;

class Home extends React.Component {
  constructor(props) {
    super(props);
   if (Platform.OS === 'android') {
     UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    
     this.state = {
     
      AccordionData: [...allOrders],
     };
  }
  
   update_Layout = (index) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = this.state.AccordionData.map((item) => {
      const newItem = Object.assign({}, item);
  
      newItem.expanded = false;
      return newItem;
    });

    array[index].expanded = true;
    this.setState(() => {
      
      return {
        AccordionData: array
      }
    });
  };

  onPressRecipe = item => {
    console.log(item);
    this.props.navigation.navigate('ProductList', { item });
  };

  openControlPanel = () => {

    this.props.logout(); 
  }
 
 
render(){
   return (
      <Container style={[appStyles.container,{ width: Layout.window.width, height: Layout.window.height}]}>
        <Headers
            IconLeft='arrowleft'
            onPress={() => this.props.logout()}
            IconRightF='search'
            setFilter={true}
            IconRightT='sound-mix'
            StyleIconRightT={{marginRight:10}}
            bgColor='transparent'
            Title='All Orders'
            IconsRightT={styles.IconsRightT}
        />
      
        <Content enableOnAndroid style={[appStyles.content,{zIndex:-1}]}>
         <View style={styles.MainContainer}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
              {
                this.state.AccordionData.map((item, key) =>
                (
                    <Accordion_Panel key={key} onClickFunction={this.update_Layout.bind(this, key)} item={item}
                     pressClick={()=> this.onPressRecipe(item.body[0])}
                      />
                ))
              }
            </ScrollView>
          </View>
        </Content>

        { /*<Catalog {...this.props} />*/}
  </Container>
    
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);