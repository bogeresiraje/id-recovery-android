import React, { Component } from 'react';
import { ScrollView, View, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import layout from '../../res/st/layout';
import { permissionsAllowed } from '../../data/auth';
import { FImageButton, FButton } from '../../res/custom/FButtons';
import { send, getHost } from '../../data/fetch';
import { FImage } from '../../res/custom/FImages';
import { colors } from '../../res/colors';
import { FLoading } from '../../res/custom/FLoading';
import { FWrong } from '../../res/custom/FWrong';
import FIndicator from '../../res/custom/FIndicator';


export class ChangeProfilePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            somethingWrong: false,
            activeIndicator: false,

            user: {},

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
            this._submitProfileForm(email);

        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    // Submit post request to server
    _submitProfileForm = async email => {
        const formData = new FormData();
        formData.append('email', email);

        await send('/get_user', formData)
            .then(response => {
                if(response.user) {
                    this.setState({ loading: false, user: response.user });
                } else {
                    this.setState({ loading: false, somethingWrong: true });
                }
            },
            () => this.setState({ loading: false, somethingWrong: true })
        )
        .catch(() => this.setState({ loading: false, somethingWrong: true }) )
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
        const { user, picture } = this.state;

        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('photo', {
            uri: picture.uri,
            type: picture.type,
            name: picture.fileName,
         });

         send('/change_profile_photo', formData)
            .then(response => {
                if(response.user){
                    // Successfully Updated Profile Photo
                    this.setState({ activeIndicator: false, user: response.user, picture: null });
                    ToastAndroid.showWithGravity(
                        'Successfully Updated Profile Photo',
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

    render() {
        const { loading, activeIndicator, somethingWrong, picture, user } = this.state;

        if(loading) {
            return <FLoading loadingColor={ colors.purple } />;

        } else if(somethingWrong) {
            return <FWrong tryAgain={ f => f } btnColor={ colors.purple } />

        } else {
            return (
                <ScrollView>
                    <Display
                        user={ user }
                        picture={ picture }
                        choosePicture={ this._choosePicture }
                        takePicture={ this._takePicture }
                        activeIndicator={ activeIndicator }
                        submit={ this._submit }
                    />
                    <View style={ layout.padBottom }></View>
                </ScrollView>
            );
        }
    }
}


const Display = (props) => {
    const { user, activeIndicator, picture, choosePicture, takePicture, submit } = props;

    return (
        <View style={ layout.containerWhite }>
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

            <FlexButton activeIndicator={ activeIndicator } picture={ picture } submit={ submit } />
        </View>
    );
};

const FlexPhoto = ({ user, picture }) => {
    if(picture) {
        return (
            <FImage
                source={ picture }
            />
        );
    } else {
        return (
            <FImage
                source={{ uri: `${getHost.host}/uploads/${user.photo_name}` }}
            />
        );
    }
};


const FlexButton = ({ activeIndicator, picture, submit }) => {
    if(picture){
        if(activeIndicator){
            return (
                <FIndicator
                    vStyles={{ borderRadius: 10, width: '70%' }}
                    bColor={ colors.purple } color={ colors.white }
                />
            )
        }
        else {
            return (
                <FButton
                    handler={ submit }
                    buttonStyles={{ borderRadius: 10, backgroundColor: colors.purple, borderColor: colors.purple,
                        width: '70%' }}
                    textStyles={{ color: colors.white }}
                />
            );
        }

    } else {
        return null;
    }
};
