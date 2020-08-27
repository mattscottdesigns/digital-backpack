import * as React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { viewport } from "./../constants/Layout";

const ScanScreen = (props) => {

    const { permission, setPermission } = props.screenProps;

    const getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setPermission(status === 'granted');
    };

    const handleBarCodeScanned = ({ type, data }) => {
        props.navigation.replace('Confirmation', {
            scannedString: data,
            badgeType: type,
        });
    }

    if (permission) {
        return (
            <View style={scanStyles.container}>
                <BarCodeScanner
                    type={BarCodeScanner.Constants.Type.front}
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <Text style={scanStyles.scanText}>Scan Your Badge</Text>
                <View style={scanStyles.cancelContainer}>
                    <Text
                        onPress={() => props.navigation.navigate('Home')}
                        style={scanStyles.cancel}>
                            Cancel
                    </Text>
                </View>
            </View>
        )
    } else {
        getPermissionsAsync();
    }

    return false
}

export const scanStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    cancelContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cancel: {
        fontSize: viewport.width * 0.05,
        textAlign: 'center',
        width: '100%',
        color: 'white',
        paddingBottom: 30
    },
    scanText: {
        fontSize: viewport.width * 0.05,
        textAlign: 'center',
        width: '100%',
        color: 'white',
        paddingTop: 40
    },
});

export default ScanScreen;
