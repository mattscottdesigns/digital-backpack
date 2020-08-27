import React from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from '@expo/vector-icons/FontAwesome';
import { responsiveFontSize, spacing } from './../constants/Layout';

class SettingsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: () => (
				<Text style={[settingStyles.text, settingStyles.status]}>Settings</Text>
			),
			headerLeft: (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Home');
					}}>
					<Text style={[settingStyles.text, settingStyles.status]}>
						<Icon name='chevron-left' size={18} />
					</Text>
				</TouchableOpacity>
			),
		};
	};

	render() {
		const { products, toggleProduct } = this.props.screenProps;
		const settings = products.map((item, key) => {
			return (
				<View key={key} style={settingStyles.checkbox}>
					<CheckBox
						title={item.title}
						size={30}
						textStyle={settingStyles.text}
						checked={item.active}
						onPress={() => toggleProduct(item.id)}
					/>
				</View>
			);
		});

		return <ScrollView style={settingStyles.container}>{settings}</ScrollView>;
	}
}

export const settingStyles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: spacing.vertical.small / 2,
	},
	status: {
		padding: 20,
	},
	text: {
		fontSize: responsiveFontSize({ max: 20, min: 16 }),
	},
	checkbox: {
		padding: spacing.vertical.small / 2,
	},
	padding: {
		padding: spacing.horizontal.medium,
	},
});

export default SettingsScreen;
