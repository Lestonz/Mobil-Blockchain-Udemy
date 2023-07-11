import { SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import { TextButton } from '../components'
import {COLORS} from '../constants'
import Web3 from "web3";
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { TICKET_SMART_CONTRACT_ADDRESS, BWEET_SMART_CONTRACT_ADDRESS, YOUR_PROVIDER_LINK_SEPOLIA } from "../config";

import BweetContract from '../artifacts/contracts/BweetContract.sol/BweetContract.json'
import BweterTicket from '../artifacts/contracts/BweterTicket.sol/BweterTicket.json'

const AddBweet = ({navigation}) => {
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [content, setContent] = useState('')
  const [controller, setController] = useState(0);
  const web3ContractProvider = useMemo(
    () => new Web3(new Web3.providers.HttpProvider(YOUR_PROVIDER_LINK_SEPOLIA)),[]
  )
  const web3Provider = useMemo(
    () => new Web3( new Web3(provider) ), [provider]
  );

  const myBweetContract = new web3ContractProvider.eth.Contract(BweetContract.abi, BWEET_SMART_CONTRACT_ADDRESS )
  const myBweterTicket = new web3ContractProvider.eth.Contract(BweterTicket.abi, TICKET_SMART_CONTRACT_ADDRESS )

  const controlUser = async () => {
    try {
      const data = await myBweterTicket.methods.balanceOf(address, 1).call({from: address});
      setController(Number(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    controlUser()
  },[])

  const sendBweet = async () => {
    try {
      const data = await myBweetContract.methods.createBweet(content).encodeABI();

      const tx = {
        from: address, // Sender account address
        to: `${BWEET_SMART_CONTRACT_ADDRESS}`, // Recipient account address
        value: web3Provider.utils.toWei('0', 'gwei'), 
        gasPrice: web3Provider.utils.toWei('10', 'gwei'), // Gas price
        data: `${data}`, // Transaction data
      }
      const transaction = await web3Provider.eth.sendTransaction(tx);
      console.log('Transaction:', transaction);
     
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <SafeAreaView style={styles.main} >
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? "padding" : null} >
        <TextInput 
          multiline
          style={styles.textArea}
          onChangeText={(text) => setContent(text)}
          value={content.toString()}
        />
        <View style={styles.buttonArea} >
          <TextButton 
            customContainerStyle={styles.cancelButton}
            label="İptal"
            onPress={() => navigation.goBack()}
          />
          <TextButton 
            customContainerStyle={styles.sendButton}
            label="Bweet"
            onPress={sendBweet}
            disabled={controller == 0 ? true : false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddBweet

const styles = StyleSheet.create({
  main:{
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
  },
  keyboard:{
    flex: 1,
    marginBottom: '10%',
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start', 
  },
  textArea:{
    height:'50%',
    width:'90%',
    marginHorizontal:'5%'
  },
  buttonArea:{
    display:'flex',
    flexDirection:'row',
    width:'90%',
    marginHorizontal:'5%',
    marginVertical:'5%',
    justifyContent:'space-between',

  },
  cancelButton: {
    width:'45%',
    backgroundColor:COLORS.red
  },
  sendButton:{
    width:'45%'
  }
})