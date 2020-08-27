import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, Dimensions, Image } from 'react-native';
import {
	responsiveFontSize,
	responsiveLineHeight,
	spacing,
	viewport,
} from './../constants/Layout';
class ProductCarousel extends React.Component {
	state = {
		activeSlide: 0,
	};

	renderItem({ item, index }) {
		return (
			<View style={carouselStyles.container}>
				<View style={carouselStyles.imageContainer}>
					<Image
						source={{ uri: item.backgroundImage }}
						style={carouselStyles.image}
					/>
				</View>

				<View style={carouselStyles.textContainer}>
					<Text style={carouselStyles.title}>{item.title}</Text>
					<Text style={carouselStyles.description}>{item.description}</Text>
				</View>
			</View>
		);
	}

	renderCarousel = () => {
		const { data } = this.props;

		return (
			<Carousel
				data={data}
				renderItem={this.renderItem}
				sliderWidth={viewport.width}
				itemWidth={viewport.width}
				slideStyle={carouselStyles.slide}
				onSnapToItem={index => this.setState({ activeSlide: index })}
			/>
		);
	};

	renderPagination = () => {
		if (this.props.pagination) {
			return (
				<Pagination
					dotsLength={this.props.data.length}
					activeDotIndex={this.state.activeSlide}
					dotStyle={paginationStyles.dot}
					containerStyle={paginationStyles.container}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
				/>
			);
		}
	};

	render() {
		const RenderedCarousel = this.renderCarousel;
		const RenderedPagination = this.renderPagination;

		return (
			<View style={carouselStyles.container}>
				<RenderedCarousel />
				<RenderedPagination />
			</View>
		);
	}
}

export const carouselStyles = {
	container: {
		flex: 1,
	},
	slide: {
		width: viewport.width,
	},
	imageContainer: {
		flex: 1,
	},
	image: {
		position: 'absolute',
		top: 0,
		right: spacing.horizontal.medium,
		left: spacing.horizontal.medium,
		bottom: spacing.vertical.small,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,.1)',
	},
	textContainer: {
		paddingHorizontal: spacing.horizontal.large,
		paddingBottom: spacing.vertical.medium,
		alignSelf: 'center',
	},
	title: {
		fontSize: responsiveFontSize({ max: 40, min: 22 }),
		fontWeight: 'bold',
		marginBottom: 10,
	},
	description: {
		fontSize: responsiveFontSize({ max: 22, min: 16 }),
		lineHeight: responsiveLineHeight({ max: 22, min: 16 }),
	},
};

const paginationStyles = {
	container: {
		paddingTop: 0,
		paddingBottom: spacing.vertical.medium,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 8,
		backgroundColor: 'rgba(0, 0, 0, 0.92)',
	},
};

export default ProductCarousel;
