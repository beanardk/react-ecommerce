import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { useLazyQuery } from '@apollo/client'
import { CREATE_CHECKOUT } from '../../utils/queries'
// type OrderSummaryItemProps = {
//   label: string
//   value?: string
//   children?: React.ReactNode
// }

export const CartOrderSummary = ({ amount, accountId }) => {

    const [createCheckout, { loading, data }] = useLazyQuery(CREATE_CHECKOUT, {
        variables: { accountId },
    });

    useEffect(() => {
      if(!loading && data) {
        window.location.href = data.createCheckout
      }
    }, [data])

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(amount)}
          </Text>
        </Flex>
      </Stack>
      <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />} 
        onClick={createCheckout}
      >
        Checkout
      </Button>
    </Stack>
  )
}