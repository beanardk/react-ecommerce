import React, { useState,useEffect } from 'react';
import {
Box,
Wrap,
WrapItem,
Center,
Text,
} from '@chakra-ui/react'
import Product from '../components/Product Page/product-card'
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../utils/queries';



const FillProduct = () => {

    const {loading,data} = useQuery(GET_ALL_PRODUCTS)
    const [product, setProducts] = useState([])

    useEffect(() => {
        if (!loading && data) {
            let newProducts = Object.values(data)[0]

            setProducts(newProducts)
        }
    },[data])


    return (
        <main>
            <div>

                <Box
                mt='250px'>
                    <Wrap
                        w={'full'}
                        alignItems={'center'}
                        justify={'center'}
                        spacing='300px'
                        align={'center'}
                    >
                        {(product && product.length > 0) ?
                        product.map((item) => (
                            <WrapItem>
                                <Center mb='250px' bg='white' w='80px' h='80px'>
                                    <Product key = {item.id} {...item} />
                                </Center>
                            </WrapItem>
                        ))
                        :
                        <Text fontSize="sm">
                            Loading...
                        </Text>
                        }

                    </Wrap>
                </Box>
            </div>
        </main>
    )
}


export default FillProduct;