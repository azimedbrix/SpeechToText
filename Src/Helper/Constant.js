
import React from 'react'
import { Dimensions } from 'react-native'


export default {

    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,

    ImgBackgroundColor: '#2ADEA9',
    backColor: '#F9F9F9',
    whiteColor: "#fff",
    redColor: 'red',
    bgColor: '#F4F4F4',
    lightGreen: '#1CCF9A24',
    extraLightBackground: '#EEFFFA',
    appColor: '#4A26A5',

    ClassList: [],

    headerStyle: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    headerTextStyle: {
        fontFamily: "Poppins-Regular",
        fontWeight: '600',
        fontSize: 17,
        color: '#041C4F',
        paddingLeft: 20
    },
    headerLeftPanel: { flex: 10, paddingLeft: 0, flexDirection: 'row', alignItems: 'center' },
    headerLeftImage: { width: 15, height: 15,marginLeft:10 },
    headerRightPanel: { flex: 5, paddingRight: 10, flexDirection: 'row', alignItems: 'center'},

    shadoww: {
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOpacity: 1,
        elevation: 2,
    },

    //Fonts
    PoppinsRegular: "Poppins-Regular",
    PoppinsBold: "Poppins-Bold",
    PoppinsMedium: "Poppins-Medium",
    PoppinsSemiBold: "Poppins-SemiBold",

    //Keys
    APIKEY: "QVBAMTIjMllIRC1TREFTNUQtNUFTRksyMjE4Nw==",
    SECRETKEY: "MjQ1QDEyIzJZSEQtODVEQTJTM0RFQTg1Mz1JRTVCNEE1ODc=",

    //Test2AP&SECRETKEY
    T2APIKEY: "QVBAMTIjMllIRC1TREFTNUQtNUFTRksyMjE4Nw==",
    T2SECRETKEY: "MjQ1QDEyIzJZSEQtODVEQTJTM0RFQTg1Mz1JRTVCNEE1ODc=",

    //Common API and Secret KEy 
    CAPIKEY: "QVBAMTIjMllIRC1TREFTNUQtNUFTRksyMjEhZWRicml4QDE4",
    CSECRETKEY: "MjQ1QDEyIzJZSEQtODVEQTJTM0RFQTg1Mz1JRTVCNEE1IWVkYnJpeEAxOA==",

    fontStyle500: {
        fontFamily: "Poppins-Regular",
        fontWeight: '500',
        color: '#374965'
    },



    searchboxInputStyle: { backgroundColor: "#EBEFF6", },
    leftIconContainerStyle: { paddingLeft: 10 },
    searchboxstyle: { fontFamily: "Poppins-Regular", paddingHorizontal: 10, paddingVertical: 10, fontSize: 12, backgroundColor: "#EBEFF6" },


    profilePhoto: "",
    userName: "",
    Email: '',
    SchoolName: '',

    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.15,
        shadowRadius: 1.5,
        elevation: 3
    },


    mainView: {
        //flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    textInputStyle:
    {
        borderRadius: 5,
        height: 45,
        width: Dimensions.get("screen").width / 2,
        backgroundColor: "#FFFFFF",
        //padding: 10,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,

    },
    SectionStyle: {
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F7F8FD',
        //paddingHorizontal: 15,
        //marginHorizontal: 20

    },

    fontStyleWhiteText: {
        fontFamily: "Poppins-Regular",
        fontWeight: '500',
        color: "white",
    },
    NewmaiView: {
        // backgroundColor:"red",
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        //marginHorizontal:20
    },
    NewInputStyle: {
        //borderColor: "#e5e5e5",
        borderColor: "#e5e5e5",
        backgroundColor:'#FFFFFF',
        borderWidth:0.8,
        borderRadius: 5,
        height: 45,
        width: Dimensions.get("screen").width / 1.07,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        marginTop:10

        // marginHorizontal:50
    },

    LoginSingUpButton:{
        backgroundColor:'#4A26A5',
        width: Dimensions.get("screen").width / 1.2,
        height: Dimensions.get("screen").height / 15,
        borderRadius:12
        
    }

}