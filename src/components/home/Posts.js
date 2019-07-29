import React, { Component } from 'react';
import { LoadingIndicator } from '../helper/LoadingIndicator';


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
            return <LoadingIndicator />;
        } else {
            return <LoadingIndicator />;
        }
    }
}
