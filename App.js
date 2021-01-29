import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image } from 'react-native';
import SearchScreen from "./screens/searchScreen";
import TransactionScreen from "./screens/bookTransactionScreen";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";

export default function App() {
  return (
    <AppContainer/>    
  );
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: TransactionScreen},
  Search: {screen: SearchScreen},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
      if(routeName === "Transaction"){
        return(
          <Image
          source={require("./assets/book.png")}
          style={{width:40, height:40}}
        />
        )
        
      }
      else if(routeName === "Search"){
        return(
          <Image
          source={require("./assets/searchBook.png")}
          style={{width:40, height:40}}
        />)
        
      }
    }
  })
}
);

const AppContainer = createAppContainer(TabNavigator)


