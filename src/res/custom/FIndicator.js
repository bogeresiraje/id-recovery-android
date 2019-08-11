import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../colors';


export const FIndicator = ({ vStyles={}, bColor='#ffffff', color='#888888' }) => {
    return (
        <View style={{ ...styles.style, ...vStyles, backgroundColor: bColor, borderColor: bColor }} >
            <ActivityIndicator style={{ paddingTop: 5 }} size='small' color={ color } />
        </View>
    );
};


const styles = StyleSheet.create({
    style: {
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        padding: 3,
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: colors.black,
    }
});

export default FIndicator;
