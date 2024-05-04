const state = {
    cartItems: []
};

const getters = {
    cartItems: (state) => state.cartItems,
    cartPrice: (state) => {
        return state.cartItems.reduce((price, item) => price + (item.price * item.quantity), 0);
    },
    cartItemCount: state =>{
        return state.cartItems.reduce((num ,item) =>num+item.quantity,0);
    },
};

const actions = {
    addCartItem({
        commit
    }, payload) {
        commit("addCartItem", payload);
    },
    removeCartItem({
        commit
    }, payload) {
        commit("removeCartItem", payload);
    },
    updateCartItemQuantity({
        commit
    }, payload) {
        commit("updateCartItemQuantity", payload);
    }
};

const mutations = {
    addCartItem(state, payload) {
        const existingItem = state.cartItems.find(item => item.id === payload.id);
        if (existingItem) {
            existingItem.quantity += payload.quantity;
        } else {
            state.cartItems.push(payload);
        }
    },
    removeCartItem(state, itemToRemove) {
        state.cartItems = state.cartItems.filter(item => item.id !== itemToRemove.id);
      },
    updateCartItemQuantity(state, payload) {
        const itemIndex = state.cartItems.findIndex(item => item.id === payload.productId);
        if (itemIndex !== -1) {
            state.cartItems[itemIndex].quantity = payload.quantity;
        }
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};