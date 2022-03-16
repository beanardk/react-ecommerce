import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    Center
    // useBreakpointValue,
  } from '@chakra-ui/react';
  
  export default function Hero() {
    return (
      <Flex
        h={'90vh'}
        backgroundImage={
          'url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/streetwear-brands-1627934788.jpg)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
        >
        
          <VStack
            w={'full'}
            justify={'center'}
            textAlign={'center'}
            // px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={'linear(to-r, blackAlpha.400, transparent)'}
            >
              <Stack
                maxW={'2xl'} 
                spacing={5}
                backdropFilter={'blur( 1.5px );'}
                background={'rgba( 140, 190, 244, 0.08 )'}
                borderRadius={'10px'}
                p={'3%'}
              >
                
                <Text
                  color={'white'}
                  fontWeight={700}
                  fontSize={'20px'}
                  lineHeight={1.2}>
                  Our new Spring/Summer Collection
                </Text>

                  <Center>
                    <Button
                    maxW={'50%'}
                    bg={'blue.400'}
                    rounded={'full'}
                    color={'white'}
                    _hover={{ bg: 'blue.500' }}>
                    Explore
                  </Button>
                  </Center>
              
              </Stack>

            </VStack>
      </Flex>
    );
  }
