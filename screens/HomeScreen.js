import React from "react";
import {
    View,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import ProductCarousel from "./../components/ProductCarousel";
import { spacing } from "./../constants/Layout";

class HomeScreen extends React.Component {

    onPressButton = () => {
        this.props.navigation.navigate("Scan");
    }

    onLongPressButton = () => {
        this.props.navigation.navigate("Settings");
    }

    render() {
        const { screenProps: { getActiveProducts } } = this.props;
        const activeProducts = getActiveProducts();

        return (
            <View style={homeStyles.container}>
                <TouchableHighlight
                    underlayColor={"#fff"}
                    onLongPress={this.onLongPressButton}
                >
                    <View style={homeStyles.settings}></View>
                </TouchableHighlight>

                <ProductCarousel
                    data={activeProducts}
                    pagination={true}
                />

                <Button
                    buttonStyle={homeStyles.button}
                    titleStyle={homeStyles.buttonTitle}
                    title="ADD TO BACKPACK"
                    onPress={this.onPressButton}
                />
            </View>
        );
    }
}

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        padding: spacing.vertical.small,
        marginBottom: spacing.vertical.medium,
        marginHorizontal: spacing.horizontal.medium,
    },
    buttonTitle: {
        fontWeight: "bold"
    },
    settings: {
        padding: spacing.vertical.medium / 2
    }
});


export default HomeScreen
