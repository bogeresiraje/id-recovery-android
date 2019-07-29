import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FIcon } from './FImages';
import layout from '../st/layout';
import { colors } from '../colors';


export const FButton = ({ onPress, title='Submit', buttonStyles={}, textStyles={} }) => (
    <TouchableOpacity style={ { ...button.style, ...buttonStyles } } onPress={ () => onPress() } >
        <Text style={ { ...text.style, ...textStyles } }>{ title }</Text>
    </TouchableOpacity>
);


export const FIconButton = ({ onPress, source='', buttonStyles={}, iconStyles={} }) => (
    <TouchableOpacity style={ { ...icon.style, ...iconStyles } } onPress={ () => onPress() } >
        <FIcon source={ source } />
    </TouchableOpacity>
);


export const FImageButton = ({ onPress, title='Submit', source='', buttonStyles={}, textStyles={} }) => (
    <TouchableOpacity style={ { ...button.style, ...buttonStyles } } onPress={ () => onPress() } >
        <View style={ layout.columnSeparator } >
            <View style={ layout.column40 }>
                <FIcon source={ source } />
            </View>

            <View style={ layout.column60 } >
                <Text style={ { ...text.style, ...textStyles } }>{ title }</Text>
            </View>
        </View>
    </TouchableOpacity>
);


const button = StyleSheet.create({
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


const text = StyleSheet.create({
    style: {
        width: '100%',
        textAlign: 'center',
        color: colors.black,
        paddingTop: 7,
        paddingBottom: 2,
    }
});


// For Icon button
const icon = StyleSheet.create({
    style: {
        alignSelf: 'center',
        margin: 10,
    }
});
