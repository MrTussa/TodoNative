import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
export default function ListItem({ text, id, deleteHandler, editFunc, checkItem }) {
  return (
    <View className="flex flex-row justify-between mb-3 pt-2 pb-2 pl-2 pr-2 border rounded-lg">
      <View className="flex flex-row items-center">
        <BouncyCheckbox onPress={() => checkItem(id)} innerIconStyle={{ borderWidth: 3 }} size={27} />
        <Text className="text-xl">{text}</Text>
      </View>
      <MaterialIcons.Button
        iconStyle={{ color: "red" }}
        backgroundColor="white"
        className="p-1 pr-0 m-0"
        name="highlight-remove"
        size={34}
        color="black"
        onPress={() => {
          deleteHandler(id);
        }}
      />
    </View>
  );
}
