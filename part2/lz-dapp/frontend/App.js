import { ScrollView, TextInput, Text, SafeAreaView, TouchableOpacity, View, Image, Linking } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { YOUR_PROVIDER_LINK_GOERLI, YOUR_SMART_CONTRACT_ADDRESS } from '../config';
import React, { useState, useEffect, useMemo } from 'react';
import { scheme } from 'expo'
import Web3 from 'web3';
import Clipboard from '@react-native-clipboard/clipboard';
import LestonzGame from '../artifacts/contracts/LestonzGame.sol/LestonzGame.json';


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
  const [seninSayin, setSeninSayin] = useState("");

  const [readDataValue, setReadDataValue] = useState({
    oyunAktifMi: false,
    girisUcreti: '',
    totalOdul: '',
    sansliSayi: ''
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
  const myContract = new web3ProviderContract.eth.Contract(LestonzGame.abi, YOUR_SMART_CONTRACT_ADDRESS)



  const onCopy = (value) => {
    Clipboard.setString(value);
  };

  const connectYourWallet = async () => {
    return open();
  };

  const disconnectYourWallet = async () => {
    return provider?.disconnect();
  };

  const oyunOyna = async (_sayi) => {
    try {
    
      const contractData = await myContract.methods.oyunOyna(_sayi).encodeABI();
      const girisUcreti = await myContract.methods.girisUcreti().call();

  
 
      const tx = {
        from: address, // Sender account address
        to: `${YOUR_SMART_CONTRACT_ADDRESS}`, // Recipient account address
        value: `${girisUcreti}`, 
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
        const oyunKontrol = await myContract.methods.oyunAktifMi().call()
        const ucret = await myContract.methods.girisUcreti().call()
        const totalOdul = await myContract.methods.totalKasa().call()
        const sansliSayi = await myContract.methods.sansliSayi().call()
        console.log("bakiye", ucret)

        const totalOdulETH = web3Provider.utils.fromWei(totalOdul, "ether")
        const ucretETH = web3Provider.utils.fromWei(ucret, "ether")
     
        setReadDataValue({
          oyunAktifMi: oyunKontrol,
          girisUcreti: ucretETH,
          totalOdul: totalOdulETH,
          sansliSayi: sansliSayi,
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
                  backgroundColor:'#E8762F',
                  marginVertical:10
                }}>
                    <Text style={{ fontSize: 18, }}> <Text style={{fontWeight: 'bold' }} >Toplam Ödül Miktari: </Text>{readDataValue.totalOdul} ETH</Text>
                    <Text style={{ fontSize: 18,  }}><Text style={{fontWeight: 'bold' }} >Oyun Giriş Ücreti: </Text>{readDataValue.girisUcreti} ETH</Text>
                    <Text style={{ fontSize: 18,  }}><Text style={{fontWeight: 'bold' }} >Son Şanslı Sayi: </Text>{readDataValue.sansliSayi}</Text>
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
                    onChangeText={(text) => setSeninSayin(text)}
                    value={seninSayin}
                    placeholder="Göndereceğin Şanslı Sayı"
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
                    onPress={() => oyunOyna(seninSayin)}
                  >
                    <Text style={{ color: '#fff', fontSize: 24 }} >Oyun Oyna</Text>
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
                  <Text style={{ color: '#fff', fontSize: 24 }} >Yenile</Text>
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