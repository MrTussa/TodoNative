import { View, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../store/todoSlice";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
export default function CreateTask() {
  const dispatch = useDispatch();
  const addItemHandler = (newItem) => {
    dispatch(addItem(newItem));
    Toast.show({
      type: "success",
      text1: "Succesfuly added",
    });
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
              <TextInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Title"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
