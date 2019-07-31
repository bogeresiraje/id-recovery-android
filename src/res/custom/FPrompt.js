import React from 'react';
import { View, Text } from 'react-native';
import layout from '../st/layout';
import text from '../st/text';
import { FButton } from './FButtons';
import { colors } from '../colors';


export const FPrompt = ({ title, subTitle="", cancelable, acceptable }) => {
    return (
        <View style={ {...layout.containerWhite, paddingTop: 100 } }>
            <Text style={ text.autoBlack }>{ title }</Text>
            <Text style={ text.autoBlack }>{ subTitle }</Text>

            <View style={ layout.columnSeparator }>
                <View style={ layout.column50 }>
                    <FButton
                        title='CANCEL'
                        handler={ cancelable }
                        buttonStyles={{ width: '60%', borderRadius: 10 }}
                    />
                </View>

                <View style={ layout.column50 }>
                    <FButton
                        title='OK'
                        handler={ acceptable }
                        buttonStyles={{ width: '60%', borderColor: colors.red, borderRadius: 10 }}
                        textStyles={{ color: colors.red }}
                    />
                </View>
            </View>
        </View>
    )
};
