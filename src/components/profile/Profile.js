import React, { Component } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { send, getHost } from '../../data/fetch';
import layout from '../../res/st/layout';
import { FHeading } from '../../res/custom/FText';
import { FContactStatic } from '../../res/custom/FContact';
import { FContactPhotoClickable } from '../../res/custom/FContactPhoto';
import { FButton } from '../../res/custom/FButtons';
import { colors } from '../../res/colors';
import { FPrompt } from '../../res/custom/FPrompt';
import { deleteCred } from '../../data/auth';
import { FInputPrompt } from '../../res/custom/FInputPrompt';
import { FWrong } from '../../res/custom/FWrong';
import { FLoading } from '../../res/custom/FLoading';
import { FImage } from '../../res/custom/FImages';


export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            somethingWrong: false,
            activeIndicator: false,
            refreshing: false,

            user: {},

            logoutPrompt: false, 
            deleteAccountPrompt: false,

            // Editing name
            editNameOpen: false,
            name: '',

            // Edit phone
            editPhoneOpen: false,
            phone: '',

            // Indicators.
            logingOut: false,
            deletingIndicator: false,
            nameIndicator: false,
            phoneIndicator: false,
        };
    }

    componentDidMount() {
        this._getUser();
    }

    _getUser = async () => {
        const email = await AsyncStorage.getItem('email');
        if(email) {
            this._submit(email);

        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    // Submit post request to server
    _submit = async email => {
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

    _refresh = async () => {
        this.setState({ refreshing: true });

        const formData = new FormData();
        formData.append('email', this.state.user.email);

        await send('/get_user', formData)
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

    // Edit profile photo_name
    _changeProfilePhoto = () => {
        this.props.navigation.navigate('ChangeProfilePhoto');
    };

    // Edit profile photo_name
    _changeIDPhoto = () => {
        this.props.navigation.navigate('ChangeIDPhoto');
    };

    // For editing name of the user
    _openEditName = () => {
        this.setState({ editNameOpen: true, name: this.state.user.name });
    };

    // Cancel editing name
    _cancelEditName = () => {
        this.setState({ editNameOpen: false });
    };

    _handleName = name => {
        this.setState({ name: name });
    };

    // Change user name in the database
    _editName = async () => {
        const { user, name } = this.state;
        this.setState({ nameIndicator: true });
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('name', name);

        send('/edit_name', formData)
            .then(response => {
                if(response.user) {
                    this.setState({ user: response.user, nameIndicator: false, editNameOpen: false });
                } else {
                    this.setState({ nameIndicator: false, editNameOpen: false, somethingWrong: true });
                }
            },
            () => this.setState({ nameIndicator: false, editNameOpen: false, somethingWrong: true })
        )
        .catch(() => this.setState({ nameIndicator: false, editNameOpen: false, somethingWrong: true }) )
    };

    // Open edit phone form
    _openEditPhone = () => {
        this.setState({ editPhoneOpen: true, phone: this.state.user.phone });
    };

    // Cancel editing phone
    _cancelEditPhone = () => {
        this.setState({ editPhoneOpen: false });
    };

    _handlePhone = phone => {
        this.setState({ phone: phone });
    };

    _editPhone = async () => {
        const { user, phone } = this.state;
        this.setState({ phoneIndicator: true });
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('phone', phone);

        send('/edit_phone', formData)
            .then(response => {
                if(response.user) {
                    this.setState({ user: response.user, phoneIndicator: false, editPhoneOpen: false });
                } else {
                    this.setState({ phoneIndicator: false, editPhoneOpen: false, somethingWrong: true });
                }
            },
            () => this.setState({ phoneIndicator: false, editPhoneOpen: false, somethingWrong: true })
        )
        .catch(() => this.setState({ phoneIndicator: false, editPhoneOpen: false, somethingWrong: true }) )
    };

    // For logging out
    _openLogout = () => {
        this.setState({ logoutPrompt: true });
    };

    _cancelLogout = () => {
        this.setState({ logoutPrompt: false });
    };

    _logout = async () => {
        this.setState({ logingOut: true });
        const formData = new FormData();
        formData.append('email', this.state.user.email);

        await send('/logout', formData)
            .then(response => {
                if(response.success) {
                    // Even remove from local storage
                    deleteCred();
                    this.props.navigation.navigate('Auth');
                } else {
                    this.setState({ logingOut: false, somethingWrong: true });
                }
            },
            () => this.setState({ logingOut: false, somethingWrong: true })
        )
        .catch(() => this.setState({ logingOut: false, somethingWrong: true }) )
    };

    // For deleting account
    _openDeleteAccount = () => {
        this.setState({ deleteAccountPrompt: true });
    };

    _cancelDeleteAccount = () => {
        this.setState({ deleteAccountPrompt: false });
    };

    _deleteAccount = async () => {
        const { id } = this.state.user;
        this.setState({ deletingIndicator: true });
        const formData = new FormData()
        formData.append('user_id', id);
        await send('/delete_account', formData)
            .then(
                response => {
                    if(response.success){
                        deleteCred();
                        this.props.navigation.navigate('Auth');
                    } else {
                        this.setState({ somethingWrong: true, deletingIndicator: false });
                    }
                },
                () => this.setState({ somethingWrong: true, deletingIndicator: false })
            )
            .catch(() => this.setState({ somethingWrong: true, deletingIndicator: false }) )
    };

    _tryAgain = () => {
        this.setState({ loading: true, somethingWrong: false });
        this._getUser();
    };

    render() {
        const { loading, somethingWrong, refreshing, user, logoutPrompt, deleteAccountPrompt,
            editNameOpen, name, editPhoneOpen, phone, deletingIndicator, nameIndicator,
            phoneIndicator, logingOut } = this.state;

        if(loading) {
            return <FLoading loadingColor={ colors.purple } />;

        } else if(logingOut){
            // loging out indicator
            return (
                <FLoading title='Loging Out...' loadingColor={ colors.purple } />
            );

        } else if(nameIndicator) {
            // Edit name indicator.
            return (
                <FLoading title='Editing Name...' loadingColor={ colors.purple } />
            );

        } else if(phoneIndicator) {
            // Editing phone indicator.
            return (
                <FLoading title='Editing Phone...' loadingColor={ colors.purple } />
            );

        } else if(deletingIndicator) {
            // Deleting account indicator.
            return (
                <FLoading title='Deleting Account...' loadingColor={ colors.purple } />
            );

        } else if(somethingWrong) {
            return <FWrong tryAgain={ this._tryAgain } />

        } else if(editNameOpen){
            // Edit name
            return (
                <FInputPrompt
                    title='Edit Name'
                    ok='UPDATE'
                    cancelable={ this._cancelEditName }
                    acceptable={ this._editName }
                    value={ name }
                    inputHandler={ this._handleName }
                />
            )

        } else if(editPhoneOpen) {
            // Edit Phone
            return (
                <FInputPrompt
                    title='Edit Phone'
                    ok='UPDATE'
                    cancelable={ this._cancelEditPhone }
                    acceptable={ this._editPhone }
                    value={ phone }
                    type='phone'
                    inputHandler={ this._handlePhone }
                />
            )

        } else if(logoutPrompt) {
            // Logout prompt
            return (
                <FPrompt
                    title='Are You Sure You Want To Logout?'
                    cancelable={ this._cancelLogout }
                    acceptable={ this._logout }
                />
            )

        } else if(deleteAccountPrompt) {
            // Delete account
            return (
                <FPrompt
                    title='Are You Sure You Want To Delete Your Account?'
                    cancelable={ this._cancelDeleteAccount }
                    acceptable={ this._deleteAccount }
                />
            );

        } else {
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
                        navigation={ this.props.navigation }
                        changeProfilePhoto={ this._changeProfilePhoto }
                        changeIDPhoto={ this._changeIDPhoto }
                        openEditName={ this._openEditName }
                        openEditPhone={ this._openEditPhone }
                        openLogout={ this._openLogout }
                        openDeleteAccount={ this._openDeleteAccount }
                    /> 

                    <View style={ layout.padBottom }></View>
                </ScrollView>
            );
        }
    }
}


const UserInfo = (props) => {
    const { user, navigation, changeProfilePhoto, changeIDPhoto, openLogout,
        openDeleteAccount, openEditName, openEditPhone } = props;

    return (
        <View style={ layout.containerWhite }>
            <View style={ layout.columnSeparator }>
                <View style={ layout.column60 }>
                    <FHeading title={ user.name }
                        headStyles={{ fontSize: 18, color: '#000', textAlign: 'left',
                        marginLeft: 20 }}
                    />
                </View>

                <View style={ layout.column40 }>
                    <FButton
                        handler={ openEditName }
                        title='edit'
                        buttonStyles={{ width: '60%', borderRadius: 10, height: 30 }}
                        textStyles={{ paddingTop: 2 }}
                    />
                </View> 
            </View>

            <FContactPhotoClickable
                title='Profile Photo'
                handler={ changeProfilePhoto }
                imageUrl={ `${getHost.host}/uploads/${user.photo_name}`}
                imageStyles={{ width: '90%', alignSelf: 'center' }}
            />

            <FlexIDPhoto user={ user } navigation={ navigation } changeIDPhoto={ changeIDPhoto } />

            <Phone user={ user } openEditPhone={ openEditPhone } />

            <FContactStatic title='Email' contact={ user.email } />

            <FButton
                title='Log Out'
                handler={ openLogout }
                buttonStyles={{ borderRadius: 10, width: '90%' }}
            />

            <FButton
                title='Delete Account'
                handler={ openDeleteAccount }
                buttonStyles={{ borderColor: colors.red, borderRadius: 10, width: '90%' }}
                textStyles={{ color: colors.red }}
            />
        </View>
    );
};


const FlexIDPhoto = ({ user, navigation }) => {
    const { length } = user.photos;
    const gotoChangeId = () => { navigation.navigate('ChangeIDPhoto') };
    const viewAll = () => { navigation.navigate('ViewAll', { user_id: user.id }) };

    if(length) {
        return (
            <View style={{ padding: 10 }}>
                <FImage source={{ uri: `${getHost.host}/uploads/${user.photos[0].photo_name}` }}
                />
                <View style={ layout.columnSeparator }>
                    <View style={ layout.column60 }>
                        <FButton
                            handler={ viewAll }
                            title={ `${length} IDs`}
                            buttonStyles={{ width: '60%', borderWidth: 0, height: 30 }}
                            textStyles={{ paddingTop: 2, color: colors.purple }}
                        />
                    </View>

                    <View style={ layout.column40 }>
                        <FButton
                            handler={ gotoChangeId }
                            title='ADD'
                            buttonStyles={{ width: '60%', borderWidth: 0, height: 30 }}
                            textStyles={{ paddingTop: 2, color: colors.purple }}
                        />
                    </View> 
                </View>
            </View>
        )

    } else {
        return (
            <View style={ layout.columnSeparator }>
            <View style={ layout.column60 }>
                <FContactStatic title='ID Photo' contact='No ID Photo' />
            </View>

            <View style={ layout.column40 }>
                <FButton
                    handler={ gotoChangeId }
                    title='add'
                    buttonStyles={{ width: '60%', borderRadius: 10, height: 30 }}
                    textStyles={{ paddingTop: 2 }}
                />
            </View> 
            </View>
        )
    }
};


const Phone = ({ user, openEditPhone }) => {
    return (
        <View style={ layout.columnSeparator }>
            <View style={ layout.column60 }>
                <FlexPhone user={ user } />
            </View>

            <View style={ layout.column40 }>
                <FButton
                    handler={ openEditPhone }
                    title='edit'
                    buttonStyles={{ width: '60%', borderRadius: 10, height: 30 }}
                    textStyles={{ paddingTop: 2 }}
                />
            </View> 
        </View>
    )
}


const FlexPhone = ({ user }) => {
    if(user.phone) {
        return (
            <FContactStatic title='Phone' contact={  user.phone } />
        );
    } else {
        return (
            <FContactStatic title='Phone' contact='No Phone Number' />
        );
    }
}
