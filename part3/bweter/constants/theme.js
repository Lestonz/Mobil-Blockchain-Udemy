import { Dimensions } from "react-native";

const {width, height} = Dimensions.get("window");

export const COLORS = {
    primary: "#673FB4",
    secondary: "#E77A23",    // Gray
    backColar: "#Ffeed2",
    lightPurple: '#7B789F',
    purple: "#595683",
    yellow: '#F1CD7C',
    lightYellow: '#FFD88A',
    blue:'#5396FF',
    white: "#fff",
    white1: "#F1E6D8",
    green: "#00B42D",
    lightGreen: "#7EBDA2",
    lightGreen2: '#BED2BB',
    red: "#F60000",
    red2: "#FF7363",
    red3: "#DF0000",
    black: "#404040",
    dark:"#010101",
    gray: "#6E6E6E",
    gray1: "#363636",
    gray2: "#4B4B4B",
    gray3: "#4D4D4D",
    lightGray: "#D9D9D9",
    lightGray2: '#f1f1f1',
    lightGray3: '#d1d0d0',
    pink: '#D993B4',
    lightPink: '#F3DEE8',

    transparentWhite: 'rgba(255, 255, 255, 0.2)',
    transparentBlack: 'rgba(0, 0, 0, 0.4)',
    transparent: 'transparent',
}

export const SIZES = {
    base: 8,
    font: 14,
    radius: 10,
    padding: 10,

    //font sizes
    h1: 30, 
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
    m1: 30,
    m2: 24,
    m3: 20,
    m4: 18,
    m5: 16,
    m6: 14,
    m7: 12,

    // app dimensions
    width,
    height,
}

export const FONTS = {
    h1:{ fontFamily: "Poppins-Bold", fontSize: SIZES.h1, lineHeight: 30},
    h2: {  fontFamily: "Poppins-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Poppins-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Poppins-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "Poppins-Bold", fontSize: SIZES.h5, lineHeight: 22 },

    body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1, lineHeight: 20 },
    body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4, lineHeight: 20 },
    body5: {  fontFamily: "Poppins-Regular", fontSize: SIZES.body5, lineHeight: 22 },

    m1: { fontFamily: "Poppins-Medium", fontSize: SIZES.m1, lineHeight: 50 },
    m2: { fontFamily: "Poppins-Medium", fontSize: SIZES.m2, lineHeight: 36 },
    m3: { fontFamily: "Poppins-Medium", fontSize: SIZES.m3, lineHeight: 32 },
    m4: { fontFamily: "Poppins-Medium", fontSize: SIZES.m4, lineHeight: 30 },
    m5: { fontFamily: "Poppins-Medium", fontSize: SIZES.m5, lineHeight: 22 },
    m6: { fontFamily: "Poppins-Medium", fontSize: SIZES.m6, lineHeight: 22},
    m7: { fontFamily: "Poppins-Medium",  fontSize: SIZES.m7, lineHeight: 20 },
}

const appTheme = {COLORS, SIZES, FONTS}

export default appTheme