import React, { Component } from 'react';
import { ScrollView, View, TextInput, Text, StatusBar } from 'react-native';
import { FButton } from '../../res/custom/FButtons';
import layout from '../../res/st/layout';
import input from '../../res/st/input';
import text from '../../res/st/text';
import { colors } from '../../res/colors';
import { NullInputAlert, TextAlert } from '../../res/custom/FText';
import { send } from '../../data/fetch';
import { saveCred } from '../../data/auth';
import FIndicator from '../../res/custom/FIndicator';
import { FWrong } from '../../res/custom/FWrong';


export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            somethingWrong: false,
            activeIndicator: false,
            nullField: false,
            wrongDetails: false,

            email: '',
            password: '',
        }
    }

    _handlerEmail = email => {
        this.setState({ email: email });
    };

    _handlePassword = password => {
        this.setState({ password: password });
    };

    _validateAndSubmit = () => {
        const { email, password } = this.state;
        // If one of the input fields is empty, alert error, else submit
        if(email && password ){
            this._submit(email, password)
        } else {
            this.setState({ nullField: true });
        }
    };

    _submit = async (email, password) => {
        this.setState({ activeIndicator: true });

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        await send('/login', formData)
            .then(response => {
                if(response.email) {
                    saveCred(email);
                    this.setState({ activeIndicator: false });
                    this.props.navigation.navigate('Main');

                } else if (response.wrong_details) {
                    this.setState({ activeIndicator: false, wrongDetails: true });
                } else {
                    this.setState({ activeIndicator: false, somethingWrong: true })
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
        const { somethingWrong, activeIndicator, nullField, email, password, wrongDetails } = this.state;

        if(somethingWrong) {
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />
                    <FWrong tryAgain={ this._tryAgain } />
                </View>
            );
        } else {
            return (
                <ScrollView>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />
                    <LoginForm
                        navigation={ this.props.navigation }
                        nullField={ nullField }
                        wrongDetails={ wrongDetails }
                        email={ email }
                        password={ password }
                        handleEmail={ this._handlerEmail }
                        handlePassword={ this._handlePassword }
                        activeIndicator={ activeIndicator }
                        validateAndSubmit={ this._validateAndSubmit }
                    />
                </ScrollView>
            );
        }
    }
}

const LoginForm = (props) => {
    const { navigation, activeIndicator, nullField, email, password, handleEmail, wrongDetails,
        handlePassword, validateAndSubmit } = props;

    const gotoCreateAccount = () => {
        navigation.navigate('CreateAccount');
    };

    return (
        <View style={{ ...layout.containerWhite, paddingTop: 50 }}>

            <Text style={ text.autoBlack }>Email</Text>
            <NullInputAlert nullField={ nullField } value={ email } />
            <TextAlert value={ wrongDetails } title='Email or Password is Incorrect' />
            <TextInput
                style={ input.inputText }
                autoCapitalize='none'
                keyboardType='email-address'
                value={ email }
                onChangeText={ email => handleEmail(email) }
            />

            <Text style={ text.autoBlack }>Password</Text>
            <NullInputAlert nullField={ nullField } value={ password } />
            <TextInput
                style={ input.inputText }
                secureTextEntry
                value={ password }
                onChangeText = { password => handlePassword(password) }
            />

            <SubmitBtn activeIndicator={ activeIndicator} validateAndSubmit={ validateAndSubmit } />

            <Text style={ text.autoBlack }>Don't Have an Account Yet?</Text>

            <FButton
                title='Create Account'
                handler={ gotoCreateAccount }
                buttonStyles={{ borderColor: colors.purple, width: '60%', borderRadius: 10 }}
                textStyles={{ color: colors.purple }}
            />

        </View>
    );
}


const SubmitBtn = ({ activeIndicator, validateAndSubmit }) => {
    if(activeIndicator) {
        return (
            <FIndicator bColor={ colors.purple } color={ colors.white } />
        );
    } else {
        return (
            <FButton
                title='Log In'
                buttonStyles={{ borderColor: colors.purple, backgroundColor: colors.purple }}
                textStyles={{ color: colors.white }}
                handler={ validateAndSubmit }
            />
        );
    }
};
