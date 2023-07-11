import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native';
import { COLORS, icons } from '../constants';


const HeaderBar = ({leftPress}) => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header} >
        <StatusBar style={styles.status}/>
        <View style={styles.container} >
            <TouchableOpacity style={styles.textPress} onPress={leftPress} >
                <Image 
                    source={icons.bweterText}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addPress} onPress={() => navigation.navigate('AddBweet')} >
                <Image
                    source={icons.add}
                    style={styles.addButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default HeaderBar

const styles = StyleSheet.create({
    header:{
        height:40,
        width:'100%',
        borderBottomWidth:2,
        borderBottomColor:COLORS.primary
    },
    status: {
        backgroundColor:COLORS.white
    },
    container:{
        display:'flex',
        height:'100%',
        width:'100%',
        paddingHorizontal:'5%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'stretch'
    },
    textPress: {
        width:'50%',
        alignItems:'flex-start'
    },
    addPress: {
        width:'50%',
        alignItems:'flex-end'
    },
    addButton:{
        height:35,
        width:35
    }
})