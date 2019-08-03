import React from 'react';
import { View, Text, TextInput } from 'react-native';
import layout from '../st/layout';
import text from '../st/text';
import { FButton } from './FButtons';
import { colors } from '../colors';
import input from '../st/input';


export const FInputPrompt = (props) => {
    const { title, ok='OK', cancel='CANCEL', cancelable, acceptable, value, inputHandler, type } = props;

    return (
        <View style={ {...layout.containerWhite, paddingTop: 100 } }>
            <Text style={ text.autoBlack }>{ title }</Text>

            <TextInput
                style={ input.inputText }
                value={ value }
                keyboardType={ type === 'phone'? 'phone-pad': 'name-phone-pad' }
                autoCapitalize='words'
                onChangeText={ text => inputHandler(text) }
            />

            <View style={ layout.columnSeparator }>
                <View style={ layout.column50 }>
                    <FButton
                        title={ cancel }
                        handler={ cancelable }
                        buttonStyles={{ width: '60%', borderRadius: 10 }}
                    />
                </View>

                <View style={ layout.column50 }>
                    <FButton
                        title={ ok }
                        handler={ acceptable }
                        buttonStyles={{ width: '60%', borderColor: colors.red, borderRadius: 10 }}
                        textStyles={{ color: colors.red }}
                    />
                </View>
            </View>
        </View>
    )
};