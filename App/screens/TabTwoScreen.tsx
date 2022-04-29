import { StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'

import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.icons}>
                    <MaterialCommunityIcons
                        name="file-outline"
                        color="grey"
                        size={30}
                    />
                </View>
                <Text style={styles.title} numberOfLines={1}>
                    MERN Stack project basse
                </Text>
                <Text style={styles.time}>2d</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    icons: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#404040',
    },
    title: {
        fontSize: 23,
        fontWeight: '500',
        flex: 1,
        marginHorizontal: 10,
    },
    time: {
        fontSize: 16,
        color: 'darkgrey',
    },
})
