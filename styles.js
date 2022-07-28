import { StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  scroll:{
    marginTop: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookView: {
        display:'flex',
        flexDirection: 'column',
        borderWidth:2,
        borderColor:"#7fffd4",
        width:windowWidth - 2 ,
        justifyContent:'center',
        alignItems:'center',
        margin: 2,
        borderRadius:15


  },
  bookShow: {
    borderWidth: 1,
  },
  tinyLogo: {
    width : 80,
    height: 100,
    margin: 20,

  },
  buttonSty:{
    width: windowWidth / 3,
    height: 90,
    borderColor: '#737373',
    backgroundColor: "red",
    borderWidth: 2,

  },
  titleBook: {
    fontSize: 20,
    textAlign:'center',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  addBookSty:{
      flex: 1,
      height: windowHeight,
      justifyContent:'center',
      alignItems: 'center'

  },
  buttonView:{
    display:'flex',
    width:windowWidth,
    height: 100,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'

  }
});
