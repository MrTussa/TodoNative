import TodoApp from "./screens/TodoApp";
import CreateTask from "./screens/CreateTask";
import Details from "./screens/Details";
import store from "./store/store";
import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});
/// Используется для отображения стилей в web версии (удалить если web не используется)
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
              headerTintColor: "rgb(96 165 250)",
              headerLeft: () => (
                <TouchableOpacity
                  className="ml-4 w-auto"
                  onPress={() => navigation.navigate("AddItem")}
                >
                  <Entypo
                    name="add-to-list"
                    size={28}
                    color="rgb(96 165 250)"
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
            options={({ navigation }) => ({
              headerTitle: "Add task",
              headerTitleAlign: "center",
              headerTintColor: "rgb(96 165 250)",
              headerLeft: () => (
                <TouchableOpacity
                  className="ml-3 w-auto"
                  onPress={() => navigation.navigate("Todo")}
                >
                  <Ionicons
                    name="chevron-back"
                    size={34}
                    color="rgb(96 165 250)"
                    className="bg-transparent"
                  />
                </TouchableOpacity>
              ),
            })}
            component={CreateTask}
          />
          <Stack.Screen
            name="Details"
            options={({ navigation, route }) => ({
              headerTitle: route.params.item.title,
              headerTitleAlign: "center",
              headerTintColor: "rgb(96 165 250)",
              headerLeft: () => (
                <TouchableOpacity
                  className="ml-3 w-auto"
                  onPress={() => navigation.navigate("Todo")}
                >
                  <Ionicons
                    name="chevron-back"
                    size={34}
                    color="rgb(96 165 250)"
                    className="bg-transparent"
                  />
                </TouchableOpacity>
              ),
            })}
            component={Details}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
