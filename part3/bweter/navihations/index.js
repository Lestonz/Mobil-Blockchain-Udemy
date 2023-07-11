import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Profil, Chat } from '../frontend'
import { icons, COLORS } from '../constants'
import { Image } from 'react-native'


const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left:0,
                right:0,
                elevation:0,
                backgroundColor:COLORS.white,
                height:70,
                paddingTop:20,
                borderTopLeftRadius:30,
                borderTopRightRadius:30,
                borderTopWidth:2,
                borderRightWidth:2,
                borderLeftWidth:2,
                borderTopColor:COLORS.primary
            }
        }}
    >   
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
                tabBarIcon: ({focused}) => (
                    <View 
                        style={{
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        <Image 
                            source={icons.home}
                            resizeMode='contain'
                            style={{
                                width:35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}          
                        />
                    </View>
                )
            }}
        />
                <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
                tabBarIcon: ({focused}) => (
                    <View 
                        style={{
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        <Image 
                            source={icons.chat}
                            resizeMode='contain'
                            style={{
                                width:35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}          
                        />
                    </View>
                )
            }}
        />
                <Tab.Screen
            name="Profil"
            component={Profil}
            options={{
                tabBarIcon: ({focused}) => (
                    <View 
                        style={{
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        <Image 
                            source={icons.profil}
                            resizeMode='contain'
                            style={{
                                width:35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}          
                        />
                    </View>
                )
            }}
        />

    </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({})