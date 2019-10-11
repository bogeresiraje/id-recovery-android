import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { send, getHost } from '../../data/fetch';
import { FLoading } from '../../res/custom/FLoading';
import { FWrong } from '../../res/custom/FWrong';
import layout from '../../res/st/layout';
import { FImage } from '../../res/custom/FImages';
import text from '../../res/st/text';
import { FButton } from '../../res/custom/FButtons';
import { colors } from '../../res/colors';


export class ViewAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            photos: [],
            somethingWrong: false,
            deleting: false,
        }
    }

    componentDidMount() {
        this._fetchIds();
    }

    _fetchIds = () => {
        const user_id = this.props.navigation.getParam('user_id');
        const formData = new FormData();
        formData.append('user_id', user_id);
        send('/view_all', formData)
            .then(response => {
                if(response.photos) {
                    this.setState({ photos: response.photos, loading: false });
                } else {
                    this.setState({ loading: false, somethingWrong: true })
                }
            })
            .catch(() => this.setState({ loading: false, somethingWrong: true }))
    };

    _deleteId = (id) => {
        this.setState({ deleting: true });
        const formData = new FormData();
        formData.append('photo_id', id)
        send('/delete_id', formData)
            .then(response => {
                if(response.photo_id) {
                    const { photos } = this.state;
                    this.setState({ photos: photos.filter(p => p.id !== response.photo_id), 
                        deleting: false
                    })
                } else {
                    this.setState({ deleting: false, somethingWrong: true });
                }
            })
            .catch(() => this.setState({ deleting: false, somethingWrong: true }))
    };

    _tryAgain = () => {
        this.setState({ loading: true, somethingWrong: false });
        this._fetchIds();
    };

    render() {
        const { loading, deleting, somethingWrong, photos } = this.state;

        if(loading) {
            return <FLoading />

        } else if(deleting) {
            return <FLoading title='deleting ID' />

        } else if (somethingWrong) {
            return <FWrong tryAgain={ this._tryAgain } />

        } else {
            return (
                <ScrollView style={ layout.paddlessContainerWhite }>
                    <PhotosList photos={ photos } deleteID={ this._deleteId } />
                    <View style={ layout.padBottomWhite }></View>
                </ScrollView>
            );
        }
    }
}


const PhotosList = ({ photos, deleteID }) => {
    const { length } = photos;
    const left = photos.slice(0, Math.ceil(length / 2))
    const right = photos.slice(Math.ceil(length / 2), length);

    return (
        <View style={ layout.columnSeparator } >
            <View style={ { ...layout.column50, padding: 7 } }>
                <Photo photos={ left } deleteID={ deleteID } />
            </View>

            <View style={ { ...layout.column50, padding: 7 }} >
                <Photo photos={ right } deleteID={ deleteID } />
            </View>
        </View>
    );
};


const Photo = ({ photos, deleteID }) => {
    return photos.map(photo => (
        <ID key={ photo.id } photo={ photo } deleteID={ deleteID } />
    ))
};


const ID = ({ photo, deleteID }) => {
    const handler = () => {
        deleteID(photo.id)
    };

    return (
        <View>
            <Text style={ text.autoBlack }>{ photo.identifier }</Text>
            <FImage source={{ uri: `${getHost.host}/uploads/${photo.photo_name}` }} 
                imageStyles={{ height: 120, width: '100%' }}
            />
            <FButton title='delete' buttonStyles={{ borderWidth: 0, padding: 0 }}
                textStyles={{ color: colors.purple }} handler={ handler }
            />
            <View style={{ height: 20 }} ></View>
        </View>
    );
};
