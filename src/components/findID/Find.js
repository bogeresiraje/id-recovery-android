import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { LoadingIndicator } from '../helper/LoadingIndicator';
import { FHeading } from '../../res/custom/FText';
import { FImageButton, FButton } from '../../res/custom/FButtons';
import { FImage } from '../../res/custom/FImages';
import layout from '../../res/st/layout';
import { colors } from '../../res/colors';
import { permissionsAllowed } from '../../data/auth';


export class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            somethingWrong: false,
            picture: null,
        };
    }

    // Take photo from camera
    _takePicture = async () => {
        const access = permissionsAllowed();
        if(access){
            // If permissions granted, open Camera
            ImagePicker.launchCamera({}, response => {
                if(response.didCancel){
                    // If cancelled, do nothing
                } else if(response.error){
                    // If error happened, do nothing
                } else{
                    // Save photo in state
                    this.setState({ picture: response });
                }
            })
        }
    };

    // Choose photo from gallery
    _choosePicture = async () => {
        const access = permissionsAllowed();
        if(access){
            // If permissions granted, open Image Library
            ImagePicker.launchImageLibrary({}, response => {
                if(response.didCancel){
                    // If caancelled, do nothing

                } else if(response.error){
                    // If error happened, do nothing

                } else{
                    // Save photo in state
                    this.setState({ picture: response });
                }
            })
        }
    };

    // In case user cancels an uploaded image
    _resetPicture = () => {
        this.setState({ picture: null });
    };

    render() {
        const { loading, somethingWrong, picture } = this.state;

        if(loading) {
            return <LoadingIndicator />;

        } else if(picture) {
            return (
                <ScrollView>
                    <FindPanel
                        picture={ picture }
                        resetPicture={ this._resetPicture }
                    />

                    <View style={ layout.padBottom }></View>
                </ScrollView>
            );

        } else {
            return (
                <ScrollView>
                    <Display
                        takePicture={ this._takePicture }
                        choosePicture={ this._choosePicture }
                    />

                    <View style={ layout.padBottom }></View>
                </ScrollView>
            );
        }
    }
}


const Display = (props) => {
    const { takePicture, choosePicture } = props;

    return (
        <View style={ layout.containerWhite }>
            <FHeading title='Upload an Image' />

            <FImageButton 
                source={ require('../../res/icons/gallery.png') }
                title='Choose a Picture'
                onPress={ choosePicture }
                buttonStyles={ { width: '70%', borderRadius: 10 } }
                textStyles={ { textAlign: 'left' } }
            />

            <FHeading
                title='OR'
                headStyles={{ fontSize: 12 }}
            />

            <FImageButton 
                source={ require('../../res/icons/camera.png') }
                title='Take a Picture'
                onPress={ takePicture }
                buttonStyles={ { width: '70%', borderRadius: 10 } }
                textStyles={ { textAlign: 'left' } }
            />
        </View>
    );
};


const FindPanel = (props) => {
    const { picture, resetPicture } = props;

    return (
        <View style={ layout.containerWhite }>
            <FImage
                source={ picture }
            />

            <View style={ layout.columnSeparator }>
                <View style={ layout.column50 }>
                    <FButton
                        title='CANCEL'
                        onPress={ resetPicture }
                        buttonStyles={{ width: '80%', borderRadius: 10 }}
                    />
                </View>

                <View style={ layout.column50 }>
                    <FButton
                        title='SUBMIT'
                        buttonStyles={{ width: '80%', borderRadius: 10, borderColor: colors.purple }}
                        textStyles={{ color: colors.purple }}
                    />
                </View>
            </View>
        </View>
    );
};
