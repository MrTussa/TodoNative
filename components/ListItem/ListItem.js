import { View, Text, Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { checkItem, deleteItem } from "../../store/todoSlice";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
export default function ListItem({ item }) {
  const navigation = useNavigation();
  const { text, id, checked, title } = item;
  const dispatch = useDispatch();
  const checkItemHandler = () => {
    dispatch(checkItem(id));
  };
  const deleteHandler = () => {
    Alert.alert("Delete task?", text, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(deleteItem(id));
        },
      },
    ]);
  };
  const navigateToDetails = () => {
    navigation.navigate("Details", { item });
  };
  return (
    <View className="flex bg-gray-50 border border-gray-300 text-gray-900 flex-row w-full-inset-6 items-center box-border justify-between mb-3 pt-2 pb-2 pl-2  rounded-lg">
      <View className="flex w-4/6 flex-row items-center">
        <BouncyCheckbox
          onPress={checkItemHandler}
          isChecked={checked}
          disableBuiltInState
          innerIconStyle={{ borderWidth: 3 }}
          size={30}
        />
        <TouchableOpacity
          onPress={navigateToDetails}
          className="break-all w-5/6"
        >
          <Text className="text-xl m-0 p-0">{title}</Text>
          <Text className="text-base">{text}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          deleteHandler();
        }}
        className="pr-2"
      >
      <MaterialIcons
        backgroundColor="transparent"
        name="highlight-remove"
        size={40}
        color="red"
      />
      </TouchableOpacity>
    </View>
  );
}
