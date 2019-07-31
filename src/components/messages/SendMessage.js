import React, { Component } from 'react';
import { FLoading } from '../../res/custom/FLoading';
import { colors } from '../../res/colors';


export class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params.userName? params.userName: 'Send Message',
        }
    }

    render() {
        const { loading } = this.state;

        if(loading) {
            return <FLoading loadingColor={ colors.purple } />
        }
    }
}
