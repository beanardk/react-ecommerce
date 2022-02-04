import React, { useState } from 'react';
import {
SimpleGrid,
Box,
Flex,
Spacer,
Wrap,
WrapItem,
Center
} from '@chakra-ui/react'
import Header from '../components/Nav2.0/header'
import Hero from '../components/hero';
import Product from '../components/product-card'
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const Homepage = () => {
    return (
        <main>
            <div>
                <Box>
                    <Header/>
                </Box>
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

                        <WrapItem>
                            <Center mb='250px' bg='white' w='80px' h='80px'>
                                <Product.ProductAddToCart/>
                            </Center>
                        </WrapItem>

                        <WrapItem>
                            <Center mb='250px' bg='white' w='80px' h='80px'>
                                <Product.ProductAddToCart/>
                            </Center>
                        </WrapItem>

                        <WrapItem>
                            <Center mb='250px' bg='white' w='80px' h='80px'>
                                <Product.ProductAddToCart/>
                            </Center>
                        </WrapItem>

                        <WrapItem>
                            <Center mb='250px' spacing='20px' bg='white' w='80px' h='80px'>
                                <Product.ProductAddToCart/>
                            </Center>
                        </WrapItem>

                        <WrapItem>
                            <Center mb='250px' spacing='20px' bg='white' w='80px' h='80px'>
                                <Product.ProductAddToCart/>
                            </Center>
                        </WrapItem>

                    </Wrap>

                    <Box mt='250px'>
                        <Footer/>
                    </Box>
                </Box>
            </div>
        </main>
    )
};


export default Homepage;                                                                                                                                                      