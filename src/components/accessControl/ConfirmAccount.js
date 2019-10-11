import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, StatusBar } from 'react-native';
import layout from '../../res/st/layout';
import text from '../../res/st/text';
import { NullInputAlert, TextAlert } from '../../res/custom/FText';
import input from '../../res/st/input';
import { FButton } from '../../res/custom/FButtons';
import { colors } from '../../res/colors';
import { send } from '../../data/fetch';
import { saveCred } from '../../data/auth';
import FIndicator from '../../res/custom/FIndicator';
import { FWrong } from '../../res/custom/FWrong';


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
                if(response.email) {
                    saveCred(response.email);
                    this.setState({ activeIndicator: false });
                    this.props.navigation.navigate('Main');

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

    _tryAgain = () => {
        this.setState({ somethingWrong: false, activeIndicator: false });
    };

    render() {
        const { somethingWrong, activeIndicator, code, nullField, wrongCode, invalidCode } = this.state;

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
                    <Form
                        nullField={ nullField }
                        code={ code }
                        wrongCode={ wrongCode }
                        invalidCode={ invalidCode }
                        handleCode={ this._handleCode }
                        activeIndicator={ activeIndicator }
                        validateAndSubmit={ this._validateAndSubmit }
                    />
                </ScrollView>
            );
        }
    }
}


const Form = (props) => {
    const { code, activeIndicator, handleCode, nullField, validateAndSubmit, wrongCode, invalidCode } = props;

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

            <SubmitBtn activeIndicator={ activeIndicator } handler={ validateAndSubmit } />
            
        </View>
    );
}


const SubmitBtn = ({ activeIndicator, handler }) => {
    if(activeIndicator){
        return (
            <FIndicator
                bColor={ colors.purple }
                color={ colors.white }
                vStyles={{ width: '50%', borderRadius: 10 }}
            />
        );
    } else {
        return (
            <FButton
                handler={  handler }
                buttonStyles={{ width: '50%', borderRadius: 10, backgroundColor: colors.purple,
                    borderColor: colors.purple 
                }}
                textStyles={{ color: colors.white }}
            />
        );
    }
};
