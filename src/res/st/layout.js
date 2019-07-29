import { StyleSheet, Dimensions } from 'react-native';
import color from './color';


export default layout = StyleSheet.create({
    container: {
        width: 'auto',
        padding: 7,
        minHeight: '100%',
        width: '100%',
        backgroundColor: color.lightGrey,
    },

    containerMini: {
        width: 'auto',
        padding: 7,
        height: 'auto',
        width: '100%',
        backgroundColor: color.lightGrey,
    },

    floatedContainer: {
        width: 'auto',
        padding: 7,
        height: Dimensions.get("window").height,
        width: '100%',
        backgroundColor: color.lightGrey,
    },

    containerWhite: {
        width: 'auto',
        padding: 7,
        minHeight: '100%',
        width: '100%',
    },

    containerWhiteMini: {
        width: 'auto',
        padding: 7,
        height: 'auto',
        width: '100%',
    },

    paddlessContainer: {
        width: '100%',
        minHeight: '100%',
        alignContent: 'center',
        backgroundColor: color.lightGrey,
    },

    paddlessContainerWhite: {
        width: '100%',
        minHeight: '100%',
        alignContent: 'center',
    },

    paddlessContainerWhiteMini: {
        width: '100%',
        height: 'auto',
        alignContent: 'center',
        padding: 7,
    },

    padBottom: {
        height: 50,
        flex: 1,
        backgroundColor: color.lightGrey,
    },

    padBottomWhite: {
        height: 50,
    },

    inScrollContainer: {
        width: 'auto',
        padding: 7,
        alignContent: 'center',
        marginBottom: 50,
    },

    bottomPagePadding: {
        width: '100%',
        height: 100,
    },

    sectionContainer: {
        padding: 7,
        width: '100%',
        alignContent: 'center',
    },

    // for handling multi-column views
    columnSeparator: {
        flexDirection: 'row',
        backgroundColor: color.white,
        width: '100%',
    },

    columnSeparatorGrey: {
        flexDirection: 'row',
        backgroundColor: color.lightGrey,
        width: '100%',
    },

    column4: {
        width: '4%',
    },

    column6: {
        width: '6%',
    },

    column10: {
        width: '10%',
    },

    column20: {
        width: '20%',
    },

    column40: {
        width: '40%',
    },

    column41: {
        width: '41%',
    },

    column44: {
        width: '44%',
    },
    
    column45: {
        width: '45%',
    },

    column50: {
        width: '50%',
    },

    column60: {
        width: '60%',
    },

    column80: {
        width: '80%',
        justifyContent: 'center',
    },

    column90: {
        width: '90%',
    },

    column100: {
        width: '100%',
    },

    borderColumn50: {
        width: '50%',
        borderBottomWidth: 0.5,
        borderBottomColor: color.mediumBlack,
    },

    paddedColumn50: {
        width: '50%',
        minHeight: '100%',
        padding: 7,
        backgroundColor: color.lightGrey,
    },

    column45Right: {
        width: '45%',
        alignContent: 'flex-end',
    },

    column40px: {
        width: 35,
    },
    sparse: {
        height: 40,
        width: '100%',
    },
    horizontalScroll: {
        width: 280,
    },

    // Fixed column
    column10RoundFixed: {
        width: 30,
        height: 30,
        borderRadius: 17,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: color.mediumBlack,
    },

    alignCenter: {
        width: '50%',
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    column25px: {
        width: 25,
    },

    listData: {
        padding: 7,
        borderTopWidth: 0.5,
        borderTopColor: color.dullBlack,
    },

    column60roll: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: color.white,
    },

    padded: {
        paddingBottom: 20,
    }

})