import { createSlice } from "@reduxjs/toolkit";
const startData = [
  {
    id: 1,
    title: "First",
    text: "First text  example",
    checked: false,
  },
  {
    id: 2,
    title: "Second",
    text: "Second text  example",
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
      const { isChecked, id } = action.payload;
      const newData = state.data.map((item) =>
        item.id === id ? { ...item, checked: isChecked } : item
      );
      state.data = newData;
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const newData = state.data.filter((item) => item.id !== id);
      state.data = newData;
    },
    addItem: (state, action) => {
      const { text, title } = action.payload;
      const newId =
        state.data[state.data.length - 1] !== undefined
          ? state.data[state.data.length - 1].id + 1
          : 1;
      const newData = [
        ...state.data,
        { id: newId + 1, text: text, title: title, checked: false },
      ];
      state.data = newData;
    },
    filterData: (state) => {
      const newData = state.data.filter((item) => {
        if (state.dropdownValue.payload === "checked") {
          return item.checked === true ? item : undefined;
        } else if (state.dropdownValue.payload === "unchecked") {
          return item.checked === false ? item : undefined;
        } else {
          return item;
        }
      });
      state.filteredData = newData;
    },
    changeDropdownValue: (state, action) => {
      state.dropdownValue = action;
      filterData();
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  checkItem,
  deleteItem,
  addItem,
  setDropdownValue,
  filterData,
  changeDropdownValue,
} = todoSlice.actions;

export default todoSlice.reducer;
