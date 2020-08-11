import React from 'react'
import { StyleSheet, UIManager, LayoutAnimation, View, TouchableHighlight, Image, FlatList, ScrollView, ImageBackground, StatusBar, TouchableOpacity } from 'react-native'
import _ from 'lodash';
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers, Catalog, List, Accordion_Panel, ScreenLoader } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Item, Left, Input, Body, Title, Right, Grid, Col, Card, Accordion

} from 'native-base';

import { allOrders } from '../data/data';
//import MasonryList from "react-native-masonry-list";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as orderActions from "../../actions/Order";
import { ActionTypes } from "../../constants"
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { MenuProvider } from 'react-native-popup-menu';
const cartCount = 1;

class Home extends React.Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    this.state = {
      AccordionData: this.props.orderlistdata,
    };
  }
  componentWillMount() {
    this.props.orderlist(this.props.user[0].id,)
    if (this.props.user == null) {
      this.props.navigation.navigate(Screens.SignInStack.route)
    }
  }
  componentDidMount() {
    this.props.orderlist(this.props.user[0].id,)
    if (this.props.user == null) {
      this.props.navigation.navigate(Screens.SignInStack.route)
    }
  }

  update_Layout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = this.props.orderlistdata.map((item) => {
      const newItem = Object.assign({}, item);

      newItem.expanded = false;
      return newItem;
    });

    array[index].expanded = true;
    this.props.Updatedata(array)
  };

  onPressRecipe = item => {
    const did = this.props.user[0].id
    if (item.orderStatus == 'RET') {
      this.props.orderdetails(did, item.id).then(res => {
        if (res.status == "success") {
         this.props.navigation.navigate('ProductList');
        }
      })
    }
    // else if (item.orderStatus == 'PEN' || item.orderStatus == 'DEL') {
    //   this.props.navigation.navigate('Delivered');
    // }
    else{
      this.props.orderdetails(did, item.id).then(res => {
        if (res.status == "success") {
         this.props.navigation.navigate('Delivered');
        }
      })
    }

  };

  openControlPanel = () => {

    this.props.logout().then(res => {

      if (res == true) {

        this.props.navigation.navigate(Screens.SignInStack.route)
      } else {
        this.props.logout()
      }
    }
    )
  }


  render() {

    return (
      <MenuProvider customStyles={appStyles.containerProvider} >
        <Container style={[appStyles.container, { width: Layout.window.width, height: Layout.window.height }]}>

          <Headers
            setLogout={true}
            IconRightF='search'
            setFilter={true}
            IconRightT='sound-mix'
            StyleIconRightT={{ marginRight: 10 }}
            bgColor='transparent'
            Title='All Orders'
            IconsRightT={styles.IconsRightT}
          />

          <Content enableOnAndroid style={[appStyles.content, { zIndex: -1 }]}>
            {
              this.props.orderlistdata ?
                <View style={styles.MainContainer}>
                  <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                    {
                      this.props.orderlistdata.map((item, key) =>
                        (
                          <Accordion_Panel
                            key={key}
                            onClickFunction={this.update_Layout.bind(this, key)}
                            item={item}
                            pressClick={() => this.onPressRecipe(item)}
                          />
                        ))
                    }
                    
                      <ScreenLoader loading={this.props.Loading} />
                    

                  </ScrollView>
                </View> : null
            }


          </Content>

          { /*<Catalog {...this.props} />*/}
        </Container>
      </MenuProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    orderlistdata: state.order.orderlist,
    Loading: state.common.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    Updatedata: (Search) => dispatch({ type: ActionTypes.ORDERLIST, data: Search }),
    orderlist: (id) => dispatch(orderActions.Satrtorderlist({
      'deliveryBoyId': id,
    })),
    orderdetails: (did, id) => dispatch(orderActions.orderdetails({
      'deliveryBoyId': did,
      'id': id,
    })),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);