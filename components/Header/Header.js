import { View, Text } from "react-native";
export default function Header({}) {
  return (
    <View className=" h-9 border-b border-gray-400 mb-4">
      <Text className="text-center font-bold text-2xl">Todo</Text>
    </View>
  );
}
