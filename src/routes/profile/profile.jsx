import { collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import { faGithub, faInstagram, faStackExchange, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Box, Stack, HStack, VStack, Text, Center, Avatar, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './profile.css'

const Profile = () => {

    const [profile, setProfile] = useState({});
    let params = useParams();

    const fetchProfile = useCallback(async () => {
        try {
            const profileSnapshot = await getDocs(collection(db, "users"));
            const data = [];

            profileSnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            const foundProfile = data.find(p => p['uid'] === params.id);
            setProfile(foundProfile);

        } catch (e) {
            console.error(e);
        }
    }, [params.id]);

    useEffect(() => {

        fetchProfile();

    }, [fetchProfile])

    console.log(profile)

    return (
        <Center>
            <VStack>
                <Stack spacing={4}>
                    <Box className='profile-banner'>
                        <Avatar
                            size={'2xl'}
                            src={
                                profile.avatar ? profile.avatar : null
                            }
                        />
                        <Text fontSize='2xl' className='profile-name'>
                            @{profile.name}
                        </Text>

                        <HStack>
                            <Text className='profile-data-text' fontSize='md'>
                                {profile.following?.followedUsers?.length} Following
                            </Text>
                            <Text className='profile-data-text' fontSize='md'>
                                {profile.followers?.followerId?.length}  Followers
                            </Text>
                        </HStack>
                    </Box>

                </Stack>
                <Stack spacing={4}>

                    {
                        profile.bio ? <Text fontSize='md' className='bio'> {profile.bio} </Text> : <></>
                    }

                    <Box className='profile-externals'>
                        <HStack className='profile-ext-stack'>
                            {
                                profile.socials?.twitter !== '' ?
                                    <Link href={"https://twitter.com/" + profile.socials?.twitter} target="_blank">
                                        <Text fontSize='lg' className='social-btn'>
                                            <FontAwesomeIcon icon={faTwitter} /> {profile.socials?.twitter}
                                        </Text>
                                    </Link> :
                                    <></>
                            }
                            {
                                profile.socials?.instagram !== '' ?
                                    <Link href={"https://instagram.com/" + profile.socials?.instagram} target="_blank">
                                        <Text fontSize='lg' className='social-btn'>
                                            <FontAwesomeIcon icon={faInstagram} /> {profile.socials?.instagram}
                                        </Text>
                                    </Link> :
                                    <></>
                            }
                            {
                                profile.socials?.github !== '' ?
                                    <Link href={"https://github.com/" + profile.socials?.github} target="_blank">
                                        <Text fontSize='lg' className='social-btn'>
                                            <FontAwesomeIcon icon={faGithub} /> {profile.socials?.github}
                                        </Text>
                                    </Link> :
                                    <></>
                            }
                            {
                                profile.socials?.stackexchange ?
                                    <Text fontSize='lg' className='social-btn'>
                                        <FontAwesomeIcon icon={faStackExchange} />
                                    </Text> :
                                    <></>
                            }
                            {
                                profile.socials?.stackoverflow ?
                                    <Text fontSize='lg' className='social-btn'>
                                        <FontAwesomeIcon icon={faStackOverflow} />
                                    </Text> :
                                    <></>
                            }
                        </HStack>
                    </Box>
                </Stack>
            </VStack>
        </Center>
    )
}
export default Profile