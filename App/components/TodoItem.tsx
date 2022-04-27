import { StyleSheet, TextInput, View } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
    isChecked: Boolean
    onPress: () => void
}

const TodoItem = (props: Props) => {
    return (
        <View style={styles.wrapper}>
            {props.isChecked ? (
                <MaterialCommunityIcons
                    onPress={props.onPress}
                    name="checkbox-marked-outline"
                    size={27}
                    color="white"
                />
            ) : (
                <MaterialCommunityIcons
                    onPress={props.onPress}
                    name="checkbox-blank-outline"
                    size={27}
                    color="white"
                />
            )}

            <TextInput style={styles.input} placeholder="todo" multiline />
        </View>
    )
}

export default TodoItem

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 7,
    },
    input: {
        marginHorizontal: 10,
        color: '#FFFFFF',
        width: '100%',
        fontSize: 18,
    },
})
