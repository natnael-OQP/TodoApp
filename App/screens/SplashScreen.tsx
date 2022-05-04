import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = ({ navigation }: any) => {
    const [user, setUser] = useState(false)

    const authUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('token')
            setUser(!!jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    console.log(user)

    useEffect(() => {
        authUser()
        if (user) {
            navigation.navigate('Home')
        } else {
            navigation.navigate('SignUp')
        }
    }, [user])

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>
                <ActivityIndicator size={35} />
            </Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
