import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Icon,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Spinner, Row, Col
} from 'native-base';
import { connect } from "react-redux";
import { submit } from 'redux-form';
import * as Animatable from 'react-native-animatable';

import { Layout, Colors, Screens, ActionTypes } from '../../constants';
import { Logo, LoginBackIcon, Statusbar, ModalBox, SetLanguage, SelectLanguage, Loader, AppIntro } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import { showToast } from '../../utils/common';
import appStyles from '../../theme/appStyles';
import styles from './styles';
import SignInFormEmail from './form';

class SignInEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visibleModal: false,
    };
  }

  componentDidMount() {
    if(this.props.user!=null){
      this.props.navigation.navigate(Screens.SignInStack.route);
    }
    setTimeout(()=>{
      if(this.props.languageSet==0 && !this.props.showIntro){
        this.props.showModal();
      }
    },2000);
  }

  onSignupButtonPressHandler(){
    this.props.navigation.navigate(Screens.SignUp.route)
  }

  onForgotpasswordPressHandler(){
    this.props.navigation.navigate(Screens.ForgotPassword.route)
  }

  signinemail(values, dispatch, props){
    dispatch(userActions.signin(values))
      .then(res => {
        if(res.status == 200){
          showToast(res.msg,"success");
          dispatch(NavigationActions.navigate({ routeName: Screens.SignInStack.route }));
          // this.props.navigation.navigate(Screens.SignInStack.route)
        }else{
          showToast(res.msg,"danger");
        }
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message){
         showToast(message,"danger");
       }
       console.log(`
          Error messages returned from server:`, messages )
      });
  }

  render(){
    const { language } = this.props;
  
    if(this.props.user==null){
      // Login 
      return (
        <Container >
        <Content bounces={false} enableOnAndroid>
          <ImageBackground 
              source={imgs.bg} 
              style={ styles.backGroundstyleEmail}>
           
             <View style={styles.deliveryBoy}>
                    <Image source={imgs.delivery_boy} style={styles.imgDelivery}/>
              </View>
             <View style={[styles.loginBox,styles.loginBoxEmail]} >
                  <Animatable.View 
                    animation="fadeInUp"
                    delay={500}   style={{}}             
                     > 
                    <SignInFormEmail onSubmit={this.signinemail} />
                      <Row style={{marginBottom:10, height:30}}>
                       <Col style={{width:100,marginLeft:Layout.indent}}>
                         
                        </Col>
                          <Col style={{marginRight:Layout.indent}}>
                          <Button transparent full  
                           style={[{justifyContent:'flex-end'}]} >
                            <TouchableOpacity  onPress={() => this.onForgotpasswordPressHandler()}>
                            <Text style={[styles.linkTextEmail,appStyles.textRight]} > Forgot Password?</Text>
                            </TouchableOpacity>
                          </Button>
                        </Col>
                      </Row>
                  </Animatable.View>
                  <Animatable.View 
                    animation="fadeIn"
                    delay={1000} 
                    style={{marginBottom:20}}> 
                    { this.props.isLoading ? 
                     <Spinner color={Colors.secondary} /> : 
                      <TouchableOpacity>
                       <Button
                        full
                        primary
                        style={appStyles.btnSecontary}
                         onPress={() =>  this.props.pressLogin()}  >
                        <Text style={styles.SignInbtn}>Login </Text>
                      </Button>
                       </TouchableOpacity>
                     }
                </Animatable.View>  
               
              </View>          
        
          
           </ImageBackground>
           </Content>
        </Container>
       
      );
    }else{
      // Authendicating
      return (<Loader />);
    }
  }
}
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    showIntro: state.auth.showIntro,
    isLoading: state.common.isLoading,
    user: state.auth.user,
    language: state.auth.language,
    languageSet: state.auth.languageSet || 0,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      pressLogin: () => dispatch(NavigationActions.navigate({ routeName: Screens.Home.route })),
      pressSigninMob: () => dispatch(NavigationActions.navigate({ routeName: Screens.SignInMobile.route })),
      setLanguage: () => dispatch(userActions.setLanguage({id:1,set:1})),
      showModal: () => dispatch({ type: ActionTypes.SHOWMODAL, showModal: true }),
      resetState: () => dispatch({ type: ActionTypes.RESETSTATE })
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignInEmail);
