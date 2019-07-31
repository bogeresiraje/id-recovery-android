import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import layout from '../st/layout';
import text from '../st/text';
import { colors } from '../colors';


export const FLoading = ({ title='Loading', loadingColor=colors.black }) => {
    const loadingText = title + '...';

    return (
        <View style={ {...layout.containerWhite, ...loadStyle.style } }>
            <Text style={ { ...text.autoBlack, color: loadingColor }}>{ loadingText }</Text>
            <ActivityIndicator size='small' color={ loadingColor } />
        </View>
    );
}

const loadStyle = StyleSheet.create({
    style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
