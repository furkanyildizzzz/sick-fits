import { integer, relationship, text } from "@keystone-next/fields"
import { list } from "@keystone-next/keystone/schema"

const OrderItem = list({
    fields: {
        name: text(),
        description: text({
            ui: {
                displayMode: 'textarea'
            }
        }),
        photo: relationship({ ref: 'ProductImage' }),
        price: integer(),
        quantity: integer(),
        order: relationship({ ref: 'Order.items' })
    }
})
export default OrderItem;