import React from "react";
import {Text,View,TouchableOpacity,StyleSheet,Image} from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";
import { TextInput } from "react-native-gesture-handler";
import db from "../config";



export default class TransactionScreen extends React.Component{

    constructor(){
        super()
            this.state={
                hasCameraPermissions:null,
                scanned:false,
                scannedData:"",
                buttonState:"normal",
                scannedBookId:"",
                scannedStudentId:"",
            }
        
    }

    getCameraPermissions= async (id)=>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA)
      this.setState ({
          hasCameraPermissions:status==="granted",
          buttonState:id,
          scanned:false
      })
    }

    handleBarcodeScanned= async ({type,data})=>{
      if(this.state.buttonState==="bookId"){
        this.setState({
          scanned:true,
          scannedBookId:data,
          buttonState:"normal"
        })
      }

      else if(this.state.buttonState==="studentId"){
        this.setState({
          scanned:true,
          scannedStudentId:data,
          buttonState:"normal"
        })
      }
    }

    handleTransaction = async ()=>{
      db.collection("books").doc(this.state.scannedBookId).get()
      
    }



    render(){
      const hasCameraPermissions=this.state.hasCameraPermissions
      const scanned=this.state.scanned
      const buttonState=this.state.buttonState

        if(buttonState!=="normal"&&hasCameraPermissions===true){
          return(
            <BarCodeScanner onBarCodeScanned={scanned?undefined
            :this.handleBarcodeScanned} style={StyleSheet.absoluteFillObject}/>
          )
        }
        else if(buttonState==="normal")
        {
        return(
          <View style={styles.container}>
            <View>
              <Image source={require("../assets/booklogo.jpg")} style={{width:200 , height:200}}/>
              <Text style={{textAlign:"center" , fontSize:30}}>
                WILY
              </Text>
            </View>
            <View style={styles.inputView}>
               <TextInput styles={styles.inputBox} placeholder="Book ID" 
                                   onChangeText={(text)=>{
                                       this.setState({
                                         scannedBookId:text
                                       })  
                                   }}
                                   value={this.state.scannedBookId}/>

               <TouchableOpacity style={styles.scanButton} onPress={()=>{
                 this.getCameraPermissions("bookId")
               }}>
                  <Text style={styles.buttonText}>
                    SCAN
                  </Text>
               </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
               <TextInput styles={styles.inputBox} placeholder="Student ID" 
                                   onChangeText={(text)=>{
                                       this.setState({
                                         scannedStudentId:text
                                       })  
                                   }}
                                   value={this.state.scannedStudentId}/>

               <TouchableOpacity style={styles.scanButton} onPress={()=>{
                 this.getCameraPermissions("studentId")
               }}>
                  <Text style={styles.buttonText}>
                    SCAN
                  </Text>
               </TouchableOpacity>
            </View>

           <TouchableOpacity style={styles.submitButton}>
               <Text styles={styles.submitButtonText}>
                 SUBMIT
               </Text>
           </TouchableOpacity>
          </View>
        )
          }
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  buttonText:{
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10
  },
  inputView:{
    flexDirection: 'row',
    margin: 20
  },
  inputBox:{
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20
  },
  scanButton:{
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0
  },
  submitButton:{
    backgroundColor: '#FBC02D',
    width: 100,
    height:50,
    justifyContent:"center",
    alignItems:"center"
  },
  submitButtonText:{
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight:"bold",
    color: 'white'
  }
});