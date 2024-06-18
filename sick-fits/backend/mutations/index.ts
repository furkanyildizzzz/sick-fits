/**
 * export const extendGraphqlSchema = graphQlSchemaExtension({})
 *  typedefs
 *   mutation
 *    addToCart(productID:ID):CartItem
 * resolver
 *  mutaiton
 *  addTocart
 * 
 * create addToCart.ts file under mutations folder
 * async addToCart = (root:any,{productId}:{productId:String}, constext:Keystonecontext):Promise<CartItemCreateInput>{
 * 
 * query the current user see if it is signed, 
 *  cotext.session as Session
 * query the current users cart 
 *  context.lists.CartItem.findMany({where:{user:{id:ses.id}}, product:{id:productId}})
 * see if the item is already in the cart increment its quantity
 *  
 * if it isn't create new cart item 
 * 
 * }
 */

import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import addToCart from "./addToCart";


export const extendGraphqlSchema = graphQLSchemaExtension({
    typeDefs: `
    type Mutation{
    addToCart(productId : String!) : CartItem
    }
    `,
    resolvers: {
        Mutation: {
            addToCart
        }
    }
})






