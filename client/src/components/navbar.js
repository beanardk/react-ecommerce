import { 
    Flex,
    Box,
    Spacer,
    Button,
    Heading
} from '@chakra-ui/react'

function Navbar () {
    return (
    <Flex>
        <Box p='2'>
                <Heading size='md'>Salmussy</Heading>
        </Box>
        <Spacer />
        <Box>
            <Button colorScheme='gray' mr='4'>
                Sign in
            </Button>

            <Button colorScheme='green'>
                Sign Up
            </Button>
        </Box>
    </Flex>
    )
}

export default Navbar;