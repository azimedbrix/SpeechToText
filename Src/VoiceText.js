import Voice from 'react-native-voice';
import React, { Component } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { View, TextInput, Text, Modal, Pressable, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native'
import RNUpiPayment from 'react-native-upi-payment'

export default class VoiceText extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {
          
        }
    }
  componentDidMount(){

  }

  CallPayment = () =>  {
    RNUpiPayment.initializePayment({
      vpa: 'john@upi', // or can be john@ybl or mobileNo@upi
      payeeName: 'John Doe',
      amount: '1',
      transactionRef: 'aasf-332-aoei-fn'
    }, this.successCallback.bind(this), this.failureCallback.bind(this));
  }

  successCallback = () => {

  }

  failureCallback = () => {

  }

    render() {
        return (

            <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
             <Pressable onPress={()=> this.CallPayment()}>
             <Text>UPI Paymnets</Text>
             </Pressable>
            </View>

        )
    }

}
