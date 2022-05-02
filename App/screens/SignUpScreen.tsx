import { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'

const SignUpScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handelSubmit = () => {}

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
            >
                <Text
                    style={{ color: '#FFF', fontSize: 20, fontWeight: '600' }}
                >
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
