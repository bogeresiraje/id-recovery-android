import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../colors';


// Custom heading
export const FIcon = ({ source, iconStyles={} }) => (
    <Image
        style={ { ...icon.style, ...iconStyles } }
        source={ source }
    />
);


// Image
export const FImage = ({ source, imageStyles={} }) => (
    <Image
        style={ { ...image.style, ...imageStyles } }
        source={ source }
    />
);


// Image
export const FImageClickable = ({ handler, source, imageStyles={} }) => (
    <TouchableOpacity
        onPress={ () => handler() }
    >
        <Image
            style={ { ...image.style, ...imageStyles } }
            source={ source }
            resizeMode='contain'
            resizeMethod='resize'
        />
    </TouchableOpacity>
);



// Styles for icon
const icon = StyleSheet.create({
    style: {
        height: 24,
        width: 24,
        alignSelf: 'center',
        marginTop: 5,
        tintColor: colors.black,
    }
});


// Styles for image
const image = StyleSheet.create({
    style: {
        width: '100%',
        height: 300,
        borderWidth: 1,
        borderColor: colors.mediumBlack,
        marginTop: 5,
    },
})
