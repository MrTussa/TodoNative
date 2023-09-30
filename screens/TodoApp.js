import { StatusBar } from "expo-status-bar";
import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { ListItem, Dropdown } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { filterData } from "../store/todoSlice";
export default function TodoApp({ navigation }) {
  const { data, filteredData, dropdownValue } = useSelector(
    (state) => state.todo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterData());
  }, [dropdownValue, data]);
  return (
    <View className="flex-1">
      <SafeAreaProvider className="flex-1">
        <SafeAreaView>
          <View className="pl-7 pr-7 pb-3 mt-3 z-10">
            <Dropdown />
          </View>
          <View className=" pl-7 pr-7 pb-20">
            <FlatList
              data={filteredData}
              renderItem={({ item }) => <ListItem item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
