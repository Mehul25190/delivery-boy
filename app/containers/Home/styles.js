import {Colors,Layout} from '../../constants/';
export default {
   MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },
IconsRightT:{
    fontSize:16,
    color:'#fff',
    borderColor:'#fff',
    width:25,
    alignItems:'center',
    height:25,
    justifyContent:'center',
   textAlign:'center',
    borderWidth:1,
    borderRadius:50,
    // backgroundColor: '#ddd',
    padding:3,
    alignSelf:'center',
    marginLeft:0,
    marginRight:5,
    paddingBottom:5,
    flexDirection:'row',
    transform: [{rotate: '90deg'}], 
  },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
   photo: {
     flex:1,
    width: null,
    height: null,
    resizeMode: 'contain',
      justifyContent: 'flex-end',
      flexDirection:'column',
      marginTop:50,
      marginLeft:Layout.indent
     
  },

AlignLeft:{
  justifyContent:'flex-start'
},
AlignRight:{
  justifyContent:'flex-end'
},

  
  itemStyle:{
    // marginTop: 5
    marginLeft:0
  },
  loginBox: {
    marginTop: -Layout.indent,
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
  },
  midText:{
    fontSize: 18,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
  },
  linkTextBtn:{
    marginTop:Layout.indent
  },
  linkText:{
    textTransform:'capitalize',
    color: Colors.white,
    fontSize:16,

  },
  button: {
    backgroundColor: Colors.secondary,
  },
  formMsg: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'center',
    backgroundColor: "rgba(0,0,0,0)"
  },
  linky: {
    color: 'blue',
    paddingTop: 10
  },
 


/* Product Lsit page*/

  proImage:{
    textAlign:'left',
    marginLeft:5,
    width:80,
    height:80,
    resizeMode:'contain',
   },
   ListLeft:{
   
    flex: 0,
    paddingLeft:0,
    width: 90,
    
   },
   ListRight:{
    // backgroundColor:'#ddd',
    flex: 0,
    paddingLeft:0,
    width: 80,
    marginRight:0
    
   },
   ListItems:{
   
    paddingTop:5,
    paddingBottom:5,
    marginLeft:Layout.indent-7,
    marginRight:Layout.indent-7,
    paddingRight:Layout.indent-7
   },
   prodInfo:{
    textAlign:'left'
   },
   proTitle:{
    textAlign:'left'
   },
   proPrice:{
    fontSize:25
   },
   proQuanitty:{
    fontSize:12
   },
   buyButton:{
    backgroundColor:'#F8BB1B',
    justifyContent: 'center',
      alignItems: 'center',
    textAlign:'center',
    alignSelf:'center',
   paddingLeft:0,
   paddingRight:0,
   width:90,
   height:25,
   marginTop:10
   },
   buyText:{
    alignSelf:'center',
    textAlign:'center',
    fontSize:12,
    color:Colors.secondary
   }
};