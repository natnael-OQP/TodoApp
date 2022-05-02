import { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const SplashScreen = ({ navigation }: any) => {
    const user = true
    useEffect(() => {
        if (user) {
            navigation.navigate('Home')
        } else {
            navigation.navigate('SignIn')
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
