import React, { Component, Fragment } from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from "react-native";

const { width, height } = Dimensions.get("window");
import { Video } from 'expo-av';
import styled from "styled-components/native";
import { isMetaProperty } from "@babel/types";

const VideoScreen = (data) => {
    const item = data.product[0]

    return (

        <View>
            <Video
                source={require('../assets/videos/People-201.mp4')}
                rate={0.3}
                volume={1.0}
                isMuted={true}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.backgroundVideo}
            />

            <Wrapper style={styles.boxShadow}>
                <Logo
                    source={require("../assets/images/showpro.png")}
                    //width={50}
                    height={50}
                    resizeMode="contain"
                />
                <Title>{item.title}</Title>
                <TextDescription>
                    {item.description}
                </TextDescription>
                <ButtonWrapper>
                    <Fragment>
                        {/* <Button title="Add To Digital Backpack" onPress={() => this.props.navigate("Scan")} /> */}
                        <Button transparent title="Add Backpack" onPress={() => this.props.navigate("Scan")} />
                        {/* <Button transparent title="Login" /> */}
                    </Fragment>
                </ButtonWrapper>
            </Wrapper>
        </View>
    );
}

export default VideoScreen;

const styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 1,
    },

    featureBox:
    {
        flex: 5,
        borderTopColor: '#D6D6D6',
        borderTopWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    }
});

// styled-component

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;
export const Logo = styled.Image`
  max-width: 100px;
  width: 100px;
  height: 100px;
`;
export const TextDescription = styled.Text`
  letter-spacing: 3;
  color: #f4f4f4;
  text-align: center;
  text-transform: uppercase;
`;
export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
export const Title = styled.Text`
  color: #f4f4f4;
  margin: 50% 0px 20px;
  font-size: 30;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3;
`;
const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${props => (props.transparent ? "transparent" : "#f3f8ff")};
 padding:15px;
border:${props => (props.transparent ? "1px solid #f3f8ff " : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;
StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${props => (props.transparent ? "#f3f8ff " : "#666")};
`;

export const Button = ({ onPress, color, ...props }) => {
    return (
        <StyledButton {...props}>
            <StyledTitle {...props}>{props.title}</StyledTitle>
        </StyledButton>
    );
};
