import React, { Component } from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';
import { FLoading } from '../../res/custom/FLoading';
import { colors } from '../../res/colors';
import layout from '../../res/st/layout';
import { FHeading } from '../../res/custom/FText';
import text from '../../res/st/text';
import { FImage } from '../../res/custom/FImages';
import { FButton } from '../../res/custom/FButtons';


export class HowTo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    render() {
        const { loading } = this.state;

        if(loading) return <FLoading loadingColor={ colors.purple } />

        else return (
            <ScrollView style={ {...layout.containerWhite, padding: 20 } }>
                <Display />
                <View style={ layout.padBottomWhite }></View>
            </ScrollView>
        )
    }
}


const Display = () => {
    const openEmail = () => {
        Linking.openURL('mailto:hannzjavas@gmail.com');
    };
    
    return (
        <View>
            <FHeading title='How To Use ID Recovery' headStyles={{ fontSize: 20 }} />
            <Text style={ text.leftBlack }>
                1. Navigate to the home tab and upload the photo of lost ID from the gallery or directly from the camera.
            </Text>
    
            <Text style={ text.boldBlack }>(a)</Text>
            <FImage source={ require('../../res/images/step1.png') }
            />
    
            <Text style={ text.boldBlack }>(b)</Text>
            <FImage source={ require('../../res/images/step6.png') }
                imageStyles={{ height: 490 }}
            />
    
            <Text style={ text.leftBlack }>
                2. Upload the selected photo to approve that it contains a human face in it, other wise,
                it's not an ID and you will be asked to upload another photo.
            </Text>
    
    
            <Text style={ text.boldBlack }>(c)</Text>
            <FImage source={ require('../../res/images/step3.png') }
            />
    
            <Text style={ text.leftBlack }>
                3. When a face is detected in the ID photo, the user can then search for the owner of the ID from the databse.
                If he is found, his profile and contact are returned thus he/she can be contacted.
            </Text>
    
            <Text style={ text.boldBlack }>(d)</Text>
            <FImage source={ require('../../res/images/step5.png') }
                imageStyles={{ height: 490 }}
            />

            <Text style={ text.leftBlack }>
                4. When the ID owner has been discovered, he can be contacted either by phone or email.
            </Text>
    
            <Text style={ text.boldBlack }>(e)</Text>
            <FImage source={ require('../../res/images/step7.png') }
                imageStyles={{ height: 490 }}
            />


            <View style={ layout.padBottomWhite }></View>
    
            <Text style={ text.boldBlack }>In Case You Need Help, Send Us An Email</Text>
            <FButton handler={ openEmail }
                title='send feedback'
                buttonStyles={{ width: '70%', borderColor: colors.purple }}
                textStyles={{ color: colors.purple }}
            />
    
        </View>
    )
}
