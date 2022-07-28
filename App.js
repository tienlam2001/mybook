import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput, Image,Text, View, Dimensions, ScrollView, Button, Alert } from 'react-native';
import {InputIdea} from './inputData.js'
import React, { Component } from 'react';
import {styles} from './styles.js'




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
      <Button title ="See Detail" onPress ={(event)=>props.seeDetails({'bookName': props.title,'image':props.link,'idea':props.details},event)}/>

    </View>

  )
}



function AddBooks(props){
    return(
      <View style={styles.addBookSty}>
        <Text style = {styles.titleBook}> Add Books</Text>
        <TextInput
        style={styles.input}
        value = {props.bookName}
        placeholder="Book Name"
      />
      <TextInput
          style={styles.input}
          placeholder="url"
          value = {props.link}
        />
        <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        value ={props.descrip}
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
      renderAddBook: 1,
      bookName:'',
      myBookO:{}
    }
  }
  addBook(){

    this.setState({
      renderAddBook: 2,
    })
  }
  seeDetail(myBook,event){

    this.setState({
      renderAddBook: 3,
      myBookO:myBook
    })


  }
  componentDidMount(){
      fetch("https://nauticalautomaticirc.lamvan.repl.co/books")
    .then(req=>req.json())
    .then(res=>{


      keys = Object.keys(res)
      keys.map(a=>{

        this.setState({
          names: keys,
          books: [...this.state.books,res[a]],

        })
      })


    })
  }
  render(){
    const {books,names,renderAddBook, myBookO ,bookName} = this.state
    const de = this.state.books.map((a,b)=>{
      // console.log(a['url'])
     return (
       <DisplayBook style={styles.bookView} details={a["Idea"]} seeDetails={this.seeDetail.bind(this)} title={names[b]} link = {a["url"]} detail = {a["description"]}/>
      )
    })
    if(this.state.renderAddBook == 2){
      var addBookTemplate = <AddBooks/>
    }else if(this.state.renderAddBook == 1){
      var addBookTemplate = de
    }else if(this.state.renderAddBook == 3){
      var addBookTemplate = <InputIdea title={this.state.myBookO['bookName']} idea={this.state.myBookO['idea']} link ={this.state.myBookO['image']}/>
    }
      // console.log(books)
      console.log("Run")
    return (
      <View style={styles.container}>

      <ScrollView style= {styles.scroll}>
      {addBookTemplate}

      <View style={styles.buttonView}>
      <Button style={styles.buttonSty} title="Home" color="#f194ff" onPress={()=>{this.setState({renderAddBook: 1})}}/>
      <Button style={styles.buttonSty} title="Add My Book"  onPress={this.addBook.bind(this)}/>
      <Button style={styles.buttonSty} title="Add Book" color="#f194ff" onPress={()=>{console.log("de")}}/>

      </View>


      </ScrollView>

      </View>
    );
  }
}


function addMyBook(nameBook, link, description){
  //  add information through these form
  const formData = new FormData();

  formData.append('book', nameBook);
  formData.append('url', link);
  formData.append('idea', description);

  fetch('https://nauticalautomaticirc.lamvan.repl.co/add', {
    method: 'POST',
    body: formData,
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
