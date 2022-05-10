import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TextInput } from "react-native-paper"
import { colors } from "../utils/color"
import { spacing } from "../utils/sizes"
import { RoundedButton } from "../components/RoundedButton"

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null)

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="What would you like to focus on"
          onChangeText={subject => setSubject(subject)}
          value={subject}
          style={styles.textInput}
        />
        <View style={styles.button}>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: "center",
    flexDirection: "row",
  },
})
