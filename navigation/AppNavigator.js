import React from 'react';
import data from '../config/products.json';
import MainTabNavigator from './MainTabNavigator';
import { StatusBar } from 'react-native';

class AppNavigator extends React.Component {
	static router = MainTabNavigator.router;

	state = {
		products: [],
		permission: false,
	};

	componentDidMount = () => {
		StatusBar.setHidden(true);

		this.setState({
			products: data,
		});
	};

	setPermission = permission => {
		this.setState({ permission: permission });
	};

	getActiveProductTitles = () => {
		const titles = [];

		this.state.products.forEach(product => {
			if (product.active) {
				titles.push(product.title);
			}
		});

		return titles;
	};

	getActiveProducts = () => {
		return this.state.products.filter(product => {
			if (product.active) {
				return product;
			}
		});
	};

	toggleProduct = id => {
		this.setState(state => {
			state.products = state.products.map(product => {
				if (product.id === id) {
					product.active = !product.active;
				}
				return product;
			});

			return state;
		});
	};

	render = () => {
		const { navigation } = this.props;

		if (this.state.products.length > 0) {
			return (
				<MainTabNavigator
					navigation={navigation}
					screenProps={{
						...this.state,
						toggleProduct: this.toggleProduct.bind(this),
						getActiveProducts: this.getActiveProducts.bind(this),
						getActiveProductTitles: this.getActiveProductTitles.bind(this),
						setPermission: this.setPermission.bind(this),
					}}
				/>
			);
		} else {
			return false;
		}
	};
}

export default AppNavigator;
