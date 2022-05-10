import React, { useState } from "react"
import { View, Text, StyleSheet, Vibration } from "react-native"
import { ProgressBar } from "react-native-paper"
import { Countdown } from "../components/CountDown"
import { Timing } from "./Timing"
import { useKeepAwake } from "expo-keep-awake"
import { spacing } from "../utils/sizes"
import { colors } from "../utils/color"

import { RoundedButton } from "../components/RoundedButton"

const ONE_SECOND_IN_MS = 1000

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
]

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake()
  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(1)
  const [minutes, setMinutes] = useState(0.1)

  const onEnd = reset => {
    Vibration.vibrate(PATTERN)
    setIsStarted(false)
    setProgress(1)
    reset()
    onTimerEnd(focusSubject)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View>
          <View style={{ paddingTop: spacing.xxl }}>
            <Text style={styles.title}>Focusing on:</Text>
            <Text style={styles.tasks}>{focusSubject}</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color={colors.progressBar}
          style={{ heigth: spacing.sm }}
          progress={progress}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={() => clearSubject()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: "row",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  tasks: {
    color: colors.white,
    textAlign: "center",
  },
  clearSubjectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
})
