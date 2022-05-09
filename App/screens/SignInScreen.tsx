import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
    ActivityIndicator,
    Alert,
} from 'react-native'

import { gql, useMutation } from '@apollo/client'

import AsyncStorage from '@react-native-async-storage/async-storage'

const SignInScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const SignInMutation = gql`
        mutation ($input: SignInInput!) {
            signIn(input: $input) {
                token
                user {
                    email
                    name
                    id
                }
            }
        }
    `

    const [signIn, { data, error, loading }] = useMutation(SignInMutation)

    const handelSubmit = () => {
        signIn({ variables: { input: { email, password } } })
    }

    const storeData = async (value: string) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('token', jsonValue)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert('Invalid credentials')
        }

        if (data) {
            storeData(data.signIn.token)
            navigation.navigate('Home')
        }
    }, [error, data])

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Pressable
                disabled={loading}
                onPress={handelSubmit}
                style={{
                    backgroundColor: '#e33062',
                    width: '100%',
                    borderRadius: 6,
                    paddingVertical: 10,
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{ color: '#FFF', fontSize: 20, fontWeight: '600' }}
                >
                    {loading && <ActivityIndicator style={{ marginLeft: 5 }} />}{' '}
                    Sign In
                </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('SignUp')}
                style={{
                    width: '100%',
                    borderRadius: 6,
                    paddingVertical: 10,
                    marginTop: 25,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: '#e33062',
                        fontSize: 18,
                        fontWeight: '600',
                    }}
                >
                    New here? sign up
                </Text>
            </Pressable>
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        color: '#FFFFFF',
        width: '100%',
        fontSize: 18,
        marginVertical: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})
