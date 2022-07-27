import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput, Image,Text, View, Dimensions, ScrollView, Button, Alert } from 'react-native';

import React, { Component } from 'react';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DisplayBook(props){
  return(
    <View style={styles.bookView} key ={props.title}>

      <Image
        style={styles.tinyLogo}
        source={{

          uri: props.link,
        }}
      />
      <View>
      <Text style={styles.titleBook}>{props.title}</Text>
      <Text style={styles.titleBook}>{props.detail}</Text>
      </View>

    </View>

  )
}

function InputData(props){
  return(
    <View>

    </View>
  )

}

function AddBooks(props){
    return(
      <View style={styles.addBookSty}>
        <Text style = {styles.titleBook}> Add Books</Text>
        <TextInput
        style={styles.input}
        placeholder="Book Name"
      />
      <TextInput
          style={styles.input}
          placeholder="url"
        />
        <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        placeholder="description"
      />
      </View>
    )
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      books: [],
      names: [],
      addBooks: false,
      renderAddBook: true,
    }
  }
  componentDidMount(){
    fetch("https://nauticalautomaticirc.lamvan.repl.co/books")
    .then(req=>req.json())
    .then(res=>{


      keys = Object.keys(res)
      keys.map(a=>{

        this.setState({
          names: keys,
          books: [...this.state.books,res[a]]
        })
      })


    })
  }
  render(){
    const {books,names,renderAddBook} = this.state
    const de = this.state.books.map((a,b)=>{
      // console.log(a['url'])
     return (
       <DisplayBook style={styles.bookView} title={names[b]} link = {a["url"]} detail = {a["description"]}/>
      )
    })
    if(this.state.renderAddBook){
      var addBookTemplate = <AddBooks/>
    }else{
      var addBookTemplate = de
    }
      // console.log(books)
      console.log("Run")
    return (
      <View style={styles.container}>

      <ScrollView>
      {addBookTemplate}
      <Button
        title="Press me"
        color="#841584"
        onPress={()=>{
          this.setState({
            renderAddBook: true
          })
        }}
      />

      </ScrollView>

      </View>
    );
  }
}




//  add information through these form
// const formData = new FormData();
//
// formData.append('book', 'Intelligent Investor');
// formData.append('url', 'https://target.scene7.com/is/image/Target/GUEST_4f0a0050-6cfc-4d02-9d14-7b9c26d8519b?wid=488&hei=488&fmt=pjpeg');
// formData.append('idea', 'Book give you the insight about investing');
//
// fetch('https://nauticalautomaticirc.lamvan.repl.co/add', {
//   method: 'POST',
//   body: formData,
// })
// .then((response) => response.json())
// .then((data) => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

const styles = StyleSheet.create({
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
        width:windowWidth - 2,
        justifyContent:'center',
        alignItems:'center',
        margin: 2

  },
  bookShow: {
    borderWidth: 1,
  },
  tinyLogo: {
    width : 80,
    height: 100,
    margin: 20,
    textAlign:'center'
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

  }
});
