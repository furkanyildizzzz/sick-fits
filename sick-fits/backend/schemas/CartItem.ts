/*

-Create CartItem scheme

{
product link to 'Product',
user link to User this will be two way relation,
quantity:{
isrequired,
defaultCalue 1}
}

-Go to User schema add cart link to CartItem , many is true

*/

import { integer, relationship } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const CartItem = list({
    ui: {
        listView: { initialColumns: ['user', 'product', 'quantity'] }
    },
    fields: {
        quantity: integer({ isRequired: true, defaultValue: 1 }),
        product: relationship({ ref: 'Product' }),
        user: relationship({ ref: 'User.cart' })
    }
})
