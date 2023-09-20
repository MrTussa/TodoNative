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
import { useState } from "react";
import { Header, ListItem } from "./components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  const startData = [
    {
      id: 1,
      text: "first",
    },
    {
      id: 2,
      text: "second",
    },
  ];
  const [data, setData] = useState(startData);
  const [input, setInput] = useState();
  const onChangeInput = (e) => {
    setInput(e);
  };
  const addItem = () => {
    const newId =
      data[data.length - 1] !== undefined ? data[data.length - 1].id + 1 : 1;
    const newData = [...data, { id: newId + 1, text: input }];
    setData(newData);
    setInput("");
  };
  const deleteHandler = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };
  return (
    <View className="flex-1">
      <SafeAreaProvider className="flex-1">
        <SafeAreaView>
          <Header></Header>
          <View className=" pl-7 pr-7 pb-20">
            <FlatList
              className=""
              data={data}
              renderItem={({ item: { text, id } }) => (
                <ListItem deleteHandler={deleteHandler} id={id} text={text} />
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
