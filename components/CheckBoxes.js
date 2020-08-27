import React from 'react';
import { CheckBox } from 'react-native-elements';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';

export default function CheckBoxes(props) {
    console(this)
    return (
            
        <View key={item} style={{ padding: 5 }}>
            <CheckBox
                title={props.title}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10 }}
                checked={props.checked}
                onPress={() => props._loadData(prop.key)}
            />
        </View>

    );
}
