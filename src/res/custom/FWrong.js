import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import layout from '../st/layout';
import text from '../st/text';
import { colors } from '../colors';
import { FButton } from './FButtons';


export const FWrong = ({ tryAgain, title='', titleColor='', btnTitle='', btnColor='' }) => {
    const titleText = title ? title : 'Something Went Wrong';
    const tColor = titleColor ? titleColor : colors.black;
    const buttonColor = btnColor ? btnColor : colors.black;
    const buttonTitle = btnTitle ? btnTitle : 'Try Again';

    return (
        <View style={ { ...layout.containerWhite, ...wrongStyle.style } }>
            <Text style={{ ...text.autoBlack, color: tColor }}>{ titleText }</Text>
            <FButton
                handler={ tryAgain }
                title={ buttonTitle }
                buttonStyles={{ borderColor: buttonColor, width: '50%' }}
                textStyles={{ color: buttonColor }}
            />
        </View>
    );
}


const wrongStyle = StyleSheet.create({
    style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
