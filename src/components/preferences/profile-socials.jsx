import { Box, Button, Center, Flex, FormControl, FormLabel, GridItem, Input, InputGroup, InputLeftAddon, SimpleGrid, Stack } from '@chakra-ui/react';
import { faGithub, faInstagram, faStackExchange, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ProfileSocials = ({ profile, documentId }) => {
    return (
        <>
            <Flex align={'center'} justify={'center'} bg={'gray.800'} >
                <Center>
                    <SimpleGrid
                        display={{ base: "block" }}
                        columns={{ md: 3 }}
                        spacing={{ md: 6 }}
                        width='750px'
                        height='580px'
                    >
                        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                            <Box shadow='base' roudned={[null, 'md']} overflow={{ sm: 'hidden' }}>
                                <Stack px={4} py={5} bg={'gray.700'} spacing={6} p={{ sm: 6 }}>
                                    <SimpleGrid columns={3} spacing={6}>
                                        <FormControl as={GridItem} colSpan={[3, 2]}>
                                            <FormLabel>
                                                Github
                                            </FormLabel>
                                            <InputGroup size="sm">
                                                <InputLeftAddon bg={'gray.800'} color={'gray.50'} rounded="md">
                                                    <FontAwesomeIcon icon={faGithub} />
                                                </InputLeftAddon>
                                                <Input type="text" placeholder="JohnnyJohnAndTheFunkyBunch" focusBorderColor='brand.400' rounded="md" defaultValue='USER VAL' />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl as={GridItem} colSpan={[3, 2]}>
                                            <FormLabel>
                                                Twitter
                                            </FormLabel>
                                            <InputGroup size="sm">
                                                <InputLeftAddon bg={'gray.800'} color={'gray.50'} rounded="md">
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </InputLeftAddon>
                                                <Input type="text" placeholder="elonmusk" focusBorderColor='brand.400' rounded="md" defaultValue='USER VAL' />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl as={GridItem} colSpan={[3, 2]}>
                                            <FormLabel>
                                                Instagram
                                            </FormLabel>
                                            <InputGroup size="sm">
                                                <InputLeftAddon bg={'gray.800'} color={'gray.50'} rounded="md">
                                                    <FontAwesomeIcon icon={faInstagram} />
                                                </InputLeftAddon>
                                                <Input type="text" placeholder="suckytattoos_" focusBorderColor='brand.400' rounded="md" defaultValue='USER VAL' />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl as={GridItem} colSpan={[3, 2]}>
                                            <FormLabel>
                                                StackExchange
                                            </FormLabel>
                                            <InputGroup size="sm">
                                                <InputLeftAddon bg={'gray.800'} color={'gray.50'} rounded="md">
                                                    <FontAwesomeIcon icon={faStackExchange} />
                                                </InputLeftAddon>
                                                <Input type="text" placeholder="idk anyone who uses this" focusBorderColor='brand.400' rounded="md" defaultValue='USER VAL' />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl as={GridItem} colSpan={[3, 2]}>
                                            <FormLabel>
                                                StackOverflow
                                            </FormLabel>
                                            <InputGroup size="sm">
                                                <InputLeftAddon bg={'gray.800'} color={'gray.50'} rounded="md">
                                                    <FontAwesomeIcon icon={faStackOverflow} />
                                                </InputLeftAddon>
                                                <Input type="text" placeholder="some stackoverflow user who definitely is not a dick" focusBorderColor='brand.400' rounded="md" defaultValue='USER VAL' />
                                            </InputGroup>
                                        </FormControl>

                                        <GridItem colSpan={[3,2]}>
                                            {!documentId ? <Button float={'right'}>Save socials</Button> : <></>}
                                        </GridItem>

                                    </SimpleGrid>
                                </Stack>
                            </Box>
                        </GridItem>
                    </SimpleGrid>
                </Center>
            </Flex>
        </>
    )
}

export default ProfileSocials