import { SafeAreaView, StyleSheet, Text, Image, View } from 'react-native'
import React,{useMemo, useState} from 'react'
import { TextButton } from '../components'
import { COLORS, images } from '../constants'
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { TICKET_SMART_CONTRACT_ADDRESS, BWEET_SMART_CONTRACT_ADDRESS, YOUR_PROVIDER_LINK_SEPOLIA } from "../config";
import Web3 from "web3";

import BweterTicket from '../artifacts/contracts/BweterTicket.sol/BweterTicket.json'

const Sales = ({ navigation }) => {
    const { open, isConnected, address, provider } = useWalletConnectModal();

    const web3ContractProvider = useMemo(
        () => new Web3(new Web3.providers.HttpProvider(YOUR_PROVIDER_LINK_SEPOLIA)), []
    )
    const web3Provider = useMemo(
        () => new Web3(new Web3(provider)), [provider]
    );
    const myBweterTicket = new web3ContractProvider.eth.Contract(BweterTicket.abi, TICKET_SMART_CONTRACT_ADDRESS)

    const buyTicket = async () => {
        try {
          const data = await myBweterTicket.methods.mintForSale(1).encodeABI();
    
          const tx = {
            from: address, // Sender account address
            to: `${TICKET_SMART_CONTRACT_ADDRESS}`, // Recipient account address
            value: web3Provider.utils.toWei('0.01', 'ether'), 
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
        <SafeAreaView style={styles.main}>
            <Image
                source={images.NFTTicket}
                style={styles.image}
                resizeMode='contain'
            />
            <TextButton
                label="Giriş Bileti Al"
                onPress={buyTicket}
            />
            <TextButton
                customContainerStyle={styles.buttonBack}
                label="İptal"
                onPress={() => navigation.goBack()}
            />
        </SafeAreaView>
    )
}

export default Sales

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '90%',
    },
    buttonBack: {
        backgroundColor: COLORS.red,
        marginVertical: 10
    }

})