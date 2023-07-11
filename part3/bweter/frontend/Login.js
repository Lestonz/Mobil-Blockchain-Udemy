import { SafeAreaView, StyleSheet, StatusBar, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import {  useWalletConnectModal } from '@walletconnect/modal-react-native';
import { COLORS, icons, images } from '../constants'
import { TextButton } from '../components'

const Login = ({navigation}) => {
    const { open, provider, isConnected } = useWalletConnectModal();

    const connectYourWallet = async () => {
        return open();
    };

    const loginControl = () => {
        try {
            if(isConnected) {
                navigation.replace("HomeTabs")
            }
        } catch (error) {
            console.log("Giris hatasi.",error)
        }
    }

    useEffect(()=> {
        loginControl()
    }, [isConnected])

  return (
    <SafeAreaView style={styles.main} >
        <StatusBar style={styles.status} />
        <Image 
            source={icons.bweter}
        />
        <Image 
            source={images.welcomeText}
        />
        <TextButton 
            label="Giriş Yap!"
            // onPress={() => navigation.replace("HomeTabs")}
            onPress={connectYourWallet}
            customContainerStyle={styles.entryButton}
        />
        <Image 
            source={icons.lzLogo}
        />
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor:COLORS.primary,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'column'
    },
    status: {
        backgroundColor:COLORS.primary,
    },
    entryButton:{
        backgroundColor:COLORS.dark
    }
})