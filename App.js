import TodoApp from "./screens/TodoApp";
import store from "./store/store";
import { Provider } from "react-redux";
export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
