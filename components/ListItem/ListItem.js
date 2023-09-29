import { View, Text, Alert } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { checkItem, deleteItem } from "../../store/todoSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";
export default function ListItem({ text, id, editFunc, checked, title }) {
  const dispatch = useDispatch();
  const checkItemHandler = (isChecked, id) => {
    dispatch(checkItem({ isChecked, id }));
  };
  const deleteHandler = (id) => {
    console.log("Asdasd");
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
  return (
    <View className="flex bg-white flex-row w-full-inset-6 items-center box-border justify-between mb-3 pt-2 pb-2 pl-2 border rounded-lg">
      <View className="flex w-4/6 flex-row items-center">
        <BouncyCheckbox
          onPress={(e) => checkItemHandler(e, id)}
          isChecked={checked}
          innerIconStyle={{ borderWidth: 3 }}
          size={27}
        />
        {/* <Text className="text-xl">{text}</Text> */}
        <View className="break-all w-5/6">
          <Text className="text-xl m-0 p-0">{title}</Text>
          <Text className="text-base">{text}</Text>
        </View>
      </View>
      <MaterialIcons.Button
        backgroundColor="white"
        className="p-1 pr-0 m-0"
        name="highlight-remove"
        size={34}
        color="red"
        onPress={() => {
          deleteHandler(id);
        }}
      />
    </View>
  );
}
