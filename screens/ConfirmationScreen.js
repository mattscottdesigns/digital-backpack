import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { sendMail } from '../config/Api';
import {
	responsiveFontSize,
	responsiveLineHeight,
	spacing,
} from './../constants/Layout';
import LottieView from 'lottie-react-native';

class ConfirmationScreen extends React.Component {
	state = {
		isValid: false,
		loading: true,
		message: '',
		name: '',
		registrant: undefined,
	};

	parseBadge = scannedString => {
		const { screenProps } = this.props;
		const type = scannedString.indexOf('^') > -1 ? 1 : 0;
		const split = type === 1 ? '^' : '$';
		const metadata = scannedString.split(split);
		const selectedTitles = JSON.stringify(screenProps.getActiveProductTitles());

		return {
			type: type,
			items: selectedTitles,
			badge: metadata[0],
			showcode: metadata[1],
			firstname: metadata[2],
			lastname: metadata[3],
			company: 'Convention Data Services',
		};
	};

	componentDidMount() {
		const badge = this.parseBadge(
			this.props.navigation.state.params.scannedString
		);

		sendMail(badge).then(result => {
			this.setState({
				isValid: result.isValid,
				message: result.msg || result.message,
				registrant: badge,
				loading: false,
			});
		});
	}

	render() {
		const { isValid, loading, message, registrant } = this.state;
		const { navigation } = this.props;

		if (loading) {
			return (
				<View style={confirmStyles.content}>
					<LottieView
						source={require('../assets/lottie/loading.json')}
						autoPlay
						loop
					/>
					<Text
						onPress={() => navigation.navigate('Home')}
						style={confirmStyles.loadingText}>
						Finding Registrant...
					</Text>
				</View>
			);
		}

		if (!isValid && !loading) {
			return (
				<View style={confirmStyles.container}>
					<View style={confirmStyles.content}>
						<LottieView
							resizeMode={'cover'}
							source={require('../assets/lottie/error.json')}
							autoPlay
							loop={false}
							speed={2}
							style={{ height: 150, width: 150 }}
						/>
					</View>
					<View style={confirmStyles.content}>
						<Text style={confirmStyles.subtitle}>{message}</Text>
					</View>
					<View style={confirmStyles.errorButtonContainer}>
						<Button
							title={'TRY AGAIN'}
							buttonStyle={confirmStyles.errorButtonStyle}
							titleStyle={confirmStyles.errorButtonTitle}
							onPress={() => {
								navigation.navigate('Scan');
							}}
						/>
					</View>
				</View>
			);
		}

		if (isValid && !loading) {
			setTimeout(() => {
				navigation.navigate('Home');
			}, 5000);

			return (
				<View style={confirmStyles.container}>
					<View style={confirmStyles.content}>
						<LottieView
							source={require('../assets/lottie/check-mark.json')}
							autoPlay
							loop={false}
							speed={0.5}
						/>
					</View>

					<View style={confirmStyles.content}>
						<Text style={confirmStyles.title}>
							{registrant.firstname + ' ' + registrant.lastname}
						</Text>
						<Text style={confirmStyles.subtitle}>Thank you for visiting!</Text>
						<Text style={confirmStyles.text}>
							This product has been added to your digital backpack. Check your
							email for a link to your backpack.
						</Text>
					</View>

					<View style={confirmStyles.content}>
						<LottieView
							source={require('../assets/lottie/loading.json')}
							autoPlay
							loop
						/>
						<Text
							onPress={() => navigation.navigate('Home')}
							style={confirmStyles.loadingText}>
							Redirecting....
						</Text>
					</View>
				</View>
			);
		}
	}
}

export const confirmStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	content: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	errorButtonStyle: {
		padding: spacing.vertical.small,
		width: 300,
		backgroundColor: 'red',
	},
	errorButtonContainer: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	errorButtonTitle: {
		fontWeight: 'bold',
	},
	title: {
		fontSize: responsiveFontSize({ max: 40, min: 22 }),
		fontWeight: 'bold',
		textAlignVertical: 'center',
		paddingBottom: 10,
	},
	subtitle: {
		fontSize: responsiveFontSize({ max: 22, min: 18 }),
		fontWeight: 'bold',
		textAlignVertical: 'center',
		paddingBottom: 20,
	},
	text: {
		fontSize: responsiveFontSize({ max: 22, min: 16 }),
		lineHeight: responsiveLineHeight({ max: 22, min: 16 }),
		textAlign: 'center',
		maxWidth: '80%',
	},
	loadingText: {
		color: '#9c9c9c',
		fontSize: responsiveFontSize({ max: 22, min: 16 }),
		marginTop: 50,
	},
});

export default ConfirmationScreen;
