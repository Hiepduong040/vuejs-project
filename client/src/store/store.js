import { createStore } from "vuex";
import user from "./module/user.module";
import product from "./module/product.module";
import category from "./module/category.module";
import carts from "./module/cart.module";

const store = createStore({
    // shorthand 
    modules:{
        user, 
        product,
        category,
        carts
    }

})
export default store;

