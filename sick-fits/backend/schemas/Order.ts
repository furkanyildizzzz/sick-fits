import { integer, relationship, text, virtual } from "@keystone-next/fields"
import { list } from "@keystone-next/keystone/schema"
import formatMoney from "../lib/formatMoney"
import { Session } from "../types";

const filterOrders = ({ session, context, listKey, operation }: { session: Session }) => {
    // if the user is an Admin, they can access all the records
    console.log({ session })
    return true;
}

const Order = list({
    ui: { labelField: 'label' },
    fields: {
        label: virtual({
            graphQLReturnType: 'String',
            resolver: (item) => {
                return `Furkan ${formatMoney(item.total)}`
            }
        }),
        total: integer(),
        items: relationship({ ref: 'OrderItem.order', many: true }),
        user: relationship({ ref: 'User.orders' }),
        charge: text(),
    },
    access: {
        read: filterOrders
    }
})

export default Order;