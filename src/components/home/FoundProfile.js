import React, { Component } from 'react';
import { ScrollView, RefreshControl, View, Linking } from 'react-native';
import { FLoading } from '../../res/custom/FLoading';
import { colors } from '../../res/colors';
import { send, getHost } from '../../data/fetch';
import { FContactStatic, FContact } from '../../res/custom/FContact';
import layout from '../../res/st/layout';
import { FContactPhoto } from '../../res/custom/FContactPhoto';
import { FHeading } from '../../res/custom/FText';
import { FWrong } from '../../res/custom/FWrong';
import { FButton } from '../../res/custom/FButtons';


export class FoundProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            somethingWrong: false,

            user: {},
        };
    }

    componentDidMount() {
        this._getUser();
    }

    // Submit post request to server
    _getUser = async () => {
        const formData = new FormData();
        formData.append('user_id', this.props.navigation.getParam('userId'));

        await send('/get_user_by_id', formData)
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

    _refresh = async () => {
        this.setState({ refreshing: true });

        const formData = new FormData();
        formData.append('user_id', this.props.navigation.getParam('userId'));

        await send('/get_user_by_id', formData)
            .then(response => {
                if(response.user) {
                    this.setState({ refreshing: false, user: response.user });
                } else {
                    this.setState({ refreshing: false, somethingWrong: true });
                }
            },
            () => this.setState({ refreshing: false, somethingWrong: true })
        )
        .catch(() => this.setState({ refreshing: false, somethingWrong: true }) )
    };

    _tryAgain = () => {
        this.setState({ loading: true, somethingWrong: false });
        this._getUser();
    };

    _openEmail = () => {
        const url = `mailto:${this.state.user.email}`;
        Linking.canOpenURL(url)
            .then(supported => {
                if(supported){
                    return Linking.openURL(url);
                } else {
                    // To do
                }
            })
            .catch((err) => {
                // To do
            } )
    };

    _openPhone = () => {
        const url = `tel:${this.state.user.phone}`
        Linking.canOpenURL(url)
            .then(supported => {
                if(supported){
                    return Linking.openURL(url);
                } else {
                    // To do
                }
            })
            .catch((err) => {
                // To do
        })
    };

    render() {
        const { loading, somethingWrong, refreshing, user } = this.state;

        if(loading) return <FLoading loadingColor={ colors.purple } />;

        else if(somethingWrong) return <FWrong tryAgain={ this._tryAgain } />

        else {
            return (
                <ScrollView
                    refreshControl = {
                        <RefreshControl
                            refreshing={ refreshing }
                            onRefresh={ this._refresh }
                        />
                    }
                >
                    <UserInfo
                        user={ user }
                        openEmail={ this._openEmail }
                        openPhone={ this._openPhone }
                    /> 

                    <View style={ layout.padBottom }></View>
                </ScrollView>
            );
        }
    }
}


const UserInfo = ({ user, openEmail, openPhone }) => {
    return (
        <View style={ layout.containerWhite }>
            <FHeading title={ user.name }
                headStyles={{ fontSize: 18, color: '#000', textAlign: 'left',
                    marginLeft: 20 }}
            />

            <FContactPhoto
                title='Profile Photo'
                imageUrl={ `${getHost.host}/uploads/${user.photo_name}`}
                imageStyles={{ width: '90%', margin: 20 }}
            />

            <FlexIDPhoto user={ user } />

            <FlexPhone user={ user } openPhone={ openPhone } />

            <FContact open={ openEmail } title='Email' contact={ user.email } />

        </View>
    );
};


const FlexIDPhoto = ({ user }) => {
    if(user.id_image_name) {
        return (
            <FContactPhoto
            title='ID Photo'
            imageUrl={ `${getHost.host}/uploads/${user.id_image_name}`}
            imageStyles={{ width: '90%', margin: 20 }}
            />
        )
    } else {
        return <FContactStatic title='ID Photo' contact='No ID Photo' />;
    }
};


const FlexPhone = ({ user, openPhone }) => {
    if(user.phone) {
        return (
            <FContact open={ openPhone } title='Phone' contact={  user.phone } />
        );
    } else {
        return (
            <FContactStatic title='Phone' contact='No Phone Number' />
        );
    }
}
