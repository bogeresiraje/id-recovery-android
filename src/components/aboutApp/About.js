import React, { Component } from 'react';
import {ScrollView, View, Linking, Text } from 'react-native';
import layout from '../../res/st/layout';
import { FIcon } from '../../res/custom/FImages';
import { FHeading, FText } from '../../res/custom/FText';
import { FButton } from '../../res/custom/FButtons';
import { colors } from '../../res/colors';
import text from '../../res/st/text';
import { FContact } from '../../res/custom/FContact';


export class About extends Component {

    _openEmail = () => {
        const url = 'mailto:hannzjavas@gmail.com';
        Linking.canOpenURL(url)
            .then(supported => {
                if(supported){
                    return Linking.openURL(url);
                } else {
                    alert(supported)
                }
            })
            .catch((err) => alert(err.toString()))
    };

    _openPhone = () => {
        const url = 'tel:+256770703204';
        Linking.canOpenURL(url)
            .then(supported => {
                if(supported){
                    return Linking.openURL(url);
                } else {
                    alert(supported)
                }
            })
            .catch((err) => alert(err.toString()))
    };

    render() {
        return (
            <ScrollView>
                <View style={{ ...layout.containerWhite, padding: 15 }}>
                    <Text style={ text.leftBlack }>
                        <Text style={ text.boldBlack }>ID Recovery </Text>
                        is an Mobile Application developed and maintained by
                        <Text style={ text.boldBlack }> Morini LLC, </Text>
                        a ligh-weight software company located at
                        College of Computing and Information Sciences, Makerere University.
                    </Text>

                    <Text style={ text.leftBlack }>
                        It is aimed at enabling individuals who lose their Identity Cards easily identify them.
                    </Text>

                    <FHeading title='Feel Free to Contact Us'
                        headStyles={{ fontSize: 20, textAlign: 'left' }}
                    />

                    <FContact title='Email' open={ this._openEmail } contact='hannzjavas@gmail.com' />
                    <FContact title='Phone' open={ this._openPhone } contact='+256 770703204' />
                </View>
            </ScrollView>
        )
    }
}
