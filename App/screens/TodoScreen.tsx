import { useState } from 'react'
import {
    Platform,
    StyleSheet,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'

import TodoItem from '../components/TodoItem'

export default function TodoScreen() {
    const [title, setTitle] = useState<string>('')
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
        let id = 4
        newTodo.splice(index, 0, {
            id: id + index,
            content: '',
            isCompleted: false,
        })
        setTodos(newTodo)
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={styles.container}
        >
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.title}
            />
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
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        width: '100%',
        color: 'white',
        paddingHorizontal: 7,
        paddingVertical: 4,
    },
})
