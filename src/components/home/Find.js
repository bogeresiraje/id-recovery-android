import React, { Component } from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { FHeading } from '../../res/custom/FText';
import { FImageButton, FButton } from '../../res/custom/FButtons';
import { FImage } from '../../res/custom/FImages';
import layout from '../../res/st/layout';
import { colors } from '../../res/colors';
import { permissionsAllowed } from '../../data/auth';
import { send } from '../../data/fetch';
import { FWrong } from '../../res/custom/FWrong';
import { FLoading } from '../../res/custom/FLoading';
import { FPrompt } from '../../res/custom/FPrompt';


export class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            somethingWrong: false,
            picture: null,

            // activities
            activities: {
                detectingFace: false,
                searchOwnerProfile: false,
                noFaceDetected: false,
                searchingOwner: false,
                noOwnerFound: false,
            },

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

    // When a photo has been uploaded by the user, it should then be checked whether it contains a face
    // If a face is found, then one can be asked to continue searching for the owner profile
    // This is done by the server
    _detectFace = async () => {
        const { picture, activities } = this.state;

        // Flag up detecting face indicator
        activities.detectingFace = true;
        this.setState({ activities: activities });

        const formData = new FormData();
        formData.append('photo', {
            uri: picture.uri,
            type: picture.type,
            name: picture.fileName
        });

        await send('/detect_face', formData)
            .then(response => {
                if(response.face_detected) {
                    // The user may continue to search for the owner
                    activities.searchOwnerProfile = true;
                    activities.detectingFace = false;
                    this.setState({ activities: activities });
                    
                } else {
                    // Ask user to choose another photo.
                    activities.detectingFace = false;
                    activities.noFaceDetected = true;
                    this.setState({ activities: activities });
                }
            },
            () => {
                // Something could have gone wrong
                activities.detectingFace = false,
                this.setState({ somethingWrong: true, activities: activities });
            }
        )
        .catch(() => {
            // Catch request exceptions
            activities.detectingFace = false,
            this.setState({ somethingWrong: true, activities: activities });
        })
    };

    // Cancel searching for the owner
    _cancelSearchForOwner = () => {
        const { activities } = this.state;
        activities.searchOwnerProfile = false;
        activities.detectingFace = false;
        activities.noFaceDetected = false;

        this.setState({ activities });
    };

    // Continue searching for the owner
    _continueSearchForOwner = async () => {
        const { picture, activities } = this.state;
        activities.searchingOwner = true;
        this.setState({ activities: activities });

        // Flag up detecting face indicator
        activities.searchOwnerProfile = true;
        this.setState({ activities: activities });

        const formData = new FormData();
        formData.append('photo', {
            uri: picture.uri,
            type: picture.type,
            name: picture.fileName
        });

        await send('/search_owner', formData)
            .then(response => {
                if(response.owner_id) {
                    // The user may continue to search for the owner
                    activities.searchOwnerProfile = false;
                    activities.searchingOwner = false,
                    this.setState({ activities: activities, picture: null, redirect: true,
                        owner_id: ReportDispatcher.owner_id });
                    this.props.navigation.navigate('FoundProfile', { 'userId': response.owner_id });
                    
                } else {
                    // Ask user to choose another photo.
                    activities.searchOwnerProfile = false;
                    activities.searchingOwner = false;
                    activities.noOwnerFound = true;
                    this.setState({ activities: activities, picture: null });
                }
            },
            () => {
                // Something could have gone wrong
                activities.searchOwnerProfile = false,
                activities.searchingOwner = false,
                this.setState({ somethingWrong: true, activities: activities });
            }
        )
        .catch(() => {
            // Catch request exceptions
            activities.searchOwnerProfile= false,
            activities.searchingOwner = false,
            this.setState({ somethingWrong: true, activities: activities });
        })
    };

    _tryAgain = () => {
        // Restart the whole procedure
        const { activities } = this.state;
        activities.detectingFace = false,
        activities.searchOwnerProfile = false,
        activities.searchingOwner = false;
        activities.noFaceDetected = false;
        activities.noOwnerFound = false;
        this.setState({ somethingWrong: false, activities: activities, picture: null })
    };

    render() {
        const { loading, somethingWrong, picture, activities } = this.state;

        if(loading) {
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />
                    <LoadingIndicator />
                </View>
            );

        } else if(somethingWrong) {
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />
                    <FWrong tryAgain={ this._tryAgain } btnColor={ colors.purple } />
                </View>
            )

        } else if(activities.detectingFace) {
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />
                    <FLoading
                    title="Detecting Face In The Photo."
                    subTitle="Please Wait..."
                    loadingColor={ colors.purple }
                    />
                </View>
            );

        } else if(activities.searchingOwner) {
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />
                    <FLoading title='Searching For Owner' loadingColor={ colors.purple } />
                </View>
            );
            
        } else if(activities.searchOwnerProfile) {
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />

                    <FPrompt
                    title="Face Has Been Detected In The photo."
                    subTitle="Continue To Search For The Owner."
                    cancelable={ this._cancelSearchForOwner }
                    acceptable={ this._continueSearchForOwner }
                    />
                </View>
            );
        } else if(activities.noFaceDetected) {
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />

                    <FWrong
                    title='No Face Has Been Detected In The Photo'
                    btnColor={ colors.purple }
                    tryAgain={ this._tryAgain }
                    />
                </View>
            );

        } else if(activities.noOwnerFound) {
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />

                    <FWrong
                    title='No Matching Owner Has Been Found'
                    btnColor={ colors.purple }
                    tryAgain={ this._tryAgain }
                    btnTitle='OK'
                    />
                </View>
            );

        }  else if(picture) {
            return (
                <ScrollView>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />

                    <FindPanel
                        picture={ picture }
                        resetPicture={ this._resetPicture }
                        detectFace={ this._detectFace }
                    />

                    <View style={ layout.padBottom }></View>
                </ScrollView>
            );

        } else {
            return (
                <ScrollView>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />

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
    const { picture, resetPicture, detectFace } = props;

    return (
        <View style={ layout.containerWhite }>
            <FImage
                source={ picture }
            />

            <View style={ layout.columnSeparator }>
                <View style={ layout.column50 }>
                    <FButton
                        title='CANCEL'
                        handler={ resetPicture }
                        buttonStyles={{ width: '80%', borderRadius: 10 }}
                    />
                </View>

                <View style={ layout.column50 }>
                    <FButton
                        title='SUBMIT'
                        handler={ detectFace }
                        buttonStyles={{ width: '80%', borderRadius: 10, borderColor: colors.purple }}
                        textStyles={{ color: colors.purple }}
                    />
                </View>
            </View>
        </View>
    );
};
