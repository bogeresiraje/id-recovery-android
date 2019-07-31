import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { FLoading } from '../../res/custom/FLoading';
import { colors } from '../../res/colors';


export class FoundProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    render() {
        const { loading } = this.state;

        if(loading) return <FLoading loadingColor={ colors.purple } />;

        else {
            return (
                <ScrollView></ScrollView>
            );
        }
    }
}
