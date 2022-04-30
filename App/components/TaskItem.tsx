import { StyleSheet, Pressable } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Text, View } from './Themed'

interface Props {
    task: {
        id: string
        title: string
        createdAt: string
    }
    onPress: () => void
}

const TaskItem = ({ task, onPress }: Props) => {
    const { id, title, createdAt } = task
    return (
        <Pressable onPress={onPress} style={styles.wrapper}>
            <View style={styles.icons}>
                <MaterialCommunityIcons
                    name="file-outline"
                    color="grey"
                    size={30}
                />
            </View>
            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>
            <Text style={styles.time}>{createdAt}</Text>
        </Pressable>
    )
}

export default TaskItem

const styles = StyleSheet.create({
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
