import { View, Text, Alert } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { checkItem, deleteItem } from "../../store/todoSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";
export default function ListItem({ text, id, editFunc, checked }) {
  const dispatch = useDispatch();
  const checkItemHandler = (e, id) => {
    dispatch(checkItem({ e, id }));
  };
  const deleteHandler = (id) => {
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
    <View className="flex flex-row w-full-inset-6 box-border justify-between mb-3 pt-2 pb-2 pl-2 border rounded-lg">
      <View className="flex w-9/12 flex-row items-center">
        <BouncyCheckbox
          onPress={(e) => checkItemHandler(e, id)}
          isChecked={checked}
          innerIconStyle={{ borderWidth: 3 }}
          size={27}
        />
        {/* <Text className="text-xl">{text}</Text> */}
        <View className="break-all w-5/6">
          <Text className="text-xl m-0 p-0">{ }test</Text>
          <Text className="text-base">{text}</Text>
        </View>
      </View>
      <View className="flex  w-24 flex-row items-center">
        <MaterialCommunityIcons.Button
          backgroundColor="white"
          className="p-0 pr-0 m-0 box"
          name="circle-edit-outline"
          size={31}
          color="black"
          onPress={(event) => {
            editFunc(event, id);
          }}
        />
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
    </View >
  );
}
