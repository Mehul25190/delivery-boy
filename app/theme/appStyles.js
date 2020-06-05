import { StyleSheet } from 'react-native';
import { Colors, Layout } from '../constants/';

export default StyleSheet.create({
containerProvider: {
    flexDirection: 'column',
    padding: 30,
  },
  backdrop: {
    backgroundColor: 'red',
    opacity: 0.5,
  },
  container: {
    flex: 1,
  
    justifyContent: 'flex-start',
   // backgroundColor: Colors.primary,
     backgroundColor: 'transparent',
     flexDirection: 'column',
  },
  headerLeft: {
    flex: 0,
    paddingLeft:0,
    width: 35,
    marginLeft:0,
    justifyContent:'flex-start',

  },
   menuBtn:{
    paddingLeft: 0,
    

  },
   menuBar:{
   fontSize:32
  },
  searchBar:{
    backgroundColor:'#fff',
    borderRadius:7,
    marginRight:8
   
  },
  statusBar:{
    flex: 1,
    height:Layout.statusBarHeight,
    backgroundColor:'transparent'
  },
   searchInput:{
    color:'#AAAAAA',
    fontSize:14,
    
  },
  headerTitle:{
    fontSize:18,
    color:Colors.white,
    fontFamily:'Font-Medium'
  },
    headersRight: {
    // backgroundColor:'#ddd',
    justifyContent:'center',
    paddingBottom:10,
    flex: 0,
    paddingLeft:15,
    paddingRight:3,
    width:95,
    textAlign:'center'
  },
  IconsRightT:{
    textAlign:'center',
    alignSelf:'center',
    width:40,
    paddingBottom:5
  },
  sortBlock:{
    paddingLeft:Layout.indent,
      paddingRight:Layout.indent,
      zIndex:99,
     position:'absolute',
       right:15,
     paddingRight:1,
     marginRight:1,
      
      borderRadius:5, 
      elevation: (Platform.OS === 'android') ? 10 : 0, 
      
       top:45,
      backgroundColor:'#D2EAD2',
      width:100,
      height:'auto',
      paddingBottom:5
  },
   IconsSearch:{
    color:Colors.white,

    
  },
     sortText:{
    fontFamily:'Font-Medium',
    color:Colors.gray,
    fontSize:14,
    lineHeight:20,
    paddingTop:5,
    textAlign:'left',

  },
   content:{
    marginTop: Layout.indent-7
  },
  contentBg:{
    backgroundColor: Colors.white,
    padding: Layout.indent,
    flex:1
  },
 addBox:{
    marginLeft:Layout.indent-6,
    marginRight:Layout.indent-6,
     height:'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    shadowColor: '#000000',
    shadowOffset: {
    width: 0,
    height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation:1
},
 btnSecontary:{
    backgroundColor: Colors.secondary,
    fontFamily: 'Font-Regular',
    borderRadius:20,
    marginLeft: Layout.indent,
    marginRight: Layout.indent,
    marginTop:20,
    fontSize:30,
    fontWeight:'bold'

  },
  redButton:{
   fontSize:22,
    
  fontFamily:'Font-Bold',
  textTransform:'capitalize'
  },
  LogoutIcon:{
    color:Colors.white,
    fontSize:20
  },
  LogoutIconArea:{
    paddingRight:Layout.indent,
    // backgroundColor:'#ddd',
    paddingBottom:5,
    paddingTop:10
  },
  StyleIconRightT:{
    paddingBottom:2
  },
  row: {
    flex: 1,
  },
  rowXYcenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowXcenter: {
    flex: 1,
    alignItems: 'center'
  },
  rowYcenter: {
    flex: 1,
    justifyContent: 'center',
  },
  IconGreen:{
    color:Colors.primary,fontSize:20,
    padding:5,
    margin:5
  },
  fontRegular:{
    fontFamily: 'Font-Regular',
  },
 
 
  IconStyle:{
    fontSize:20,
     color:Colors.primary
  },
  profileName:{
    color: Colors.black,
    fontSize: 18,

  },
  userCity:{
 fontSize: 12,
   fontFamily:'Font-Medium',
   lineHeight:17
  },
  userArea:{
     fontSize: 12,
     lineHeight:17,
     fontFamily:'Font-Medium'
  },
  profileEmail:{
    color: Colors.black,
    fontSize: 14,
        lineHeight:15
  },
  activeDrawerItem:{
    // backgroundColor: Colors.primaryLight
  },
  logo: {

  },
  headerLogo:{
    height: 40, 
    width: 120
  },
  loaderLogo: {
    height: 68, 
    width: 220
  },
  loginLogo: {
    marginTop: Layout.sixIndent,
    height: 68, 
    width: 220
  },
  loginMidText:{
    fontSize: 16,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
    marginTop: -Layout.doubleIndent,
    color:Colors.lightWhite
  },
  loginTitle:{
    fontSize: 30,
    color:Colors.black,
    marginLeft: Layout.indent,
    textAlign:'center',
    fontFamily: 'Font-Regular',
  },
  loginBack:{
    justifyContent:'flex-start',
   },
  loginBackIcon:{
    color: Colors.white,
 
  },
  BackIconTop:{
    flex:1,
    justifyContent:'flex-start',
    paddingTop:20
  },
  // Input
  itemInput:{
   height:45,
    backgroundColor:'#f8f8f8',
    borderRadius:15
  },
  textbox:{
    marginTop:3,
    padding:5,
    color: Colors.black,
    width:100,
    paddingLeft:Layout.indent,
    paddingRight:Layout.indent,
    fontFamily: 'Font-Regular',
    fontSize:16
  },
  inputError:{
    color: Colors.red,
    top:20,
    fontSize:12
  },
  
 
 
  userIcon:{
    paddingLeft:5
  },
 
  
  StyleIconRightS:{
    paddingTop:10,

    paddingLeft:10,
    paddingRight:Layout.indent-5
  },
   IconRight:{
   textAlign:'center',
   alignSelf:'center',
   width:40,

  },

 
  headerRight: {
    
   flex: 0,
    paddingLeft:15,
    paddingRight:3,
    width:58,
    textAlign:'center'
  },
  
  headerStyle:{
    backgroundColor:Colors.primary,
    height:70,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    zIndex:99
  },
  categoryStyles: {
   
    backgroundColor: '#fff',
},

 


  /* CheckBox */
     
    

    /* Slideshow*/
    
});