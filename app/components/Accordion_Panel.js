import React, { Component } from 'react';
import { Screens, Colors, Layout, ActionTypes } from '../constants';
import { Platform, LayoutAnimation, StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
class Accordion_Panel extends Component {

  constructor() {

    super();

    this.state = {
      expanded: true,
      updated_Height: 0

    }
  }

  componentWillReceiveProps(update_Props) {
    if (update_Props.item.expanded) {
      this.setState(() => {
        return {
          updated_Height: null,
          expanded: false
        }
      });
    }
    else {
      this.setState(() => {
        return {
          updated_Height: 0,
          expanded: true
        }
      });
    }
  }

  shouldComponentUpdate(update_Props, nextState) {

    if (update_Props.item.expanded !== this.props.item.expanded) {

      return true;

    }

    return false;

  };

  dialCall = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        console.log(supported)
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };



  render() {
    const { item } = this.props
    console.log("ITEM", item.orderNumber)
    return (

      <View style={styles.Panel_Holder}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.props.onClickFunction}
          style={this.state.expanded == true ? styles.Btn : styles.btnWhite}>

          <Text style={this.state.expanded == true ? styles.Panel_Button_Text : styles.Panel_Button_gray}>Order Id - {this.props.item.orderNumber} </Text>
          <Text style={this.state.expanded == true ? styles.Panel_Button_Text : styles.Panel_Button_gray}>Area - {this.props.item.areaName} </Text>

          {this.state.expanded == true ?
            (<Icon name='arrow-down' type='SimpleLineIcons' style={styles.IconStyle} />) :
            (<Icon name='arrow-up' type='SimpleLineIcons' style={styles.backIconStyle} />)

          }

        </TouchableOpacity>



        <TouchableOpacity onPress={this.props.pressClick} style={{ height: this.state.updated_Height, overflow: 'hidden', paddingLeft: Layout.indent, paddingRight: Layout.indent }}>
          <View>
            <Text style={styles.Panel_text}>Customer - {item.firstName} {item.lastName}</Text>
            {this.props.item.ringBell == 1 ?
              (<Icon name='bell' type='MaterialCommunityIcons' style={styles.bellIconStyle} />) :
              (<Icon name='bell-off' type='MaterialCommunityIcons' style={styles.bellIconStyle} />)

            }
          </View>
          <Text style={[styles.Panel_text, { marginBottom: 10 }]}>{this.props.key}Location - {item.aptNo}, {item.buildingName}, {item.areaName}, {item.cityName}, {item.zipcode}, {item.state} </Text>
          <View style={{ height: 1, width: '100%', backgroundColor: Colors.primary }} />
          <View style={{ marginVertical: 10, position: 'relative' }}>
            <Text style={styles.Panel_text}>Status - {(item.orderStatus=="DEL") ? "Delivered" : ""}
                              {(item.orderStatus=="PEN") ? "Pending" : ""}
                              {(item.orderStatus=="CAN") ? "Canceled" : ""}
                              {(item.orderStatus=="CNF") ? "Confirmed" : ""}
                              {(item.orderStatus=="RET") ? "Returned" : ""}
                              {(item.orderStatus=="INP") ? "In Process" : ""}
                              {(item.orderStatus=="PICKED") ? "PICKED" : ""}</Text>
            <Icon
              name='call'
              type='MaterialIcons'
              onPress={() => this.dialCall(item.mobileNo)}
              style={styles.callIconStyle} />
          </View>
        </TouchableOpacity>


      </View>

    );
  }
}


// Exports
export default Accordion_Panel;

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },

  Panel_text: {
    fontSize: 14,
    color: '#000',
    paddingTop: 2,
    fontFamily: 'Font-Medium'
  },

  Panel_Button_Text: {
    textAlign: 'left',
    color: '#fff',
    fontFamily: 'Font-Medium',
    fontSize: 16,
    paddingLeft: 16
  },
  Panel_Button_gray: {
    textAlign: 'left',
    color: '#000',
    fontFamily: 'Font-Medium',
    fontSize: 16,
    paddingLeft: Layout.indent - 10
  },
  Panel_Holder: {
    marginVertical: 5,
    borderRadius: 8,
    elevation: 1,
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    elevation: 1.5
  },

  Btn: {
    position: 'relative',
    padding: 9,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    elevation: 1
  },
  btnWhite: {
    position: 'relative',
    padding: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: '#F4F4F4',

  },
  IconStyle: {
    position: 'absolute',
    right: 12,
    top: 12,
    color: '#fff',
    fontSize: 20
  },
  backIconStyle: {
    position: 'absolute',
    right: 12,
    top: 12,
    color: '#000',
    fontSize: 20
  },
  callIconStyle: {
    position: 'absolute',
    right: 12,
    top: 3,
    color: Colors.primary,
    fontSize: 20
  },
  bellIconStyle: {
    position: 'absolute',
    right: 0,
    top: 3,
    color: Colors.primary,
    fontSize: 20
  }

});