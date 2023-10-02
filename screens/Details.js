import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { checkItem } from "../store/todoSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function Details({ route }) {
  let { text, id, checked, deadline } = route.params.item;
  const [checkedState, setCheckedState] = useState(checked);
  const dispatch = useDispatch();
  const checkItemHandler = () => {
    dispatch(checkItem(id));
    setCheckedState((prevState) => !prevState);
  };
  const currDate = new Date(Date.now());
  const deadlineDiff = (day) => {
    const deadlineDate = new Date(JSON.parse(deadline));
    const timeDiff = deadlineDate.getTime() - currDate.getTime();
    if (day === "day") {
      return Math.floor(timeDiff / (1000 * 3600 * 24));
    } else {
      return Math.floor(
        Math.floor(timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)
      );
    }
  };
  return (
    <SafeAreaProvider className="flex-1">
      <SafeAreaView className="pl-7 pr-7 mt-3">
        {deadline && (
          <>
            <View>
              <Text className="text-center">Deadline at</Text>
              <Text className="text-center text-lg">{new Date(JSON.parse(deadline)).toLocaleDateString("default", { day: "numeric", month: "long", year: "numeric" })}</Text>
            </View>
              <Text className="text-center text-lg">Time left</Text>
            <View className="flex flex-row justify-center gap-3">
              <View className="w-1/3 bg-blue-400 rounded-lg p-5 pt-5">
                <Text className="font-bold text-white text-5xl text-center">
                  {deadlineDiff("day")}
                </Text>
                <Text className="font-semibold text-white text-xl text-center">Days</Text>
              </View>
              <View className="w-1/3 bg-blue-400 rounded-lg p-5 pt-5">
                <Text className="font-bold text-center text-white text-5xl">
                  {deadlineDiff("hours")}
                </Text>
                <Text className="font-semibold text-white text-xl text-center">Hours</Text>
              </View>
            </View>
          </>
        )}
        <View className="pb-3">
          <Text className="font-semibold text-base">Description</Text>
          <Text className="text-sm">{text}</Text>
        </View>
        {checkedState ? (
          <TouchableOpacity
            onPress={checkItemHandler}
            className="bg-red-400 pt-4 pb-4 rounded-lg"
          >
            <Text className="text-center text-white text-lg">Uncheck</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={checkItemHandler}
            className="bg-blue-400 pt-4 pb-4 rounded-lg"
          >
            <Text className="text-center text-white text-lg">Finish</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
