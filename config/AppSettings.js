import React from 'react';
import { Alert } from 'react-native';

export async function getSettings(){
    try{
        let values = await AsyncStorage.getItem('appSettings');
        let json = JSON.parse(values);
        return json;
    }
    catch(error){
        Alert.alert('Error', 'Error encountered loading app data.');
    }
}

export async function clearSettings(){
    try{
        await AsyncStorage.clear('appSettings');
    }
    catch(error){
        Alert.alert('Error', 'Error encountered clearing app data.');
    }
}

//load config file
export async function loadSettings(data){
    console.load('loaded');
    try {
        await AsyncStorage.setItem('appSettings', JSON.stringify(data))
            .then(() => this.setState(data))
            .then(() => this.props.navigation.navigate('Settings'))
          

    } catch (error) {
        Alert.alert('Error', 'Error saving app data.' + error);
    }
};


export async function retrieveData(){
    try{
      let values = await AsyncStorage.getItem('appSettings');
      let json = JSON.parse(values);
      return json;
    }
    catch(error){
      Alert.alert('Error', 'Error encountered loading app data.');
    }
  }