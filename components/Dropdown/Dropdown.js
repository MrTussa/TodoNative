import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeDropdownValue } from "../../store/todoSlice";
export default function Dropdown({ }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("all");
  const [items, setItems] = useState([
    { label: "All", value: "all" },
    { label: "Checked", value: "checked" },
    { label: "Unchecked", value: "unchecked" },
  ]);
  const dispatch = useDispatch();
  const setValll = (value) => {
    setValue(value);
  };
  useEffect(() => {
    dispatch(changeDropdownValue(value));
  }, [value]);
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValll}
      setItems={setItems}
      className="bg-gray-50"
      style={{
        borderColor: "rgb(209 213 219)"
      }}

    />
  );
}
