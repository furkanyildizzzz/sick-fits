import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput, OrderCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";
import stripeConfig from "../lib/stripe";

interface Arguments {
    token: string
}

const graphql = String.raw;
const checkout = async (root: any, { token }: Arguments, context: KeystoneContext): Promise<OrderCreateInput> => {

    const sesh = context.session as Session

    if (!sesh) throw new Error("You must sign in to checkout")

    const userId = sesh.itemId

    const user = await context.lists.User.findOne({
        where: { id: userId },
        resolveFields: graphql`
        id
        name
        email
        cart {
            id
            quantity
            product {
            name
            price
            description
            id
            photo {
                id
                image {
                id
                publicUrlTransformed
                }
            }
            }
        }
        `
    });


    const cartItems = user.cart.filter((cartItem) => cartItem.product)
    const totalPrice = cartItems.reduce((acc: number, c) => acc + c.quantity * c.product.price, 0)

    const charge = await stripeConfig.paymentIntents.create({
        amount: totalPrice,
        currency: 'USD',
        confirm: true,
        payment_method: token
    }).catch((err) => {
        console.log(err);
        throw new Error(err.message)
    })

    const orderItems = cartItems.map((c) => {
        return {
            name: c.product.name,
            description: c.product.description,
            price: c.product.price,
            quantity: c.quantity,
            photo: { connect: { id: c.product.photo.id } }
        }
    }
    )

    const order = await context.lists.Order.createOne({
        data: {
            user: { connect: { id: sesh.itemId } },
            total: totalPrice,
            charge: charge.id,
            items: { create: orderItems }
        },
        resolveFields: 'id'
    })

    const cartItemIds = cartItems.map((c) => c.id);
    await context.lists.CartItem.deleteMany({ ids: cartItemIds })

    return order;
}

export default checkout

