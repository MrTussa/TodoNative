import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ListItem({ text, id, deleteHandler, editFunc }) {
  return (
    <View className="flex flex-row justify-between mb-3 pt-2 pb-2 pl-2 pr-2 border rounded-lg">
      <Text className="text-xl">{text}</Text>
      <MaterialIcons.Button
        iconStyle={{ color: "white" }}
        backgroundColor="red"
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
