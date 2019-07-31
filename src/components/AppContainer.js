import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createMaterialTopTabNavigator }
    from 'react-navigation';

import { Login } from './accessControl/Login';
import { Initial } from './helper/Initial';
import { Posts } from './home/Posts';
import { Profile } from './profile/Profile';
import { Find } from './findID/Find';
import { About } from './aboutApp/About';
import { CreateAccount } from './accessControl/CreateAccount';
import { ConfirmAccount } from './accessControl/ConfirmAccount';
import { ChangeProfilePhoto } from './profile/ChangeProfilePhoto';
import { ChangeIDPhoto } from './profile/ChangeIDPhoto';
import { FoundProfile } from './findID/FoundProfile';
import { FIconButton } from '../res/custom/FButtons';
import { colors } from '../res/colors';


// Initial component when the app is started
const initialLoad = createStackNavigator(
    {
        Initial: Initial,
    },
    {
        headerMode: 'none',
    }
);


// Authentication panel that prompts you to log in or create account
const authNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
        },
        CreateAccount: {
            screen: CreateAccount,
        },
        ConfirmAccount: {
            screen: ConfirmAccount
        }
    },
    {
        headerMode: 'none',
    }
);


// Bottom tab navigator
const topNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Posts,
            navigationOptions: {
                // to do
            }
        },
        Find: Find,
        Profile: Profile,
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: colors.purple,
            inactiveTintColor: colors.black,
            labelStyle: {
                fontSize: 12,
                padding: 5,
            },
            indicatorStyle: {
                backgroundColor: colors.purple,
            },
            style: {
                backgroundColor: colors.white,
                color: colors.black,
            }
        }
    }
);

const TopTab = createAppContainer(topNavigator);


// Main ( App ) when the user has or is-already logged in
const mainNavigator = createStackNavigator(
    {
        Tab: {
            screen: TopTab,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'ID Recovery',
                headerRight: (
                    <FIconButton
                        source={ require('../res/icons/about.png')}
                        onPress={ () => navigation.navigate('About') }
                        iconStyles={{ marginRight: 30, tintColor: colors.purple }}
                    />
                ),
                ...navConfig
            })
        },
        FoundProfile: {
            screen: FoundProfile,
            navigationOptions: () => ({
                headerTitle: 'Found User',
                ...inNavConfig,
            })
        },
        About: {
            screen: About,
            navigationOptions: () => ({
                headerTitle: 'About Us',
                ...inNavConfig,
            })
        },
        ChangeProfilePhoto: {
            screen: ChangeProfilePhoto,
            navigationOptions: () => ({
                headerTitle: 'Change Profile Photo',
                ...inNavConfig,
            })
        },
        ChangeIDPhoto: {
            screen: ChangeIDPhoto,
            navigationOptions: () => ({
                headerTitle: 'Change ID Photo',
                ...inNavConfig,
            })
        },
    },
    {
        mode: 'modal',
        headerMode: 'float',
        initialRouteName: 'Tab',
        headerTransitionPreset: 'fade-in-place',
    }
);


// Config for main Navigation Componenets
const navConfig = {
    headerStyle: {
        color: colors.purple,
        tintColor: colors.purple,
        elevation: 0,      
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
        color: colors.purple,
    },
    headerTintColor: colors.purple,
}

// Config for in-stack navs
const inNavConfig = {
    headerStyle: {
        color: colors.purple,
        tintColor: colors.purple,
    },
    headerTitleStyle: {
        color: colors.purple,
    },
    headerTintColor: colors.purple,
}


// Main app container
const appContainer = createSwitchNavigator(
    {
        Initial: initialLoad,
        Auth: authNavigator,
        Main: mainNavigator,
    },
    {
        initialRouteName: 'Initial',
    }
);


export default createAppContainer(appContainer);
