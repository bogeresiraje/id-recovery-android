import AsyncStorage from '@react-native-community/async-storage';


export const saveCred = async email => {
    await AsyncStorage.setItem('email', email);
};

export const deleteCred = async () => {
    await AsyncStorage.removeItem('email');
};


// Check whether the user has allowed camera, and storage persmissions,
    // otherwise, prompt to allow
export const permissionsAllowed = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.CAMERA
                ]
            );
            if(granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED && 
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED && 
            granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch(error) {
            return false;
        }
    };
