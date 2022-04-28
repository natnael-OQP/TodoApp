import { StyleSheet, Text, View } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
    isChecked: Boolean
    onPress: () => void
}

const CheckBox = (props: Props) => {
    return (
        <View>
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
        </View>
    )
}

export default CheckBox

const styles = StyleSheet.create({})
