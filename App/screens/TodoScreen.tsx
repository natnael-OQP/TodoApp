import { useState, useEffect } from 'react'
import {
    Platform,
    StyleSheet,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
    View,
} from 'react-native'

import TodoItem from '../components/TodoItem'
import { gql, useMutation, useQuery } from '@apollo/client'

export default function TodoScreen({ route }: any) {
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
    let { id } = route.params

    const getMyTaskLists = gql`
        query ($id: ID!) {
            getTaskList(id: $id) {
                title
                id
                progress
                createdAt
                todos {
                    content
                    id
                    isCompleted
                }
            }
        }
    `

    const { data, error, loading } = useQuery(getMyTaskLists, {
        variables: { id },
    })

    const Create_Todo = gql`
        mutation ($content: String!, $taskListId: ID!) {
            createTodo(content: $content, taskListId: $taskListId) {
                content
                id
                isCompleted
                taskList {
                    id
                    title
                    progress
                    createdAt
                    todos {
                        content
                        id
                        isCompleted
                    }
                }
            }
        }
    `

    const [
        createTodo,
        { data: newTodoData, error: newTodoError, loading: newTodoLoading },
    ] = useMutation(Create_Todo, { refetchQueries: getMyTaskLists })

    useEffect(() => {
        if (error) {
            console.log(error)

            Alert.alert('Error Fetching Task Lists', error.message)
        }
    }, [error])

    useEffect(() => {
        if (data) {
            setTitle(data.getTaskList.title)
        }
        console.log(data?.getTaskList?.todos?.length > 0)

        if (data?.getTaskList?.todos?.length > 0) {
            setTodos(data.getTaskList.todos)
        }
    }, [data])

    const onSubmit = () => {
        createTodo({ variables: { content: '', taskListId: id } })
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    if (loading)
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        )

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
                    <TodoItem todo={item} onSubmit={() => onSubmit()} />
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
