import TodoApp from "./screens/TodoApp";
import CreateTask from "./screens/CreateTask";
import store from "./store/store";
import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function App() {
  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Todo"
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity
                  className="ml-4 w-auto"
                  onPress={() => navigation.navigate("AddItem")}
                >
                  <Entypo
                    name="add-to-list"
                    size={28}
                    color="#00CCCC"
                    className="bg-transparent"
                  />
                </TouchableOpacity>
              ),
            })}
            s
            component={TodoApp}
          />
          <Stack.Screen
            name="AddItem"
            // options={{ headerShown: false }}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity
                  className="ml-3 w-auto"
                  onPress={() => navigation.navigate("Todo")}
                >
                  <Ionicons
                    name="chevron-back"
                    size={34}
                    color="#00CCCC"
                    className="bg-transparent"
                  />
                </TouchableOpacity>
              ),
            })}
            component={CreateTask}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
