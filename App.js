import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image,Text, View, Dimensions, ScrollView } from 'react-native';

import React, { Component } from 'react';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DisplayBook(props){
  return(
    <View style={styles.bookView}>

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

function addBooks(props){
    return(
      <View>
        <TextInput
        style={styles.input}
        placeholder="Book Name"
        value={text}
      />
      <TextInput
          style={styles.input}
          placeholder="url"
          value={text}
        />
        <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        placeholder="description"
        value={text}
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
      addBooks: False,
    }
  }
  addBook(){

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
    const {books,names} = this.state
    const de = this.state.books.map((a,b)=>{
      // console.log(a['url'])
     return (
       <DisplayBook style={styles.bookView} title={names[b]} link = {a["url"]} detail = {a["description"]}/>
      )
    })
      // console.log(books)
      console.log("Run")
    return (
      <View style={styles.container}>

      <ScrollView>
      {de}
      </ScrollView>

      </View>
    );
  }
}

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
        alignItems:'center'

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
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
