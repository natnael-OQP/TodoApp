import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import TodoItem from '../components/TodoItem'

export default function TabOneScreen({
    navigation,
}: RootTabScreenProps<'TabOne'>) {
    const [value, setValue] = useState<Boolean>(false)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <TodoItem isChecked={value} onPress={() => setValue(!value)} />
            <TodoItem isChecked={value} onPress={() => setValue(!value)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})
