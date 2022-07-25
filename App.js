import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image,Text, View } from 'react-native';

import React, { Component } from 'react';


function DisplayBook(props){
  return(
    <View>
    <Image
      style={styles.tinyLogo}
      source={{

        uri: props.link,
      }}
    />
    <Text style={styles.titleBook}>{props.title}</Text>
    <Text style={styles.titleBook}>{props.detail}</Text>

    </View>

  )
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      books: [],
      names: []
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
    const {books,names} = this.state
    const de = this.state.books.map((a,b)=>{
      // console.log(a['url'])
      console.log("Run")
     return (
       <DisplayBook style={styles.bookView} title={names[b]} link = {a["url"]} detail = {a["description"]}/>
      )
    })
      // console.log(books)
    return (
      <View style={styles.container}>

      {de}

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
        flexDirection: 'row'

  },
  bookShow: {
    borderWidth: 1,
  },
  tinyLogo: {
    width : 80,
    height: 100,
    margin: 20
  },
  titleBook: {
    fontSize: 20
  }
});
