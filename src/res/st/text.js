import { StyleSheet } from 'react-native';
import color from './color';


export default text = StyleSheet.create({
    leftBlack: {
        width: '100%',
        textAlign: 'left',
        paddingTop: 2,
        paddingBottom: 2,
        color: color.mediumBlack,
    },

    leftBlackExtra: {
        width: '100%',
        textAlign: 'left',
        paddingTop: 7,
        paddingBottom: 7,
        color: color.mediumBlack,
    },

    black: {
        width: '100%',
        textAlign: 'left',
        paddingTop: 7,
        paddingBottom: 2,
        color: color.black,
    },

    leftYellow: {
        width: '100%',
        textAlign: 'left',
        paddingTop: 2,
        paddingBottom: 2,
        color: color.darkTheme,
    },


    autoWhite: {
        width: '100%',
        textAlign: 'center',
        color: color.white,
        paddingTop: 7,
        paddingBottom: 2,
    },

    autoBlack: {
        width: '100%',
        textAlign: 'center',
        color: color.mediumBlack,
        paddingTop: 7,
        paddingBottom: 2,
    },

    autoYellow: {
        width: '100%',
        textAlign: 'center',
        color: color.darkTheme,
        paddingTop: 7,
        paddingBottom: 2,
    },

    autoGreen: {
        width: '100%',
        textAlign: 'center',
        color: 'green',
        paddingTop: 7,
        paddingBottom: 0,
    },
    
    autoRed: {
        color: 'red',
        textAlign: 'center',
        paddingTop: 2,
        paddingBottom: 0,
    },

    rightBlack: {
        width: '100%',
        textAlign: 'right',
        paddingTop: 2,
        paddingBottom: 2,
        color: color.mediumBlack,
    },

    navyBlue: {
        color: color.navyBlue,
        textAlign: 'left',
        paddingTop: 2,
        paddingBottom: 2,
    },

    red: {
        color: color.red,
        textAlign: 'left',
        paddingTop: 2,
        paddingBottom: 2,
    },

    boldBlack: {
        color: color.black,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingTop: 2,
        paddingLeft: 2,
        paddingBottom: 2,
    },

    boldBlackExtra: {
        color: color.black,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingTop: 7,
        paddingLeft: 2,
        paddingBottom: 7,
    },

    boldBlackRight: {
        color: color.black,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingTop: 2,
        paddingRight: 2,
        paddingBottom: 2,
    },

    boldBlackCenter: {
        color: color.black,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 2,
        paddingBottom: 2,
    },

    blackSmall: {
        fontSize: 12,
        color: color.black,
        textAlign: 'left',
        paddingTop: 2,
        paddingBottom: 2,
    },

    blackSmallRight: {
        fontSize: 12,
        color: color.black,
        textAlign: 'right',
        paddingTop: 2,
        paddingBottom: 2,
    },

    centerBoldBlack: {
        color: color.black,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 15,
    },
    rightDullBlack: {
        textAlign: 'right',
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        borderTopWidth: 0.5,
        borderTopColor: color.dullBlack,
    },
    centerBlack: {
        color: '#555',
        paddingTop: 12,
        fontSize: 18,
        paddingBottom: 5,
        textAlign: 'center',
    },

    centerDullBlack: {
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 3,
    },
    centerBlackHeading: {
        fontWeight: 'bold',
        color: '#333',
        paddingTop: 2,
        paddingBottom: 2,
        textAlign: 'center',
    },
    blackHeading: {
        fontWeight: 'bold',
        color: '#333',
        padding: 5,
        fontSize: 15,
    },
    smallMediumBlack: {
        color: color.mediumBlack,
        fontSize: 10,
    }
})