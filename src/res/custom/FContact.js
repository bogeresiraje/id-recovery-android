import React from 'react';
import { View, Text } from 'react-native';
import { FIcon } from './FImages';
import { FText } from './FText';
import { FButton } from './FButtons';
import { colors } from '../colors';
import text from '../st/text';


export const FContact = (props) => {
    const { title, open, contact } = props;

    return (
        <View style={ layout.padded }>
            <View style={ layout.columnSeparator }>
                <View style={ layout.column20 }>
                    <FIcon source={ require('../../res/icons/gallery.png') } />
                </View>
                
                <View style={ layout.column80 }>
                    <FText title={ title }
                        textStyles={{ textAlign: 'left', fontWeight: 'bold' }}
                    /> 
                </View>
            </View>

            <FButton handler={ open }
                title={ contact }
                buttonStyles={{ borderWidth: 0, height: 20, marginTop: 0 }}
                textStyles={{ color: colors.purple, textAlign: 'left', paddingTop: 2, marginLeft: '5%' }}
            />
        </View>
    )
};


export const FContactStatic = (props) => {
    const { title, contact } = props;

    return (
        <View style={ layout.padded }>
            <View style={ layout.columnSeparator }>
                <View style={ layout.column20 }>
                    <FIcon source={ require('../../res/icons/gallery.png') } />
                </View>
                
                <View style={ layout.column80 }>
                    <FText title={ title }
                        textStyles={{ textAlign: 'left', fontWeight: 'bold' }}
                    /> 
                </View>
            </View>

            <Text style={{ ...text.autoBlack, color: '#000', fontWeight: 'bold', textAlign: 'left', marginLeft: 20 }}>
                { contact }
            </Text>
        </View>
    )
};
