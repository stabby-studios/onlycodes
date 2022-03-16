import { Avatar, Box, Button, Center, Flex, FormControl, FormLabel, GridItem, Input, InputGroup, InputLeftAddon, SimpleGrid, Stack, Textarea, useToast } from '@chakra-ui/react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faAt, faCheck, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { collection, doc} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../firebase';
import useDocumentId from '../../hooks/useDocumentId';

const SaveDataButton = ({ data, documentId}) => {

    const toast = useToast();    

    /* firestore transaction when the profile save button has been clicked! */
    const col = collection(db, "users");
    const ref = doc(col, documentId);
    const firestoreReferenceFromDocument = ref.firestore
    const transaction = useFirestoreTransaction(firestoreReferenceFromDocument, async (tsx) => {
        const u = await tsx.get(ref);

        let savedUser = u.data();

        let userData = {
            email: data.emailField,
            bio: data.bioField,
            name: data.usernameField
        }

        savedUser = userData

        tsx.update(ref, savedUser);

        return savedUser;
    });

    const handleSaveProfileChangeOnClick = (event) => {
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
            <Button size='lg' float={'right'} onClick={handleSaveProfileChangeOnClick}>
                <FontAwesomeIcon icon={faCheck} color="#00abb1" />
            </Button>
        </>
    )
}

const ProfileData = ({ profile }) => {
    const avatarUploadRef = useRef(null);

    const [usernameField, setUsernameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [bioField, setBioField] = useState('');
    // const [postImage, setPostImage] = useState(null); // TODO: Try and figure this out...

    /* Firestore fetch user doc to update the user profile */
    const [docId] = useDocumentId(profile.uid)

    useEffect(() => {
        if (!profile) {
            return;
        }

        if (profile.name !== undefined || profile.name !== "") {
            setUsernameField(profile.name);
        } else {
            setUsernameField('');
        }

        if (profile.email !== undefined || profile.email !== "") {
            setEmailField(profile.email)
        } else {
            setEmailField('');
        }

        if (profile.bio !== undefined || profile.bio !== "") {
            setBioField(profile.bio);
        } else {
            setBioField('');
        }

    }, [profile]);



    /* State management when editing the fields */
    const handleUsernameOnChange = (event) => {
        event.preventDefault();

        setUsernameField(event.target.value);
    }

    const handleEmailOnChange = (event) => {
        event.preventDefault();

        setEmailField(event.target.value);
    }

    const handleBioOnChange = (event) => {
        event.preventDefault();

        setBioField(event.target.value);
    }

    const handleUploadPhotoOnClick = (event) => {
        event.preventDefault();

        avatarUploadRef.current.click();
    }


    return (
        <Flex align={'center'} justify={'center'} bg={'gray.800'}>
            <Center>
                <SimpleGrid
                    display={{ base: "block" }}
                    columns={{ md: 3 }}
                    spacing={{ md: 6 }}
                    width='750px'
                >
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <Box shadow="base" rounded={[null, "md"]} overflow={{ sm: 'hidden' }}>
                            <Stack px={4} py={5} bg={'gray.700'} spacing={6} p={{ sm: 6 }}>
                                <SimpleGrid columns={3} spacing={6}>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={"gray.50"}
                                        >
                                            Photo
                                        </FormLabel>
                                        <Flex alignItems="center" mt={1}>
                                            <Avatar
                                                size='2xl'
                                                bg={"gray.800"}
                                                src={
                                                    profile.avatar ? profile.avatar : null
                                                }
                                            />
                                            <input type="file" ref={avatarUploadRef} style={{ display: 'none' }} />
                                            <Button
                                                type="button"
                                                ml={3}
                                                variant="outline"
                                                size="lg"
                                                fontWeight="medium"
                                                _focus={{ shadow: "none" }}
                                                onClick={handleUploadPhotoOnClick}>
                                                <FontAwesomeIcon icon={faFileUpload} size="2x" />
                                            </Button>
                                        </Flex>
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel fontSize="sm" fontWeight="md" color={'gray.50'}>
                                            Display name
                                        </FormLabel>
                                        <InputGroup size="sm">
                                            <InputLeftAddon bg={'gray.800'} color={"gray.50"} rounded="md">
                                                <FontAwesomeIcon icon={faAt} />
                                            </InputLeftAddon>
                                            <Input type="text" placeholder='Coderboi99' focusBorderColor='brand.400' rounded="md" defaultValue={profile.name} onChange={handleUsernameOnChange} />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel fontSize="sm" fontWeight="md" color={'gray.50'}>
                                            Email
                                        </FormLabel>
                                        <InputGroup size="sm">
                                            <InputLeftAddon bg={'gray.800'} color={"gray.50"} rounded="md">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputLeftAddon>
                                            <Input type="email" placeholder='coderboi99@h4x0r.com' focusBorderColor='brand.400' rounded="md" defaultValue={profile.email} onChange={handleEmailOnChange} />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel fontSize="sm" fontWeight="md" color={'gray.50'}>
                                            Bio
                                        </FormLabel>
                                        <InputGroup size="sm">
                                            <Textarea focusBorderColor='brand.400' rounded="md" defaultValue={profile.bio} onChange={handleBioOnChange} >
                                            </Textarea>
                                        </InputGroup>
                                    </FormControl>

                                    <GridItem colSpan={[3, 2]}>
                                        {
                                            docId ? <SaveDataButton data={{bioField, usernameField, emailField }} documentId={docId} /> : <></>
                                        }
                                    </GridItem>
                                </SimpleGrid>
                            </Stack>
                        </Box>
                    </GridItem>
                </SimpleGrid>
            </Center>
        </Flex>
    );
}

export default ProfileData