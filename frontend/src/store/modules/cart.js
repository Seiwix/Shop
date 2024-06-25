const state = {
    cartItems: [],
    errorMessage: ""
};

const getters = {
    cartItems: (state) => state.cartItems,
    cartPrice: (state) => {
        return state.cartItems.reduce((price, item) => price + (item.price * item.quantity), 0);
    },
    cartItemCount: (state) => {
        return state.cartItems.reduce((num, item) => num + item.quantity, 0);
    },
    errorMessage: (state) => state.errorMessage
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
    },
    clearCart({
        commit
    }) {
        commit("clearCart");
    },
    clearErrorMessage({
        commit
    }) {
        commit("clearErrorMessage");
    }
};

const mutations = {
    addCartItem(state, payload) {
        const existingItemIndex = state.cartItems.findIndex(item => item.id === payload.id);
        if (existingItemIndex !== -1) {
            const newQuantity = state.cartItems[existingItemIndex].quantity + payload.quantity;
            if (newQuantity <= payload.stockQuantity) {
                state.cartItems[existingItemIndex].quantity = newQuantity;
                state.errorMessage = "";
            } else {
                state.errorMessage = "die gewählte menge überschreitet den Lagerbestand ";
            }
        } else {
            if (payload.quantity <= payload.stockQuantity) {
                state.cartItems.push(payload);
                state.errorMessage = "";
            } else {
                state.errorMessage = "die gewählte Menge überschreitet den Lagerbestand";
            }
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
    },
    clearCart(state) {
        state.cartItems = [];
    },
    clearErrorMessage(state) {
        state.errorMessage = "";
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};