import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import layout from '../../res/st/layout';
import text from '../../res/st/text';
import { NullInputAlert, TextAlert } from '../../res/custom/FText';
import input from '../../res/st/input';
import { FButton } from '../../res/custom/FButtons';
import { colors } from '../../res/colors';
import { send } from '../../data/fetch';
import { saveCred } from '../../data/auth';


export class ConfirmAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            somethingWrong: false,
            activeIndicator: false,

            code: '',
            nullField: false,
            wrongCode: false,
            invalidCode: false,
        };
    }

    _handleCode = code => {
        this.setState({ code: code, wrongCode: false, invalidCode: false });
    };

    _validateAndSubmit = () => {
        // Check whether code has been filled
        const { code } = this.state;
        if(code){
            // Submit code to server to verfiy account
            this._submit(code);
        } else {
            // Alert no code is filled
            this.setState({ nullField: true });
        }
    };

    _submit = async code => {
        this.setState({ activeIndicator: true });

        // Create form
        const formData = new FormData();
        formData.append('code', code);

        // Submit
        send('/confirm_verification_code', formData)
            .then(response => {
                if(response.user) {
                    const status = saveCred(user);
                    if(status) {
                        this.setState({ activeIndicator: false });
                        this.props.navigation.navigate('Main');
                    } else {
                        this.setState({ somethingWrong: true, activeIndicator: false });
                    }
                } else if(response.invalid_code) {
                    this.setState({ activeIndicator: false, invalidCode: true, wrongCode: false });

                } else if(response.wrong_code) {
                    this.setState({ activeIndicator: false, wrongCode: true, invalidCode: false });
                } else {
                    this.setState({ activeIndicator: false, somethingWrong: true });
                }
            },
            () => this.setState({ somethingWrong: true, activeIndicator: false })
            )
            .catch(() => this.setState({ somethingWrong: true, activeIndicator: false }))
    };

    render() {
        const { somethingWrong, code, nullField, wrongCode, invalidCode } = this.state;

        if(somethingWrong) {
            return <View></View>

        } else {
            return (
                <ScrollView>
                    <Form
                        nullField={ nullField }
                        code={ code }
                        wrongCode={ wrongCode }
                        invalidCode={ invalidCode }
                        handleCode={ this._handleCode }
                        validateAndSubmit={ this._validateAndSubmit }
                    />
                </ScrollView>
            );
        }
    }
}


const Form = (props) => {
    const { code, handleCode, nullField, validateAndSubmit, wrongCode, invalidCode } = props;

    return (
        <View style={ {...layout.containerWhite, paddingTop: 70 } }>
            <Text style={ text.autoBlack }>
                Enter The 4 Digit Code That Has Been Sent To Your Email
            </Text>
            <NullInputAlert nullField={ nullField } value={ code } />
            <TextAlert value={ wrongCode } title='Wrong Code' />
            <TextAlert value={ invalidCode } title='Invalid Code' />
            <TextInput
                style={ input.inputText }
                value={ code }
                onChangeText={ code => handleCode(code) }
                keyboardType='number-pad'
            />

            <FButton
                onPress={ () => validateAndSubmit() }
                buttonStyles={{ width: '50%', borderRadius: 10, backgroundColor: colors.purple,
                    borderColor: colors.purple 
                }}
                textStyles={{ color: colors.white }}
            />
        </View>
    );
}
