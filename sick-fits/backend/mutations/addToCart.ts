import { KeystoneContext } from "@keystone-next/types";
import { Session } from "../types";
import { CartItemCreateInput } from '../.keystone/schema-types';

const addToCart = async (root: any, { productId }: { productId: String }, context: KeystoneContext): Promise<CartItemCreateInput> => {
    const sesh = context.session as Session;

    if (!sesh) throw new Error('You must be logged in');

    const allCartItems = await context.lists.CartItem.findMany({
        where: {
            user: { id: sesh.itemId },
            product: { id: productId }
        },
        resolveFields: 'id,quantity'
    })

    const [cartItem] = allCartItems;
    if (cartItem) {
        cartItem.quantity =
            await context.lists.CartItem.updateOne({
                id: cartItem.id,
                data: { quantity: cartItem.quantity + 1 }
            })
        return cartItem;
    }

    const newCartItem = await context.lists.CartItem.createOne({
        data: {
            user: { connect: { id: sesh.itemId } },
            product: { connect: { id: productId } }
        },
        resolveFields: 'id,quantity'
    })
    return newCartItem;
}

export default addToCart;