import React from "react";
// import Auth from '../utils/auth';
// import

import {
    Flex,
    Box,
    Image,
    useColorModeValue,
    Icon,
    Wrap,
    WrapItem,
    Center,
    chakra,
    Tooltip,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';



const Product = () => {
    return (
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
                    <Center mx='0px' mb='250px' bg='white' w='80px' h='80px'>
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

        <Box mt='100px'>
            <Footer/>
        </Box>
    </Box>
      );
}


export default Product;