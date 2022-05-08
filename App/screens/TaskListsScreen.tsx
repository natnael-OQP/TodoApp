import { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Alert } from 'react-native'

import { View } from '../components/Themed'

import TaskItem from '../components/TaskItem'
import { gql, useQuery } from '@apollo/client'

export default function TaskListsScreen({ navigation }: any) {
    const [tasks, setTasks] = useState([
        { id: '1', title: 'build app', createdAt: '2d' },
        { id: '2', title: 'learn back-end ', createdAt: '1h' },
        { id: '3', title: 'learn aws amplify', createdAt: '5h' },
        { id: '4', title: 'real time chat app', createdAt: '30m' },
    ])

    const myTaskList = gql`
        query {
            myTaskList {
                title
                id
            }
        }
    `
    const { loading, error, data } = useQuery(myTaskList)

    useEffect(() => {
        if (error) {
            Alert.alert('Error Fetching Task Lists', error.message)
        }
        if (data) {
            setTasks(data.myTaskList)
        }
    }, [error, data])

    const onPressTaskItem = (id: string) => {
        console.log(id)
        navigation.navigate('Todo', { id })
    }

    console.log(tasks)

    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }}
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onPress={() => onPressTaskItem(item.id)}
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
})
