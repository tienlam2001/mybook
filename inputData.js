import {RefreshControl, StyleSheet,TextInput, Image,Text, View, Dimensions, ScrollView, Button, Alert } from 'react-native';
import {styles} from './styles.js'
import React, { Component, useEffect} from 'react';


export function InputIdea(props){
  const [idea,onChangeIdea] = React.useState("de")
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = React.useState([])
  const [state,isInsert] = React.useState(false)

  useEffect(()=>{
    fetch("https://nauticalautomaticirc.lamvan.repl.co/books")
    .then(req=>req.json())
    .then(res=>setRefresh(res[props.title]['Idea']))

  })



  return(
    <View style={styles.bookView}>
      <Text style={styles.titleBook}>{props.title}</Text>
      <Image
        style={styles.tinyLogo}
        source={{

          uri: props.link,
        }}
      />
      <ScrollView>
      {
        refresh.map((a)=><Text style={styles.titleBook}>{a}</Text>)
      }
        <TextInput
          style={styles.input}
          onChangeText={onChangeIdea}
          placeholder="Idea"
          value={idea}

        />
        <Button title="Enter" onPress={()=>{
          addIdea(idea,props.title)
          isInsert(true)
        }}/>
      </ScrollView>
      {state ? (<Text>Success</Text>) : (<Text>no action</Text>)}

    </View>
  )
}


function addIdea(idea,nameBook){
  const formData = new FormData();

  formData.append('idea', idea);

  fetch('https://nauticalautomaticirc.lamvan.repl.co/handle/' + nameBook, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
  });
}
