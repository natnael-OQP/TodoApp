import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import SplashScreen from '../screens/SplashScreen'
import TaskListsScreen from '../screens/TaskListsScreen'
import TodoScreen from '../screens/TodoScreen'
import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName
}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator()

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ title: 'Sign In' }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ title: 'Sign Up' }}
            />
            <Stack.Screen
                name="Home"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: 'Oops!' }}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
    const colorScheme = useColorScheme()

    return (
        <BottomTab.Navigator
            initialRouteName="TaskList"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}
        >
            <BottomTab.Screen
                name="TaskList"
                component={TaskListsScreen}
                options={({ navigation }) => ({
                    title: 'Task Lists',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                })}
            />
            <BottomTab.Screen
                name="Todo"
                component={TodoScreen}
                options={{
                    title: 'Todo',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name']
    color: string
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
