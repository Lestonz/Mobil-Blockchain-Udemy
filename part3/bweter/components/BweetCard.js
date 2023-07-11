import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, SIZES, COLORS, FONTS } from '../constants'
import { Avatar } from 'react-native-elements'
import moment from 'moment/moment'
import TextButton from './TextButton'



const BweetCard = ({firstPress, secondPress, text, like, address, time }) => {

  const [fullText, setFullText] = useState(false)
  const maxCharacter = 200;

  const showMore = () => {
    return (
      <TouchableOpacity onPress={() => setFullText(!fullText)} >
          <Text style={styles.moreText} >{fullText ? "Daha Az Göster" : "Daha Fazla Göster"}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.main} >
      <View style={styles.likeArea}  >
        <Text style={styles.likeText}  >{like}</Text>
        <Image
          source={icons.like}
          style={styles.likeIcon}
          resizeMode='contain'
        />
      </View>
      <View style={styles.infoArea}  >
        <Avatar rounded size="medium" title={`${address.slice(address.length - 2).toUpperCase()}`} 
          containerStyle={{ backgroundColor: `#${address.slice(address.length - 6)}` }} />
        <Text style={styles.infoText} >{address.slice(0,12)}...{address.slice(address.length - 12)}</Text>
      </View>
        <View style={styles.textArea} >
        {
          text.length > maxCharacter && !fullText ? (
            <>
              <Text style={styles.textBody} > {text.slice(0, maxCharacter) + "..."} </Text>
              {showMore()}
            </>
          ) : (
            <>
              <Text style={styles.textBody}>{text}</Text>
              {text.length > maxCharacter ? showMore() : null}
            </>
          )
        }
        </View>
        <View style={styles.timeArea} >
          <Text style={styles.timeText} >{moment(time).locale('tr').fromNow()}</Text>
        </View>
        <View style={styles.buttonArea} >
          <TextButton 
            label="Bahşiş"
            customContainerStyle={styles.firstButton}
            onPress={firstPress}
          />
          <TextButton 
            label="Beğen"
            customContainerStyle={styles.secondButton}
            onPress={secondPress}
          />
        </View>
    </View>
  )
}

export default BweetCard

const styles = StyleSheet.create({
  main: {
    width: '90%',
    height: 'auto',
    borderWidth: 0.6,
    borderRadius: SIZES.radius,
    marginVertical: 10,
    flexDirection: 'column'
  },
  likeArea: {
    height: 30,
    backgroundColor: COLORS.primary,
    width: '40%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    marginBottom: 2,
    flexDirection: 'row'
  },
  likeText: {
    ...FONTS.body3,
    color: COLORS.white
  },
  likeIcon: {
    height: 20,
    marginHorizontal: 10
  },
  infoArea: {
    marginHorizontal: '5%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2
  },
  infoText: {
    ...FONTS.m5,
    color: COLORS.gray,
  },
  textArea: {
    marginHorizontal: '5%',
    width: '90%',
    marginVertical: '2%'
  },
  textBody: {
    ...FONTS.body4,
    textAlign: 'left'
  },
  moreText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  timeArea: {
    marginHorizontal: '5%',
    width: '90%',
    borderBottomWidth: 0.3,
    borderColor: COLORS.gray,
    marginBottom: '2%'
  },
  timeText: {
    ...FONTS.body5,
    color: COLORS.blue
  },
  buttonArea:{
    display:'flex',
    flexDirection:'row',
    width:'90%',
    marginHorizontal:'5%',
    marginVertical:'2%',
    justifyContent:'space-between',
  },
  firstButton:{
    backgroundColor:COLORS.dark,
    width:'45%',
    height:40
  },
  secondButton:{
    width:'45%',
    height:40
  }
})