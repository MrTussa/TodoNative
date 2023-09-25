import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  View,
  TextInput,
  Button,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { Header, ListItem } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { addItem, setDropdownValue, filterData } from "../store/todoSlice";
export default function TodoApp() {
  const { data, filteredData, dropdownValue } = useSelector(
    (state) => state.todo
  );
  const dispatch = useDispatch();
  const [input, setInput] = useState();
  //Dropdown states
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownData = [
    { label: "All", value: "all" },
    { label: "Checked", value: "checked" },
    { label: "Unchecked", value: "unchecked" },
  ];
  //
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

  const changeComplitedHandler = () => {
    const newData = data.filter((item) => {
      if (dropdownValue === "checked") {
        return item.checked === true ? item : undefined;
      } else if (dropdownValue === "unchecked") {
        return item.checked === false ? item : undefined;
      } else {
        return item;
      }
    });
    setFilter(newData);
  };
  const setDropdownValueHandler = (event) => {
    console.log(event);
    dispatch(setDropdownValue(event));
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
          <Header></Header>
          <View className="pl-7 pr-7 pb-3">
            <DropDownPicker
              className="font-bold"
              open={openDropdown}
              value={dropdownValue}
              items={dropdownData}
              setOpen={(open) => setOpenDropdown(open)}
              setValue={(event) => setDropdownValueHandler(event)}
            />
          </View>
          <View className=" pl-7 pr-7 pb-20">
            <FlatList
              data={filteredData}
              renderItem={({ item: { text, id, checked } }) => (
                <ListItem checked={checked} id={id} text={text} />
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
