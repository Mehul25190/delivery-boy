import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text } from 'native-base';
import { required, email } from 'redux-form-validators'
import { InputBox } from '../../components';
import styles from './styles';

class SignInFormEmail extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
     
        
         <View>
        <Text style={styles.label}>Email</Text>
      </View>
        <Field 
         
          name="email" 
          component={InputBox} 
          // placeholder='Enter your email'
          keyboardType={'email-address'}
          validate={[required({msg: `${language.email} ${language.required}`}), email({msg: `${language.email} ${language.notValid}`})]}
        />
      <View >
        <Text style={styles.label}>Password</Text>
      </View>
        <Field 
          name="password" 
          component={InputBox} 
          // placeholder='Enter password'
          secureTextEntry={true}
          validate={[required({msg: `${language.password} ${language.required}`})]}
        />
      </Form>
      
    )
  }
}


const signinformemail = reduxForm({
  form: 'signinFormemail',
})(SignInFormEmail);

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signinformemail);