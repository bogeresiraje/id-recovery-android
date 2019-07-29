import React, { Component } from 'react';
import { isLoggedIn } from '../../data/auth';
import { LoadingIndicator } from './LoadingIndicator';
import AsyncStorage from '@react-native-community/async-storage';


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
            return <LoadingIndicator />;

        } else if(loggedIn){
            return this.props.navigation.navigate('Main');

        } else {
            return this.props.navigation.navigate('Auth');
        }
    }
}
