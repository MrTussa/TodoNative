import { createSlice } from "@reduxjs/toolkit";
const startData = [
  {
    id: 1,
    text: "first",
    checked: false,
  },
  {
    id: 2,
    text: "second",
    checked: false,
  },
];
export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: startData,
    filteredData: startData,
    dropdownValue: "All",
  },
  reducers: {
    checkItem: (state, action) => {
      const { e, id } = action.payload;
      const newData = state.data.map((item) =>
        item.id === id ? { ...item, checked: e } : item
      );

      state.data = newData;
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const newData = state.data.filter((item) => item.id !== id);
      state.data = newData;
    },
    addItem: (state, action) => {
      state.data = action.payload;
    },
    filterData: (state) => {
      const newData = state.data.filter((item) => {
        if (this.dropdownValue === "checked") {
          return item.checked === true ? item : undefined;
        } else if (this.dropdownValue === "unchecked") {
          return item.checked === false ? item : undefined;
        } else {
          return item;
        }
      });
      state.filteredData = newData;
    },
    setDropdownValue: (state, action) => {
      console.log(action.payload);
      state.dropdownValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkItem, deleteItem, addItem, setDropdownValue, filterData } =
  todoSlice.actions;

export default todoSlice.reducer;
