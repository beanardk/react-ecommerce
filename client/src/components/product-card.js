import {
    Flex,
    Box,
    Image,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Link
  } from '@chakra-ui/react';
  import { FiShoppingCart } from 'react-icons/fi';
  import Auth from '../utils/auth'
  import { useMutation } from '@apollo/client';
  import { ADD_TO_CART } from '../utils/mutations';
  import { useHistory  } from 'react-router-dom';
  // const data = {
  //   isNew: true,
  //   imageURL:
  //     'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  //   name: 'Wayfarer Classic',
  //   price: 4.5
  // };
  
  
  var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const ProductAddToCart = (props) => {
    let history = useHistory()
    const [addToCart] = useMutation(ADD_TO_CART)
    
    const handleAdd = async() => {
      if(Auth.loggedIn() !== true) {
        return history.push("/login");
      }

      try {
        await addToCart({ variables: { accountId: Auth.getAccount().data._id, productId:props._id} })
        return history.push("/cart");
      } catch (e){
        console.error(e)
      }
    }

    return (
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
  
          <Image
            height='auto'
            minH={'325px'}
            maxH={'325px'}
            width='auto'
            minW={'325px'}
            src={props.imageURL}
            alt={`Picture of ${props.name}`}
            roundedTop="lg"
            />
  
          <Box p="5">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Link
                to='/product-details'
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {props.name}
              </Link>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}>
                <chakra.a  display={'flex'} onClick={() => handleAdd()}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
              </Tooltip>
            </Flex>
  
            <Flex justifyContent="space-between" alignContent="center">
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                {formatter.format(props.price)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  }
  
  // function Rating({ rating, numReviews }) {
  //   return (
  //     <Box d="flex" alignItems="center">
  //       {Array(5)
  //         .fill('')
  //         .map((_, i) => {
  //           const roundedRating = Math.round(rating * 2) / 2;
  //           if (roundedRating - i >= 1) {
  //             return (
  //               <BsStarFill
  //                 key={i}
  //                 style={{ marginLeft: '1' }}
  //                 color={i < rating ? 'teal.500' : 'gray.300'}
  //               />
  //             );
  //           }
  //           if (roundedRating - i === 0.5) {
  //             return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
  //           }
  //           return <BsStar key={i} style={{ marginLeft: '1' }} />;
  //         })}
  //       <Box as="span" ml="2" color="gray.600" fontSize="sm">
  //         {numReviews} review{numReviews > 1 && 's'}
  //       </Box>
  //     </Box>
  //   );
  // }
  export default ProductAddToCart;