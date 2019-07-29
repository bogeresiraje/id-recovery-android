import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../colors';
import text from '../st/text';


// Custom heading
export const FHeading = ({ title='text', headStyles={} }) => (
    <Text style={ { ...head.style, ...headStyles } }>{ title }</Text>
);


// Custom Text
export const FText = ({ title='text', textStyles={} }) => (
    <Text style={ { ...customText.style, ...textStyles } }>{ title }</Text>
);

// Display error text in case field is required, and not filled out
export const NullInputAlert = ({ title='This Field Is Required', nullField, value }) => {
    if(nullField){
        if(value){
            return null;
        } else {
            return <Text style={ text.autoRed }>{ title }</Text>
        }
    } else {
        return null;
    }
}

// For displaying string text if present
export const TextAlert = ({ value, title }) => {
    if(value) {
        return <Text style={ text.autoRed }>{ title }</Text>;
    } else {
        return null;
    }
};

// For heads
const head = StyleSheet.create({
    style: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#555',
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'center',
    }
});


// For normal texts
const customText = StyleSheet.create({
    style: {
        width: '100%',
        textAlign: 'center',
        color: colors.black,
        paddingTop: 7,
        paddingBottom: 2,
    }
});
