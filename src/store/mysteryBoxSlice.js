import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pendingBoxes: [],
  claimedProducts: [],
}

export const mysteryBoxSlice = createSlice({
  name: "mysteryBox",
  initialState,
  reducers: {
    setPendingBoxes: (state, action) => {
      state.pendingBoxes = action.payload
    },
    addPendingBox: (state, action) => {
      state.pendingBoxes.push(action.payload)
    },
    removePendingBox: (state, action) => {
      state.pendingBoxes = state.pendingBoxes.filter((box) => box._id !== action.payload)
    },
    addClaimedProduct: (state, action) => {
      state.claimedProducts.push(action.payload)
    },
    clearClaimedProducts: (state) => {
      state.claimedProducts = []
    },
  },
})

export const { setPendingBoxes, addPendingBox, removePendingBox, addClaimedProduct, clearClaimedProducts } =
  mysteryBoxSlice.actions

export default mysteryBoxSlice.reducer
