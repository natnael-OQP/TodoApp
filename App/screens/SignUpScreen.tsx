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

const SignUpScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const Sign_Up_Mutation = gql`
        mutation ($input: SignUpInput!) {
            signUp(input: $input) {
                token
                user {
                    email
                    name
                    id
                }
            }
        }
    `
    const [SignUp, { data, error, loading }] = useMutation(Sign_Up_Mutation)

    const handelSubmit = () => {
        SignUp({ variables: { input: { name, email, password } } })
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
            Alert.alert('Error SignUp. Try again')
        }

        if (data) {
            // save user
            storeData(data.signUp.token)
            navigation.navigate('Home')
        }
    }, [error, data])

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="something@gmail.com"
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
                disabled={loading}
            >
                <Text
                    style={{ color: '#FFF', fontSize: 20, fontWeight: '600' }}
                >
                    {loading && <ActivityIndicator style={{ marginLeft: 5 }} />}{' '}
                    Sign In
                </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('SignIn')}
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
                    Already have an account ? Sign In
                </Text>
            </Pressable>
        </View>
    )
}

export default SignUpScreen

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
