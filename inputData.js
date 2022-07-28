import {StyleSheet,TextInput, Image,Text, View, Dimensions, ScrollView, Button, Alert } from 'react-native';
import {styles} from './styles.js'
import React, { Component } from 'react';


export function InputIdea(props){
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
        props.idea.map((a)=><Text style={styles.titleBook}>{a}</Text>)
      }
      
      </ScrollView>
    </View>
  )
}
