import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useEffect, useMemo, useState} from 'react'
import { HeaderBar, TextButton } from '../components'
import { COLORS, FONTS, icons } from '../constants'
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { TICKET_SMART_CONTRACT_ADDRESS, BWEET_SMART_CONTRACT_ADDRESS, YOUR_PROVIDER_LINK_SEPOLIA } from "../config";
import Web3 from "web3";
import BweterTicket from '../artifacts/contracts/BweterTicket.sol/BweterTicket.json'
import axios from 'axios';
import { Avatar } from 'react-native-elements';


const Chat = () => {
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [controller, setController] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const web3ContractProvider = useMemo(
      () => new Web3(new Web3.providers.HttpProvider(YOUR_PROVIDER_LINK_SEPOLIA)), []
  )
  const web3Provider = useMemo(
      () => new Web3(new Web3(provider)), [provider]
  );
  const myBweterTicket = new web3ContractProvider.eth.Contract(BweterTicket.abi, TICKET_SMART_CONTRACT_ADDRESS)

  const controlUser = async () => {
    try {
      const data = await myBweterTicket.methods.balanceOf(address, 1).call({from: address});
      setController(Number(data))
      console.log(controller)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    controlUser()
  },[])


  const sendMessage = async () => {
    setMessages([...messages, {text: newMessage, isUser: true}])
    setNewMessage('')
    console.log(newMessage)
    await axios.post("https://api.openai.com/v1/chat/completions", {
      prompt: newMessage,
      model: "text-davinci-003",
      max_tokens: 300,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': 'Bearer Your_Open_AI_ID'
      }
    }).then(response => {
      console.log(response.data.choices)
      const responseMessage = response.data.choices[0].text;
      setMessages([...messages, {text: newMessage, isUser: true}, {text: responseMessage, isUser: false}])
      setNewMessage('')
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <SafeAreaView style={styles.main} >
        <HeaderBar
        leftPress={controlUser}
        />
        <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? "padding" : null} >
            <FlatList 
              data={messages}
              style={{width:'100%'}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                item.isUser ? (
                  <View style={styles.userText} >
                    <Text selectable={true}  style={styles.userTextBody} >{item.text}</Text>
                    <Avatar rounded size="small" title={isConnected ? `${address.slice(address.length - 2).toUpperCase()}` : null} 
                      containerStyle={{ backgroundColor: `#${address.slice(address.length - 6)}` }} />
                  </View>
                ) : (
                  <View style={styles.aiArea} >
                    <Avatar rounded  size="small" 
                      containerStyle={{backgroundColor: COLORS.red}}
                      source={icons.lzLogo}
                    />
                      <Text selectable={true}  style={styles.aiTextBody} >{item.text}</Text>
                  </View>
                )
              ) }
            />
            
            
            <View style={styles.textArea} >
              <TextInput style={styles.inputText} 
                onChangeText={(text) => setNewMessage(text)}
                value={newMessage}
                placeholder='Birşeyler Sor!'
                multiline
              />
              <TextButton
                label="Sor"
                customContainerStyle={styles.sendButton}
                onPress={sendMessage}
                disabled={controller == 0 ? true : false}
              />
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff'
  },
  keyboard: {
    flex: 1,
    marginBottom: '10%',
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end', 
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    paddingHorizontal: "5%",
    backgroundColor: COLORS.white,
    marginBottom:25
  },
  inputText: {
    height: 60,
    borderWidth: 0.6,
    borderColor: COLORS.lightGray,
    width: '80%',
    marginVertical: 10,
    borderRadius: 10,
    ...FONTS.body3
  },
  sendButton: {
    width: '20%',
    marginLeft: '1%'
  },
  userText: {
    alignSelf:'flex-end',
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:'5%',
    paddingLeft:'15%'
  },
  userTextBody: {
    ...FONTS.body4,
    paddingHorizontal: 10,
    textAlign:'right'
  },
  aiArea:{
    alignSelf:'flex-start',
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:'5%',
    paddingRight:'15%',
    marginBottom:15
  },
  aiTextBody: {
    ...FONTS.body4,
    paddingHorizontal: 10,
    color:COLORS.primary
  }
})