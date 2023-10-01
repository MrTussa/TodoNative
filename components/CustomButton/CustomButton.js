import { Text, TouchableOpacity } from 'react-native';
export default function CustomButton({ title, size = "pt-1 pb-1", onPress, color = "blue", disabled = false, buttonStyle }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`rounded-lg ${disabled === false && color === "red" ? "bg-red-400" : "bg-blue-400 "} ${disabled === true ? "bg-gray-400" : ""} ${size} ${buttonStyle}`}
    >
      <Text className={`text-center ${disabled === false ? "text-white" : "text-gray-700"}  text-lg`}>{title}</Text>
    </TouchableOpacity>
  );
}
