
import Swal from 'sweetalert2';
import { addCart } from "@/api/cartAPI";

const carts = {
    state: {
        carts: [],
        lastCartId: 1,
    },
    mutations: {
        SET_CARTS(state, payload) {
            state.carts = payload;
        },
        ADD_CART(state, payload) {
            const existingCart = state.carts.find(cart => cart.idUser === payload.idUser);
            
            if (existingCart) {
                const existingProduct = existingCart.products.find(product => product.id === payload.product.id);

                if (existingProduct) {
                    // If the product already exists, increase the quantity
                    existingProduct.quantity += payload.product.quantity;
                } else {
                    // If the product does not exist, add it to the products array
                    existingCart.products.push(payload.product);
                }
            } else {
                // If the cart does not exist, create a new one with an array of products
                const newCart = {
                    id: state.lastCartId++,
                    idUser: payload.idUser,
                    products: [payload.product],
                };
                state.carts.push(newCart);
            }
        },
    },
    actions: {
        async addNewCart({ commit }, product) {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!',
                });
                return;
            }

            const cartItem = {
                idUser: user.id,
                product:[
                    {
                        id: product.id,
                        product_name: product.product_name,
                        unit_price: product.unit_price,
                        quantity: product.quantity,
                    }
                ],
                id: Math.floor(Math.random() * 100000000),
            };

            try {
                await addCart(cartItem);
                // Commit to Vuex store
                commit('ADD_CART', cartItem);
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Sản phẩm đã được thêm vào giỏ hàng.',
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Không thể thêm sản phẩm vào giỏ hàng.',
                });
            }
        },
    },
};

export default carts;       
               