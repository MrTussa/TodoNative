import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { checkItem } from "../store/todoSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function Details({ route }) {
  let { text, id, checked, title } = route.params.item;
  const [checkedState, setCheckedState] = useState(checked);
  const dispatch = useDispatch();
  const checkItemHandler = () => {
    dispatch(checkItem(id));
    setCheckedState((prevState) => !prevState);
  };
  return (
    <SafeAreaProvider className="flex-1">
      <SafeAreaView className="pl-7 pr-7 mt-3">
        <View className="pb-3">
          <Text>Date</Text>
        </View>
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
