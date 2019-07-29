import { StyleSheet } from 'react-native';
import color from './color';
import { colors } from '../colors';


export default image = StyleSheet.create({
    rectPhoto: {
        height: 350,
        borderWidth: 1,
        borderColor: colors.mediumBlack,
        width: '100%',
    },
    icon: {
        height: 24,
        width: 24,
        alignSelf: 'center',
    },
    avatarIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },

    floatingImage: {
        //resizeMode: 'contain',
        width: 50,
        height: 50,
    },
})
