import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from "react";
import { Header, ListItem } from "./components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  const startData = [
    {
      id: 1,
      text: "first",
      checked: false,
    },
    {
      id: 2,
      text: "second",
      checked: false,
    },
  ];
  const [filter, setFilter] = useState(data);
  const [data, setData] = useState(startData);
  const [input, setInput] = useState();
  //Dropdown states
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const dropdownData = [
    { label: 'All', value: 'all' },
    { label: 'Checked', value: 'checked' },
    { label: 'Unchecked', value: 'unchecked' },
  ]
  //
  const onChangeInput = (e) => {
    setInput(e);
  };
  const addItem = () => {
    const newId =
      data[data.length - 1] !== undefined ? data[data.length - 1].id + 1 : 1;
    const newData = [...data, { id: newId + 1, text: input, checked: false }];
    setData(newData);
    setInput("");
  };
  const deleteHandler = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };
  const checkItem = (e, id) => {
    const newData = data.map((item) => item.id === id ? { ...item, checked: e } : item)
    setData(newData)
  }
  const changeComplitedHandler = () => {
    const newData = data.filter((item) => {
      if (dropdownValue === "checked") {
        return item.checked === true ? item : undefined
      } else if (dropdownValue === "unchecked") {
        return item.checked === false ? item : undefined
      } else {
        return item
      }
    })
    setFilter(newData)
  }
  useEffect(() => {
    changeComplitedHandler()
  }, [dropdownValue, data])
  return (
    <View className="flex-1">
      <SafeAreaProvider className="flex-1">
        <SafeAreaView>
          <Header></Header>
          <View className="pl-7 pr-7 pb-3">
            <DropDownPicker
              open={openDropdown}
              value={dropdownValue}
              items={dropdownData}
              setOpen={(open) => setOpenDropdown(open)}
              setValue={(value) => setDropdownValue(value)}
            />
          </View>
          <View className=" pl-7 pr-7 pb-20">
            <FlatList
              className=""
              data={filter}
              renderItem={({ item: { text, id, checked } }) => (
                <ListItem deleteHandler={deleteHandler} checked={checked} checkItem={checkItem} id={id} text={text} />
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
          <Button className="w-full" title="add item" onPress={addItem} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
