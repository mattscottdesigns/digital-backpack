import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import ScanScreen from '../screens/ScanScreen';

const MainTabNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: ({ navigation }) => ({
				header: null,
			}),
		},

		Settings: {
			screen: SettingsScreen,
			navigationOptions: ({ navigation }) => ({}),
		},

		Confirmation: {
			screen: ConfirmationScreen,
			navigationOptions: ({ navigation }) => ({
				header: null,
			}),
		},

		Scan: {
			screen: ScanScreen,
			navigationOptions: ({ navigation }) => ({
				header: null,
			}),
		},
	},
	{
		initialRouteName: 'Settings',
		defaultNavigationOptions: {
			headerStyle: {
				height: 65,
			},
		},
	}
);

export default createAppContainer(MainTabNavigator);
