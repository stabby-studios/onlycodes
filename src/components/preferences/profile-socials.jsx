import { Box, Button, Center, Flex, FormControl, FormLabel, GridItem, Input, InputGroup, InputLeftAddon, SimpleGrid, Stack, useToast } from '@chakra-ui/react';
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const ProfileSaveSocialsButton = ({ documentId, data }) => {

    const toast = useToast();

    /* firebase transaction to update the field */
    const col = collection(db, "users");
    const ref = doc(col, documentId);
    const firestoreRefFromDocument = ref.firestore;
    const transaction = useFirestoreTransaction(firestoreRefFromDocument, async (tsx) => {
        const u = await tsx.get(ref);

        let savedUser = u.data();

        console.log(savedUser)

        let userSocialsData = {
            twitter: data.twitterField,
            instagram: data.instagramField,
            github: data.githubField,
        };

        tsx.update(ref, {
            socials: userSocialsData
        })

        return userSocialsData;
    });

    const handleSaveSocials = (event) => {
        event.preventDefault();

        transaction.mutate();

        if (transaction.isError) {
            toast({
                title: 'Error',
                description: 'Oops something went wrong...',
                status: 'error',
                duration: 3000,
                isClosable: false
            });
            console.error(transaction.error)
            return;
        }

        toast({
            title: 'Success',
            description: 'Successfully updated profile',
            status: 'success',
            duration: 3000,
            isClosable: false
        });
    }

    return (
        <>
            <Button float={'right'} onClick={handleSaveSocials}>Save socials</Button> 
        </>
    );
}


const ProfileSocials = ({ profile, documentId }) => {

    const [githubField, setGithubField] = useState('');
    const [twitterField, setTwitterField] = useState('');
    const [instagramField, setInstagramField] = useState('');

    const handleChangeGithub = (event) => {
        setGithubField(event.target.value)
    }

    const handleChangeTwitter = (event) => {
        setTwitterField(event.target.value)
    }

    const handleChangeInstagram = (event) => {
        setInstagramField(event.target.value)
    }

    useEffect(() => {

        if(!profile) {
            return;
        }

        console.log(profile.socials)

        if (profile.socials.twitter.length !== 0) {
            setTwitterField(profile.socials.twitter)
        } else {
            setTwitterField('');
        }

        if (profile.socials.instagram.length !== 0) {
            setInstagramField(profile.socials.instagram)
        } else {
            setInstagramField('')
        }

        if (profile.socials.github.length !== 0) {
            setGithubField(profile.socials.github);
        } else {
            setGithubField('')
        }
        

    }, [profile])

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
                                                <Input onChange={handleChangeGithub} type="text" placeholder="JohnnyJohnAndTheFunkyBunch" focusBorderColor='brand.400' rounded="md" defaultValue={githubField}/>
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
                                                <Input onChange={handleChangeTwitter} type="text" placeholder="elonmusk" focusBorderColor='brand.400' rounded="md" defaultValue={twitterField} />
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
                                                <Input onChange={handleChangeInstagram} type="text" placeholder="suckytattoos_" focusBorderColor='brand.400' rounded="md" defaultValue={instagramField} />
                                            </InputGroup>
                                        </FormControl>

                                        {/* <FormControl as={GridItem} colSpan={[3, 2]}>
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
                                        </FormControl> */}

                                        <GridItem colSpan={[3, 2]}>
                                            {documentId ? <ProfileSaveSocialsButton documentId={documentId} data={{ githubField, twitterField, instagramField }} /> : <></>}
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