import { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import { View } from '../components/Themed'

import TaskItem from '../components/TaskItem'

export default function TaskListsScreen() {
    const [tasks, setTasks] = useState([
        { id: '1', title: 'build app', createdAt: '2d' },
        { id: '2', title: 'learn back-end ', createdAt: '1h' },
        { id: '3', title: 'learn aws amplify', createdAt: '5h' },
        { id: '4', title: 'real time chat app', createdAt: '30m' },
    ])

    const onPressTaskItem = (id: string) => {
        console.log(id)
    }

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
