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
               
// import { addCart, getCartByUserId } from "@/api/cartAPI";
// import Swal from "sweetalert2";
// const carts = {
//     state: {
//         carts: [],
//         lastCartId: 1,
//     },
//     mutations: {
//         SET_CARTS(state, payload) {
//             state.carts = payload;
//         },
//         ADD_CART(state, payload) {
//             const existingCart = state.carts.find(cart => cart.idUser === payload.idUser);
            
//             if (existingCart) {
//                 const existingProductIndex = existingCart.products.findIndex(product => product.id === payload.product[0].id);
//                 if (existingProductIndex !== -1) {
//                     existingCart.products[existingProductIndex].quantity += payload.product[0].quantity;
//                 } else {
//                     existingCart.products.push(payload.product[0]);
//                 }
//             } else {
//                 const newCart = {
//                     id: state.lastCartId++,
//                     idUser: payload.idUser,
//                     products: payload.product,
//                 };
//                 state.carts.push(newCart);
//             }
//         },
//     },
    
//     actions: {
//         async addNewCart({ commit }, product) {
//             const user = JSON.parse(localStorage.getItem("user"));

//             if (!user) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     text: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!',
//                 });
//                 return;
//             }

//             const cartItem = {
//                 idUser: user.id,
//                 product: [{
//                     id: product.id,
//                     product_name: product.product_name,
//                     unit_price: product.unit_price,
//                     quantity: product.quantity,
//                 }],
//             };

//             try {
//                 // Lấy giỏ hàng hiện tại của người dùng
//                 const currentCart = await getCartByUserId(user.id);

//                 if (currentCart && currentCart.length > 0) {
//                     // Nếu giỏ hàng đã tồn tại
//                     const existingProductIndex = currentCart[0].products.findIndex(p => p.id === product.id);
                    
//                     if (existingProductIndex !== -1) {
//                         // Nếu sản phẩm đã tồn tại, cập nhật số lượng
//                         const newQuantity = currentCart[0].products[existingProductIndex].quantity + product.quantity;
//                         currentCart[0].products[existingProductIndex].quantity = newQuantity;

//                         // Cập nhật giỏ hàng
//                         await updateCarts(currentCart[0]); // Cập nhật giỏ hàng trên server
//                         commit('SET_CARTS', currentCart); // Cập nhật giỏ hàng trong Vuex
//                     } else {
//                         // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
//                         currentCart[0].products.push(cartItem.product[0]);
//                         await updateCarts(currentCart[0]);
//                         commit('SET_CARTS', currentCart); 
//                     }
//                 } else {
//                     // Nếu giỏ hàng chưa tồn tại, tạo mới
//                     await addCart(cartItem);
//                     commit('ADD_CART', cartItem);
//                 }

//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Thành công!',
//                     text: 'Sản phẩm đã được thêm vào giỏ hàng.',
//                 });
//             } catch (error) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Lỗi!',
//                     text: 'Không thể thêm sản phẩm vào giỏ hàng.',
//                 });
//             }
//         },
//     },
// };

// export default carts; ******************************************************* chưa đổi cấu trúc - sai   
