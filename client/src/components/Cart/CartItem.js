import { CloseButton, Flex, Link, Select, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { useMutation } from '@apollo/client'
import { REMOVE_ALL_FROM_CART, CHANGE_QUANTITY } from '../../utils/mutations'
import Auth from '../../utils/auth'

export const CartItem = ({
    id,
    name,
    description,
    imageUrl,
    price,
    handleCartChange,
  }) => {

    let accountId = Auth.getAccount().data._id
    const [removeFromCart, { loading, data }] = useMutation(REMOVE_ALL_FROM_CART, {
      variables: { accountId, productId: id}
    });
    
    const [changeQuantity, {}] = useMutation(CHANGE_QUANTITY);
    const [currentQuantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
      setQuantity(parseInt(e.currentTarget.value))
      changeQuantity({
          variables: { accountId, productId: id, quantity: parseInt(e.currentTarget.value) },
      });
    }

    
    useEffect(() => {
      if(!loading && data) {
        handleCartChange(Object.values(data)[0].cart)
      }
    }, [data])
    
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
      <CartProductMeta
        name={name}
        description={description}
        image={imageUrl}
      />

      {/* Desktop */}
      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <Select
          maxW="64px"
          aria-label="Select quantity"
          placeholder={currentQuantity}
          focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
          onChange={(e) => handleQuantityChange(e)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Select>
        <PriceTag price={price}/>
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={() => removeFromCart()} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>

        <Select
          maxW="64px"
          aria-label="Select quantity"
          placeholder={currentQuantity}
          focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Select>
        <PriceTag price={price} />
      </Flex>
    </Flex>
  )
}