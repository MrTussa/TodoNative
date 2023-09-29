import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  View,
  TextInput,
  Button,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { Header, ListItem, Dropdown } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { addItem, filterData } from "../store/todoSlice";
export default function TodoApp() {
  const { data, filteredData, dropdownValue } = useSelector(
    (state) => state.todo
  );
  const dispatch = useDispatch();
  const [input, setInput] = useState();
  //Dropdown states
  const onChangeInput = (e) => {
    setInput(e);
  };
  const addItemHandler = () => {
    const newId =
      data[data.length - 1] !== undefined ? data[data.length - 1].id + 1 : 1;
    const newData = [...data, { id: newId + 1, text: input, checked: false }];
    dispatch(addItem(newData));
    setInput("");
  };
  const editFunc = (event, id) => {
    const { value } = e.target;
    const objIndex = data.findIndex((obj) => obj.id === parseInt(index));
    const newData = data.map((obj) =>
      obj.id === objIndex ? { ...obj, text: value } : obj
    );
    setData(newData);
  };
  useEffect(() => {
    // changeComplitedHandler();
    dispatch(filterData());
  }, [dropdownValue, data]);
  return (
    <View className="flex-1">
      <SafeAreaProvider className="flex-1">
        <SafeAreaView>
          {/* <Header></Header> */}
          <View className="pl-7 pr-7 pb-3 mt-3 z-10">
            <Dropdown />
          </View>
          <View className=" pl-7 pr-7 pb-20">
            <FlatList
              data={filteredData}
              renderItem={({ item: { text, id, checked, title } }) => (
                <ListItem checked={checked} id={id} text={text} title={title} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex flex-row justify-between w-full h-9 pl-7 pr-7 mb-7 bg-white">
          <TextInput
            className="w-2/3 border rounded-lg"
            value={input}
            onChangeText={onChangeInput}
            placeholder="Text"
          />
          <Button
            className="w-full"
            title="add item"
            onPress={addItemHandler}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
