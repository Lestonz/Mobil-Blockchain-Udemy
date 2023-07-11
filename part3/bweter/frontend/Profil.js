import { Linking, SafeAreaView, ScrollView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useMemo, useState} from 'react'
import { HeaderBar, TextButton } from '../components'
import { Avatar } from 'react-native-elements'
import { ContactData, COLORS, FONTS, SIZES } from '../constants'
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import Web3 from "web3";
import { TICKET_SMART_CONTRACT_ADDRESS, BWEET_SMART_CONTRACT_ADDRESS, YOUR_PROVIDER_LINK_SEPOLIA } from "../config";

const Profil = ({navigation}) => {
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [balance, setBalance] = useState(0)

  const web3Provider = useMemo(
      () => new Web3(new Web3(provider)), [provider]
  );

  const web3ContractProvider = useMemo(
    () => new Web3(new Web3.providers.HttpProvider(YOUR_PROVIDER_LINK_SEPOLIA)),[]
  )

  const disconnect = async () => {
    return provider?.disconnect()
  }

  const getMyBalance = async () => {
    const myBalance = await web3ContractProvider.eth.getBalance(address);
    const value = web3ContractProvider.utils.fromWei(myBalance, 'ether')

    setBalance(Number(value).toFixed(3))
  }

  useEffect(() => {
    getMyBalance()
  },[])
  
  const SocialsCard = () => {
    return (
      <View style={styles.socialsCard} >
      {
        ContactData.item.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.socialsPress}
              onPress={() => Linking.openURL(item.link ? `${item.linkAddress}`: null)}
            >
              <Image 
                source={item.logo}
                resizeMode="cover"
                style={{height: 40, width: 40}}
              />
              <Text style={styles.socialsText} >{item.text}</Text>
            </TouchableOpacity>
          )
        })
      }
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.main} >
      <HeaderBar />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container} >
          <View style={styles.card} >
            <View style={styles.cardUpper} >
              <View style={styles.textArea} >
                <Text style={styles.title} >Bakiye</Text>
                <Text style={styles.body} >{balance} ETH</Text>
              </View>
              <Avatar rounded size="medium" title={isConnected ? `${address.slice(address.length - 2).toUpperCase()}` : "LZ"} 
              containerStyle={isConnected ? { backgroundColor: `#${address.slice(address.length - 6)}`} : {backgroundColor: "#000"} } />
            </View>
            <View style={styles.textAreaSecond} >
            <Text style={styles.title} >Adres</Text>
                <Text selectable style={styles.body} >{address}</Text>
            </View>
          </View>
          {SocialsCard()}
        <TextButton 
          label="Giriş Bileti Al"
          customContainerStyle={styles.saleButton}
          onPress={() => navigation.navigate("Sales")}
        />
          <TextButton 
            label="Çıkış Yap !"
            customContainerStyle={styles.disconnectButton}
            onPress={() => disconnect().then(() => navigation.replace("Login"))}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profil

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff'
  },
  container: {
    display: 'flex',
    width: "100%",
    height: "75%",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:80,
  },
  card: {
    width: "90%",
    height: 200,
    backgroundColor: COLORS.primary,
    marginTop: "5%",
    borderRadius: SIZES.radius
  },
  cardUpper: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textArea: {
    width: "80%",
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: "10%"
  },
  textAreaSecond: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: "10%"
  },
  title: {
    color: COLORS.white,
    marginBottom: "2%",
    fontWeight: '700',
    ...FONTS.h2,
  },
  body: {
    color: COLORS.white,
    ...FONTS.m4
  },
  socialsCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    marginHorizontal: "5%",
    paddingHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 20,
    height: 200,
    borderWidth: 1,
    borderColor: COLORS.white,
    justifyContent: 'space-between',
    borderRadius: 25
  },
  socialsText: { 
    ...FONTS.m4, 
    marginLeft: 20, 
    color: COLORS.black 
  },
  socialsPress:{
    flex: 1,
    marginHorizontal: 10, 
    margin: 5, 
    alignItems: 'center', 
    flexDirection: 'row', 
    minWidth: '25%',
    maxWidth: 140,
  },
  disconnectButton:{
    backgroundColor:COLORS.red3
  },
  saleButton: {
    backgroundColor:COLORS.lightGreen,
    marginVertical:10,
  }
})