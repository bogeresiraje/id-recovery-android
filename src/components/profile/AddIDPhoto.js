import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import layout from '../../res/st/layout';
import { permissionsAllowed } from '../../data/auth';
import { FImageButton, FButton } from '../../res/custom/FButtons';
import { send, getHost } from '../../data/fetch';
import { FImage } from '../../res/custom/FImages';
import { colors } from '../../res/colors';
import { FHeading } from '../../res/custom/FText';
import { FLoading } from '../../res/custom/FLoading';
import { FWrong } from '../../res/custom/FWrong';
import FIndicator from '../../res/custom/FIndicator';
import input from '../../res/st/input';
import text from '../../res/st/text';


export class AddIDPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            somethingWrong: false,
            activeIndicator: false,

            user: {},
            email: '',
            identifier: '',

            // Edit details
            picture: null,
        };
    }

    componentDidMount() {
        this._getUser();
    }

    _getUser = async () => {
        const email = await AsyncStorage.getItem('email');
        if(email) {
            this.setState({ email: email, loading: false });

        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    _handleIdentifier = identifier => {
        this.setState({ identifier: identifier });
    };


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

    // Change Photo
    _submit = async () => {
        this.setState({ activeIndicator: true });

        // values
        const { email, identifier, picture } = this.state;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('identifier', identifier);
        formData.append('photo', {
            uri: picture.uri,
            type: picture.type,
            name: picture.fileName,
         });

         send('/add_id_photo', formData)
            .then(response => {
                if(response.user_id){
                    // Successfully Updated Profile Photo
                    this.setState({ activeIndicator: false, picture: null });
                    ToastAndroid.showWithGravity(
                        'Successfully Updated ID Photo',
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                    )
                    this.props.navigation.navigate('ViewAll', { user_id: response.user_id });
                } else if(response.no_face_detected) {
                    // No face has been detected in the photo.
                    // This can lead to poor results.
                    this.setState({ activeIndicator: false, picture: null });
                    ToastAndroid.showWithGravity(
                        'No Face Has Been Detected In The Photo',
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                    )
                } else {
                    // Something went wrong
                    this.setState({ activeIndicator: false, somethingWrong: true });
                }
            },
            () => this.setState({ activeIndicator: false, somethingWrong: true })
        )
        .catch(() => this.setState({ activeIndicator: false, somethingWrong: true }) )
    };

    _tryAgain = () => {
        this.setState({ somethingWrong: false });
    };

    render() {
        const { loading, activeIndicator, somethingWrong, picture, user, identifier } = this.state;

        if(loading) {
            return <FLoading loadingColor={ colors.purple } />;

        } else if(somethingWrong) {
            return <FWrong tryAgain={ this._tryAgain } btnColor={ colors.purple } />

        } else {
            return (
                <ScrollView>
                    <Display
                        user={ user }
                        picture={ picture }
                        choosePicture={ this._choosePicture }
                        takePicture={ this._takePicture }
                        activeIndicator={ activeIndicator }
                        identifier={ identifier }
                        handleIdentifier={ this._handleIdentifier }
                        submit={ this._submit }
                    />
                    <View style={ layout.padBottom }></View>
                </ScrollView>
            );
        }
    }
}


const Display = (props) => {
    const { user, picture, choosePicture, takePicture, activeIndicator, identifier,
        handleIdentifier, submit } = props;

    return (
        <View style={ layout.containerWhite }>
            <Text style={ text.autoBlack }>Name of ID</Text>

            <TextInput style={ input.inputText } value={ identifier }
                onChangeText={ text => handleIdentifier(text) } 
            />

            <FlexPhoto user={ user } picture={ picture } />

            <FImageButton 
                source={ require('../../res/icons/gallery.png') }
                title='Choose a Picture'
                onPress={ choosePicture }
                buttonStyles={ { width: '70%', borderRadius: 10 } }
                textStyles={ { textAlign: 'left' } }
            />

            <FImageButton
                source={ require('../../res/icons/camera.png') }
                title='Take a Picture'
                onPress={ takePicture }
                buttonStyles={ { width: '70%', borderRadius: 10 } }
                textStyles={ { textAlign: 'left' } }
            />

            <SubmitBtn activeIndicator={ activeIndicator } picture={ picture } submit={ submit } />
        </View>
    );
};

const FlexPhoto = ({ picture }) => {
    if(picture) {
        return (
            <FImage
                source={ picture }
            />
        );
    } else {
        return null;
    } 
};


const SubmitBtn = ({ activeIndicator, picture, submit }) => {
    if(activeIndicator) {
        return <FIndicator
                    vStyles={{ borderRadius: 10, width: '70%' }}
                    bColor={ colors.purple } color={ colors.white }
                />
    } else {
        return <FlexButton picture={ picture } submit={ submit } />
    }
}


const FlexButton = ({ picture, submit }) => {
    if(picture){
        return (
            <FButton
                handler={ submit }
                buttonStyles={{ borderRadius: 10, backgroundColor: colors.purple, borderColor: colors.purple,
                    width: '70%' }}
                textStyles={{ color: colors.white }}
            />
        );
    } else {
        return null;
    }
};
