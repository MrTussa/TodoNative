import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../store/todoSlice";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { CustomButton } from '../components';
import Toast from "react-native-toast-message";
export default function CreateTask() {
  const [picker, setPicker] = useState(false);
  const [hasDeadline, setHasDeadline] = useState(true)
  const [date, setDate] = useState(new Date(Date.now()));
  const currDate = new Date(Date.now())
  const setDeadlineHandler = () => {
    setHasDeadline((prevState) => !prevState)
  }
  const showPicker = () => {
    setPicker(true);
  };
  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setPicker(false);
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
      if (hasDeadline) {
        const newData = { ...newItem, deadline: date }
        dispatch(addItem(newData));
      } else {
        dispatch(addItem(newItem));
      }
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
              {hasDeadline ? (
                <CustomButton
                  onPress={setDeadlineHandler}
                  title="Disable deadline"
                  color="red"
                  size="pt-3 pb-3"
                />
              ) : (
                <CustomButton
                  onPress={setDeadlineHandler}
                  title="Enable deadline"
                  size="pt-3 pb-3"
                />
              )}
              <View className=" mb-3 mt-3">
                <View className="flex flex-row justify-between">
                  <CustomButton
                    onPress={showPicker}
                    disabled={!hasDeadline}
                    title="Set deadline"
                    buttonStyle="w-1/2"
                  />
                  <Text className={` ${hasDeadline === true ? "text-blue-400" : "text-gray-500"} text-2xl `}>{date.toLocaleDateString()}</Text>
                  {picker && (
                    <DateTimePicker
                      minimumDate={currDate}
                      value={date}
                      mode={"date"}
                      onChange={onChange}
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
              <CustomButton
                onPress={handleSubmit}
                size="pt-3 pb-3"
                title="Submit"
              />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
