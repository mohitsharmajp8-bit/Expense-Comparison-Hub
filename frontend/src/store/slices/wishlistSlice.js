import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const loadWishlistFromStorage = () => {
  const savedWishlist = localStorage.getItem('wishlist');
  if (savedWishlist) {
    return JSON.parse(savedWishlist);
  }
  return [];
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
        toast.success('Added to wishlist');
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
      toast.info('Removed from wishlist');
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;