import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import CheckBox from './CheckBox'

interface Props {
    todo: {
        id: number
        content: string
        isCompleted: boolean
    }
    onSubmit: () => void
}

const TodoItem = ({ todo, onSubmit }: Props) => {
    const { content, id, isCompleted } = todo
    const [input, setInput] = useState<string>(content)
    const [isChecked, setIsChecked] = useState(isCompleted)
    const inputRef = useRef(null)

    useEffect(() => {
        if (!todo) return
        setIsChecked(isCompleted)
        setInput(content)
    }, [todo])

    useEffect(() => {
        if (inputRef?.current) inputRef?.current.focus()
    }, [inputRef])

    const onKeyPress = ({ nativeEvent: { key: keyValue } }: any) => {
        if (keyValue === 'Backspace' && input === '') {
            console.warn('delete item')
        }
    }

    return (
        <View style={styles.wrapper}>
            <CheckBox
                isChecked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
            />
            <TextInput
                ref={inputRef}
                value={input}
                onChangeText={setInput}
                style={styles.input}
                placeholder="todo"
                multiline
                onSubmitEditing={onSubmit}
                blurOnSubmit
                onKeyPress={onKeyPress}
            />
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
