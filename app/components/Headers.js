import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { NavigationActions } from "react-navigation";
import {
  Button,
  Text,
  Header,
  Item,
  Input,
  Left,
  Body,
  Title,
  Right,
  Icon,
  List,
  ListItem,
} from "native-base";
import * as userActions from "../actions/user";
import * as orderActions from "../actions/Order";
import appStyles from "../theme/appStyles";
import svgs from "../assets/svgs";
import { Screens, Colors, Layout, ActionTypes } from "../constants";
import Logo from "./Logo";
import Svgicon from "./Svgicon";
import Statusbar from "./Statusbar";

import ModalBox from "./ModalBox";
import SetLanguage from "./SetLanguage";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  CheckedOption,
} from "react-native-popup-menu";
const cartCount = 1;

class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      searcBar: false,
      filter: false,
      checked: "",
      textdata: "",
    };
  }

  onPress = () => {
    this.setState({ active: !this.state.active });
    this.props.onPress();
  };

  onPressSearch = () => {
    this.setState({ searcBar: !this.state.searcBar });
    this.arrayholder = this.props.orderlistdata;
  };
  onPressFilter = () => {
    this.setState({ filter: !this.state.filter });
  };
  orderlist(val, status) {
    global.text = val;
    this.setState({ checked: status, textdata: "" });
    this.props.orderlist(this.props.user[0].id, status);
  }
  SearchFilterFunction(text) {
    this.setState({
      textdata: text,
    });
    // if (text.length == 0) {
    //   this.props.Satrtorderlist(this.props.user[0].id)
    // }
    this.Gosearch(this.state.textdata);
  }
  Gosearch(text) {
    const Search = this.props.orderlistdata.filter(function (item) {
      const itemData = item.areaName
        ? item.areaName.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.props.Updatedata(Search);
  }
  Logout() {
    this.props.Logout();
    this.props.goBack();
  }
  render() {
    const { searcBar, checked } = this.state;
    const CheckedOption = (props) => (
      <MenuOption
        style={{}}
        onSelect={() => this.orderlist(props.text, props.value)}
        value={props.value}
        text={(props.checked ? "\u2713 " : "    ") + " " + props.text}
      />
    );
    return (
      <Header searchBar rounded style={[appStyles.headerStyle]}>
        <Left style={appStyles.headerLeft} icon>
          <Button
            transparent
            style={appStyles.menuBtn}
            onPress={() => this.onPress()}
          >
            <Icon
              style={appStyles.menuBar}
              size={30}
              color={Colors.white}
              type="AntDesign"
              name={this.props.IconLeft}
            />
          </Button>
        </Left>
        {this.state.searcBar == true ? (
          <Item style={[appStyles.searchBar]}>
            <Icon name="search" style={{ color: Colors.primary }} />
            {/* <Input
              style={appStyles.searchInput}
              Value={this.state.textdata}
              placeholder="Search..."
              onChangeText={(val) => this.SearchFilterFunction(val)}
            /> */}
            <TextInput
              placeholder="Search..."
              value={this.state.textdata}
              onChangeText={(val) => this.SearchFilterFunction(val)}
            />
          </Item>
        ) : (
          <Item style={{ width: 60, backgroundColor: "transparent" }}>
            <Text style={appStyles.headerTitle}>{this.props.Title}</Text>
          </Item>
        )}

        <Right style={[appStyles.headersRight, this.props.headersRight]}>
          {this.props.setFilter == true && (
            <Menu style={{ paddingBottom: 3 }}>
              <MenuTrigger text="">
                <Icon
                  style={[appStyles.IconsRightT, this.props.IconsRightT]}
                  type="Entypo"
                  name={this.props.IconRightT}
                />
              </MenuTrigger>
              <MenuOptions
                style={{ backgroundColor: "#D2EAD2", borderRadius: 5 }}
              >
                <CheckedOption
                  checked={checked == "INP"}
                  value={"INP"}
                  text="In Process"
                />
                <CheckedOption
                  checked={checked == "CNF"}
                  value={"CNF"}
                  text="Assigned to me"
                />
                <CheckedOption
                  checked={checked == "DEL"}
                  value={"DEL"}
                  text="Delivered"
                />
                <CheckedOption
                  checked={checked == "RET"}
                  value={"RET"}
                  text="Return"
                />
              </MenuOptions>
            </Menu>
          )}

          {this.state.filter == true && (
            <View style={appStyles.sortBlock}>
              <Icon
                name="triangle-up"
                type="Entypo"
                style={{
                  position: "absolute",
                  color: "#D2EAD2",
                  top: -20,
                  right: 35,
                }}
              />

              <List style={{}}>
                <TouchableOpacity>
                  <Text style={appStyles.sortText}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={appStyles.sortText}>In Process</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={appStyles.sortText}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={appStyles.sortText}>Cancel</Text>
                </TouchableOpacity>
              </List>
            </View>
          )}

          <TouchableOpacity
            style={appStyles.StyleIconRightS}
            onPress={() => this.onPressSearch()}
          >
            <Icon
              style={[appStyles.IconsSearch, this.props.IconsSearch]}
              name={this.props.IconRightF}
            />
          </TouchableOpacity>
          {this.props.setLogout == true && (
            <TouchableOpacity
              style={appStyles.LogoutIconArea}
              onPress={() => this.Logout()}
            >
              <Icon
                style={appStyles.LogoutIcon}
                name="logout"
                type="AntDesign"
              />
            </TouchableOpacity>
          )}
        </Right>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    orderlistdata: state.order.orderlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => {
      dispatch({ type: ActionTypes.SHOWMODAL, showModal: true });
    },
    Logout: () => dispatch(userActions.logoutUser()),
    goBack: () => dispatch(NavigationActions.back()),
    orderlist: (id, status) =>
      dispatch(
        orderActions.orderlist({
          deliveryBoyId: id,
          orderStatus: status,
        })
      ),
    Updatedata: (Search) =>
      dispatch({ type: ActionTypes.ORDERLIST, data: Search }),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);
