import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../../res/colors';


export class Initial extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            loggedIn: false,
        };
    }

    componentDidMount() {
        this._checkLogin();
    }

    _checkLogin = async () => {
        const email = await AsyncStorage.getItem('email');
        if(email){
            this.setState({ loading: false, loggedIn: true });
        } else {
            this.setState({ loading: false });
        }
    };

    render() {
        const { loading, loggedIn } = this.state;

        if(loading){
            return (
                <View>
                    <StatusBar backgroundColor={ colors.purple } barStyle='light-content' />
                    <LoadingIndicator />
                </View>
            );

        } else if(loggedIn){
            return this.props.navigation.navigate('Main');

        } else {
            return this.props.navigation.navigate('Auth');
        }
    }
}
