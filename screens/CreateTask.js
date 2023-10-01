import { View, TextInput, Button, Text } from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../store/todoSlice";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import Toast from "react-native-toast-message";
export default function CreateTask() {
  const [pickerStart, setPickerStart] = useState(false);
  const [pickerEnd, setPickerEnd] = useState(false);
  const [dateStart, setDateStart] = useState(new Date(Date.now()));
  const [dateEnd, setDateEnd] = useState(new Date(Date.now()));
  const currDate = new Date(Date.now())
  const showPickerStart = () => {
    setPickerStart(true);
  };
  const showPickerEnd = () => {
    setPickerEnd(true);
  };
  const onChange = (type, value) => {
    if (type === "start") {
      setDateStart(value);
      if (Platform.OS === "android") {
        setPickerStart(false);
      }
    } else {
      setDateEnd(value);
      if (Platform.OS === "android") {
        setPickerEnd(false);
      }
    }
  };
  const dispatch = useDispatch();
  const addItemHandler = (newItem) => {
    if (newItem.title === "") {
      Toast.show({
        type: "error",
        text1: "Enter title!",
      });
    } else if (newItem.text === "") {
      Toast.show({
        type: "error",
        text1: "Enter description!",
      });
    } else {
      dispatch(addItem(newItem));
      Toast.show({
        type: "success",
        text1: "Successfully added",
      });
    }
  };
  return (
    <SafeAreaProvider className="flex-1">
      <SafeAreaView className="pl-7 pr-7 mt-3">
        <Toast className="z-50" />
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={(values) => addItemHandler(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View className="-z-10">
              <View className="flex flex-row justify-between mb-3">
                <View className="w-2/5">
                  <Text className="text-blue-400 text-base font-semibold">Start: {dateStart.toLocaleDateString()}</Text>
                  <Button
                    title="Set start date"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                    onPress={showPickerStart}
                  />
                  {pickerStart && (
                    <DateTimePicker
                      minimumDate={currDate}
                      value={dateStart}
                      mode={"date"}
                      onChange={(event, value) => onChange("start", value)}
                    />
                  )}
                </View>
                <View className="w-2/5">
                  <Text className="text-blue-400 text-base font-semibold">Ends: {dateEnd.toLocaleDateString()}</Text>
                  <Button
                    title="Set end day"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                    onPress={showPickerEnd}
                  />

                  {pickerEnd && (
                    <DateTimePicker
                      minimumDate={dateStart}
                      value={dateEnd}
                      mode={"date"}
                      onChange={(event, value) => onChange("end", value)}
                    />
                  )}
                </View>
              </View>
              <Text className="text-blue-400 text-base font-semibold">
                Title
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Title"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              <Text className="text-blue-400 text-base font-semibold">
                Description
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Text"
                onChangeText={handleChange("text")}
                onBlur={handleBlur("text")}
                value={values.text}
              />
              <Button
                onPress={handleSubmit}
                title="Submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
