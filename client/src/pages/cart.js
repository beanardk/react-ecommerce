import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { CartItem } from '../components/Cart/CartItem'
import { CartOrderSummary } from '../components/Cart/CartOrderSummary'
import { cartData } from './_data'
import Auth from '../utils/auth'
import { GET_ACCOUNT } from '../utils/queries'


const Cart = () => {
    let accountId = Auth.getAccount().data._id
    const { loading, data } = useQuery(GET_ACCOUNT, {
        variables: { accountId },
    });
    
    const [currentCart, setCart] = useState([]);

    
    useEffect(() => {
        if(!loading && data) {
            let cart = Object.values(data)[0].cart

            console.log(`cart`, cart)
            let newCart = [{ id: cart[0]._id, name: cart[0].name, price: cart[0].price, quantity: 1 }]

            if(cart.length === 1) return newCart

            cart = cart.slice(1)
            for(const item of cart) {
                let checkNewCart = newCart.find(cartItem => cartItem.price === item.price)
                if(checkNewCart) return checkNewCart.quantity++

                newCart.push({ id: item._id, name: item.name, price: item.price, quantity: 1 })
            }
            
            console.log(newCart)
            setCart(newCart)
        }
    }, [loading, data])
    
    useEffect(() => {
        console.log(`Current Cart:`, currentCart)
    }, [currentCart])

    return (
    <Box
            maxW={{ base: '3xl', lg: '7xl' }}
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
        >   
        <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}
        >
            <Stack spacing={{ base: '8', md: '10' }} flex="2">
                <Heading fontSize="2xl" fontWeight="extrabold">
                    Shopping Cart (3 items)
                </Heading>

                <Stack spacing="6">
                {currentCart && currentCart.map((item) => (
                    <CartItem key={item.id} {...item} />
                ))}
                </Stack>
            </Stack>

            <Flex direction="column" align="center" flex="1">
                <CartOrderSummary />
                <HStack mt="6" fontWeight="semibold">
                    <p>or</p>
                    <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
                </HStack>
            </Flex>
        </Stack>
    </Box>
    )
}

export default Cart