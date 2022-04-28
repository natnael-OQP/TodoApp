import { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Text, View } from '../components/Themed'

import TodoItem from '../components/TodoItem'

export default function TabOneScreen() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            content: 'Muy milk',
            isCompleted: true,
        },
        {
            id: 2,
            content: 'Muy coffee',
            isCompleted: false,
        },
        {
            id: 3,
            content: 'todo app',
            isCompleted: false,
        },
    ])

    const onSubmit = (index: number) => {
        const newTodo = [...todos]
        newTodo.splice(index, 0, {
            id: index,
            content: '',
            isCompleted: false,
        })
        setTodos(newTodo)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <FlatList
                style={{ width: '100%' }}
                data={todos}
                keyExtractor={(item: {
                    id: number
                    content: string
                    isCompleted: boolean
                }) => item.id}
                renderItem={({ item, index }) => (
                    <TodoItem
                        todo={item}
                        onSubmit={() => onSubmit(index + 1)}
                    />
                )}
            />
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
