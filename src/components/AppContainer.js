import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createMaterialTopTabNavigator }
    from 'react-navigation';

import { Initial } from './helper/Initial';
import { CreateAccount } from './accessControl/CreateAccount';
import { ConfirmAccount } from './accessControl/ConfirmAccount';
import { Login } from './accessControl/Login';
import { Find } from './home/Find';
import { Profile } from './profile/Profile';
import { About } from './aboutApp/About';
import { FoundProfile } from './home/FoundProfile';
import { ChangeProfilePhoto } from './profile/ChangeProfilePhoto';
import { AddIDPhoto } from './profile/AddIDPhoto';
import { FIconButton } from '../res/custom/FButtons';
import { colors } from '../res/colors';
import { HowTo } from './howTo/HowTo';
import { ViewAll } from './profile/ViewAll';


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
            navigationOptions: () => ({
                ...navConfig
            })
        },
        CreateAccount: {
            screen: CreateAccount,
            navigationOptions: () => ({
                headerTitle: 'Create Account',
                ...inNavConfig
            })
        },
        ConfirmAccount: {
            screen: ConfirmAccount,
            navigationOptions: () => ({
                headerTitle: 'ConfirmAccount',
                ...inNavConfig
            })
        }
    }
);


// Bottom tab navigator
const topNavigator = createMaterialTopTabNavigator(
    {
        Home: Find,
        Profile: Profile,
        HowTo: {
            screen: HowTo,
            navigationOptions: () => ({
                title: 'How To'
            })
        },
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
                headerTitle: 'ID Finder',
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
                headerTitle: 'Found Owner',
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
            screen: AddIDPhoto,
            navigationOptions: () => ({
                headerTitle: 'Add ID Photo',
                ...inNavConfig,
            })
        },
        ViewAll: {
            screen: ViewAll,
            navigationOptions: () => ({
                headerTitle: 'View All Photos',
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
