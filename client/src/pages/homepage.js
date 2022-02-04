import React, { useState,useEffect } from 'react';
import {
SimpleGrid,
Box,
Flex,
Spacer,
Wrap,
WrapItem,
Center,
Text,
useColorModeValue
} from '@chakra-ui/react'
import Hero from '../components/hero';
import Product from '../components/product-card'
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../utils/queries';


const Homepage = () => {
    const {loading,data} = useQuery(GET_ALL_PRODUCTS)
    const [product, setProducts] = useState([])
    useEffect(() => {
        console.log("hi")
        if (!loading && data) {
            console.log("hello")
            let newProducts = Object.values(data)[0]
            newProducts = newProducts.slice(0,5)
            setProducts(newProducts)
        }
    },[data])
    return (
        <main>
            <div>
                <Spacer />

                <Box>
                    <Hero/>
                </Box>
                <Spacer />

                <Box
                mt='250px'>
                    <Wrap
                    w={'full'}
                    alignItems={'center'}
                    justify={'center'}
                    spacing='300px'
                    align={'center'}>
                        {console.log("product",product)}
                        {(product && product.length > 0) ?
                        product.map((item) => {
                            <WrapItem>
                                <Center mb='250px' bg='white' w='80px' h='80px'>
                                    <Product
                                        key = {item.id}
                                        imageURL = {item.imageURL}
                                        price = {item.price}
                                        name = {item.name}
                                    />
                                </Center>
                            </WrapItem>
                        })
                        :
                        <Text fontSize="sm">
                            Loading...
                        </Text>
                        }

                    </Wrap>

                    <Box mt='100px'>
                        <Footer/>
                    </Box>
                </Box>
            </div>
        </main>
    )
};


export default Homepage;                                                                                                                                                      