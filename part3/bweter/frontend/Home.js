import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useMemo, useState} from 'react'
import { BweetCard, HeaderBar, TextButton } from '../components'
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { TICKET_SMART_CONTRACT_ADDRESS, BWEET_SMART_CONTRACT_ADDRESS, YOUR_PROVIDER_LINK_SEPOLIA } from "../config";
import Web3 from "web3";

import BweetContract from '../artifacts/contracts/BweetContract.sol/BweetContract.json'

const Home = () => {
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [allBweet, setAllBweet] = useState([]);

  const web3ContractProvider = useMemo(
    () => new Web3(new Web3.providers.HttpProvider(YOUR_PROVIDER_LINK_SEPOLIA)),[]
  )
  const web3Provider = useMemo(
    () => new Web3( new Web3(provider) ), [provider]
  );

  const myBweetContract = new web3ContractProvider.eth.Contract(BweetContract.abi, BWEET_SMART_CONTRACT_ADDRESS )
  
    const loadBweet = async () => {
      try {
        const coreData = await myBweetContract.methods.getAllBweets().call({from: address});

        const items = await Promise.all(coreData.map(async i => {

            let item = {
              id: i[0],
              author: i[1],
              content: i[2],
              like: i[3],
              time: i[4]
            }
            return item
        }))
        setAllBweet(items)
      } catch (error) {
        console.log(error)
      }
    }

    const sendEther = async (author) => {
      try {

      
        const tx = {
          from: address, // Sender account address
          to: `${author}`, // Recipient account address
          value: web3Provider.utils.toWei('10000000', 'gwei'), // Amount to be sent (0.01 ether)
          gasPrice: web3Provider.utils.toWei('10', 'gwei'), // Gas price
          data: '0x', // Transaction data
        };
  
        const transaction = await web3Provider.eth.sendTransaction(tx);
        console.log('Transaction:', transaction);
  
      } catch (error) {
        console.log('Error from Send ETH:', error);
      }
    };

    const likeBweet = async (id) => {
      try {
        const contractData = await myBweetContract.methods.likeBweet(id).encodeABI()
        const tx = {
          from: address, // Sender account address
          to: `${BWEET_SMART_CONTRACT_ADDRESS}`, // Recipient account address
          value: web3Provider.utils.toWei('0', 'gwei'), // Amount to be sent (0.01 ether)
          gasPrice: web3Provider.utils.toWei('10', 'gwei'), // Gas price
          data: `${contractData}`, // Transaction data
  
        };

   
        const transaction = await web3Provider.eth.sendTransaction(tx);
        console.log('Transaction:', transaction);
  
      } catch (error) {
        console.log("Error from writing data:", error);
      }
    };

  useEffect(() => {
    loadBweet()
  }, [])
 
  return (
    <SafeAreaView style={styles.main}  >
      <HeaderBar 
        leftPress={loadBweet}
      />
      <View style={styles.container} >
        <FlatList 
          data={allBweet}
          keyExtractor={(item, index) => index.toString()}
          inverted
          style={{
            width:'100%',
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.bweetArea} >
                <BweetCard 
                  text={item.content}
                  address={item.author}
                  like={item.like}
                  // time={item.time}
                  firstPress={() => sendEther(item.author)}
                  secondPress={() => likeBweet(item.id)}
                />
              </View>
            )
          }}
        />


      </View>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff'
  },
  container:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom:80
  },
  bweetArea:{
    justifyContent:'center',
    alignItems:'center'
  }
})