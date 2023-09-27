import TodoApp from "./screens/TodoApp";
import store from "./store/store";
import { Provider } from "react-redux";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
