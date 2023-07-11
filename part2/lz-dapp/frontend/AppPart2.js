import { ScrollView, TextInput, Text, SafeAreaView, TouchableOpacity, View, Image, Linking } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { YOUR_PROVIDER_LINK_GOERLI, YOUR_SMART_CONTRACT_ADDRESS } from '../config';
import React, { useState, useEffect, useMemo } from 'react';
import { scheme } from 'expo'
import Web3 from 'web3';
import Clipboard from '@react-native-clipboard/clipboard';
import LestonzToken from '../artifacts/contracts/LestonzToken.sol/LestonzToken.json';


const appIcon = require('../assets/image/app-icon.png')

/** You should take a projectId and providerMetadata from walletconnect-v2 panel */
const projectId = 'Your_Project_ID';

const providerMetadata = {
  name: 'Lestonz',
  description: 'Lestonz DApp',
  url: 'https://react-web3wallet.vercel.app',
  icons: ['https://imagedelivery.net/_aTEfDRm7z3tKgu9JhfeKA/0c24a66f-00f0-4a6d-f4bd-efab7de7a200/lg'],
  redirect: {
    native: `${scheme}://`
  }
};

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
      ],
      chains: ['eip155:1'], // You should choose your network params.This is Ethereum Mainnet
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
  optionalNamespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
      ],
      chains: ['eip155:5'], // You should choose your network params.This is Ethereum Goerli
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
};


function App() {
  const { open, provider, isConnected, address } = useWalletConnectModal();
  const [tokenMiktari, setTokenMiktari] = useState("");
  const [aliciHesap, setAliciHesap] = useState("");
  const [readDataValue, setReadDataValue] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    bizimBakiye: ''
  });

  //For smartContract provider. If you are using testnet, you should use diffrent provider. 
  const web3ProviderContract = useMemo(
    () => new Web3(new Web3.providers.HttpProvider(YOUR_PROVIDER_LINK_GOERLI))
  )

  // For wallet connection provider
  const web3Provider = useMemo(
    () => new Web3(provider ? new Web3(provider) : new Web3.providers.HttpProvider(YOUR_PROVIDER_LINK_GOERLI)), [provider]
  );

  // For Smart Contract Uploding
  const myContract = new web3ProviderContract.eth.Contract(LestonzToken.abi, YOUR_SMART_CONTRACT_ADDRESS)



  const onCopy = (value) => {
    Clipboard.setString(value);
  };

  const connectYourWallet = async () => {
    return open();
  };

  const disconnectYourWallet = async () => {
    return provider?.disconnect();
  };

  const tokenGonder = async (miktar, adres) => {
    try {
      const deger = web3Provider.utils.toWei(miktar, "ether")
      const contractData = await myContract.methods.transfer(adres, deger).encodeABI()

      const tx = {
        from: address, // Sender account address
        to: `${YOUR_SMART_CONTRACT_ADDRESS}`, // Recipient account address
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

  const readData = async () => {
    if (myContract) {
      try {
        if (address.length < 1) {
          throw new Error('web3Provider not connected');
        }
        const name = await myContract.methods.name().call()
        const symbol = await myContract.methods.symbol().call()
        const totalSupply = await myContract.methods.totalSupply().call()
        const bakiye = await myContract.methods.balanceOf(`${address}`).call()
        console.log("bakiye", bakiye)

        const totalSupplyETH = web3Provider.utils.fromWei(totalSupply, "ether")
        const bakiyeETH = web3Provider.utils.fromWei(bakiye, "ether")
        console.log("bakiyeeth", bakiyeETH)
        setReadDataValue({
          name: name,
          symbol: symbol,
          totalSupply: totalSupplyETH,
          bizimBakiye: bakiyeETH,
        })

        console.log(readDataValue)
        return readDataValue;
      } catch (error) {
        console.log("Error from reading data", error)
      }
    } else {
      console.log("The contract could not be loaded or found.")
    }
  }

  const signMessage = async () => {

    if (!web3Provider) {
      throw new Error('web3Provider not connected');
    }
    const message = "Hello, welcome to Lestonz DApp! Do you want to connect this DApp?";
    await web3Provider.eth.personal.sign(message, address, " ");

  };

  useEffect(() => {
    myContract
    readData()
  }, [isConnected]);

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <Image
            source={appIcon}
            resizeMode="cover"
            style={{
              width: 60,
              height: 60,
              marginVertical: 10
            }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to Lz-DApp-V2</Text>
          <Text style={{ fontSize: 20, fontWeight: 'normal' }} >from Lestonz</Text>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000000',
              marginVertical: 10,
              borderRadius: 10
            }}
            onPress={() => Linking.openURL('https://lestonz.com')}
          >
            <Text style={{ color: '#fff', fontSize: 24 }} >
              LESTONZ
            </Text>
          </TouchableOpacity>
          {
            !isConnected ? (
              <TouchableOpacity
                style={{
                  width: '80%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#5396FF',
                  marginVertical: 10,
                  borderRadius: 10
                }}
                onPress={connectYourWallet}
              >
                <Text style={{ color: '#fff', fontSize: 24 }} >
                  Connect Your Wallet
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }} > Your Wallet Address </Text>
                <Text selectable style={{ fontSize: 20, fontWeight: 'normal', width: '80%', textAlign: 'center' }} >{address}</Text>
                <View style={{
                  display:'flex',
                  width:'90%',
                  borderRadius:10,
                  borderWidth:0.5,
                  justifyContent:'center',
                  alignItems:'center',
                  backgroundColor:'#DA9ECE',
                  marginVertical:10
                }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Token İsmi: {readDataValue.name}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Token Sembol: {readDataValue.symbol}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bizim Bakiye {readDataValue.bizimBakiye}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Supply: {readDataValue.totalSupply}</Text>
                </View>
                <View style={{
                  display:'flex',
                  width:'90%',
                  borderRadius:10,
                  borderWidth:0.5,
                  justifyContent:'center',
                  alignItems:'center',
                  backgroundColor:'#D6F4FF'
                }} >
                <TextInput
                  style={{ height: 60, borderWidth: 1, width: '80%', marginVertical: 10, borderRadius: 10, fontSize: 20, paddingHorizontal: 10 }}
                  onChangeText={(text) => setAliciHesap(text)}
                  value={aliciHesap.toString()}
                  placeholder="Bir Cüzdan Adresi Gir"
                />

                  <TextInput
                    style={{ height: 60, borderWidth: 1, width: '80%', marginVertical: 10, borderRadius: 10, fontSize: 20, paddingHorizontal: 10 }}
                    onChangeText={(text) => setTokenMiktari(text)}
                    value={tokenMiktari.toString()}
                    placeholder="Gönderilecek Miktarı"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={{
                      width: '80%',
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#963F74',
                      marginVertical: 10,
                      borderRadius: 10
                    }}
                    onPress={() => tokenGonder(tokenMiktari, aliciHesap)}
                  >
                    <Text style={{ color: '#fff', fontSize: 24 }} >Token Gönder</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    width: '80%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00BA00',
                    marginVertical: 10,
                    borderRadius: 10
                  }}
                  onPress={readData}
                >
                  <Text style={{ color: '#fff', fontSize: 24 }} >Veri Okuma</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '80%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00BAFF',
                    marginVertical: 10,
                    borderRadius: 10
                  }}
                  onPress={signMessage}
                >
                  <Text style={{ color: '#fff', fontSize: 24 }} >Sign In Message</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '80%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#DF0000',
                    marginVertical: 10,
                    borderRadius: 10
                  }}
                  onPress={disconnectYourWallet}
                >
                  <Text style={{ color: '#fff', fontSize: 24 }} >DISCONNECT</Text>
                </TouchableOpacity>
              </>
            )
          }
        </View>
      </ScrollView>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
        sessionParams={sessionParams}
        onCopyClipboard={onCopy}
      />
    </>
  )
}

export default App;