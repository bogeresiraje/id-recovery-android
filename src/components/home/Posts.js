import React, { Component } from 'react';
import { LoadingIndicator } from '../helper/LoadingIndicator';
import { FLoading } from '../../res/custom/FLoading';
import { colors } from '../../res/colors';


export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            somethingWrong: false,
        };
    }

    render() {
        const { loading, somethingWrong } = this.state;

        if(loading) {
            return <FLoading loadingColor={ colors.purple } />;
        } else {
            return <FLoading />;
        }
    }
}
