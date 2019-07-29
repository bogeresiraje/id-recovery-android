import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FIcon, FImage } from './FImages';
import { FText } from './FText';


export const FContactPhoto = (props) => {
    const { title, imageUrl } = props;

    return (
        <View style={ layout.padded }>
            <View style={ layout.columnSeparator }>
                <View style={ layout.column20 }>
                    <FIcon source={ require('../../res/icons/gallery.png') } />
                </View>
                
                <View style={ layout.column80 }>
                    <FText title={ title }
                        textStyles={{ textAlign: 'left', fontWeight: 'bold' }}
                    /> 
                </View>
            </View>

            <FImage
                source={{ uri: imageUrl }}
            />
        </View>
    );
}


export const FContactPhotoClickable = (props) => {
    const { title, handler, imageUrl } = props;

    return (
        <View style={ layout.padded }>
            <View style={ layout.columnSeparator }>
                <View style={ layout.column20 }>
                    <FIcon source={ require('../../res/icons/gallery.png') } />
                </View>
                
                <View style={ layout.column80 }>
                    <FText title={ title }
                        textStyles={{ textAlign: 'left', fontWeight: 'bold' }}
                    /> 
                </View>
            </View>

            <TouchableOpacity onPress={ () => handler() } activeOpacity={ 0.9 }>
                <FImage
                    source={{ uri: imageUrl }}
                />
            </TouchableOpacity>
        </View>
    );
};
