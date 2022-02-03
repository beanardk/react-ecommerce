import { 
    Flex,
    Box,
    Text,
    Spacer,
    Button,
    Link,
    Heading
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'; 
function Navbar () {
    return (
    <Flex>
        <Box p='2'>
                <Heading size='md'>Salmussy</Heading>
        </Box>
        <Spacer />
        <Box>
            <Link colorScheme='gray' mr='4' href='/login'>
                Sign in
            </Link>

            <Link colorScheme='green' href='/signup'>
                Sign Up
            </Link>
        </Box>
    </Flex>
    )
}
export default Navbar;