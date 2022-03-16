import React from 'react'
import { useParams } from 'react-router-dom'
import { faGithub, faInstagram, faStackExchange, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Box, Stack, HStack, VStack, Text, Center, Avatar, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './profile.css'

import useProfile from '../../hooks/useProfile';

const Someone = () => {
    let params = useParams();

    const [data] = useProfile(params.id)

    return (
        <Center>
            <VStack>
                <Stack spacing={4}>
                    <Box className='profile-banner'>
                        <Avatar
                            size={'2xl'}
                            src={
                                data.avatar ? data.avatar : null
                            }
                        />
                        <Text fontSize='2xl' className='profile-name'>
                            @{data.name}
                        </Text>

                        <HStack>
                            <Text className='profile-data-text' fontSize='md'>
                                {data.following?.followedUsers?.length} Following
                            </Text>
                            <Text className='profile-data-text' fontSize='md'>
                                {data.followers?.followerId?.length}  Followers
                            </Text>
                        </HStack>
                    </Box>

                </Stack>
                <Stack spacing={4}>

                    {
                        data.bio ? <Text fontSize='md' className='bio'>
                            {data.bio}
                        </Text> : <></>
                    }

                    <Box className='profile-externals'>
                        <HStack className='profile-ext-stack'>
                            {
                                data.socials?.twitter !== '' ?
                                    <Link href={"https://twitter.com/" + data.socials?.twitter} target="_blank">
                                        <Text fontSize='lg' className='social-btn'>
                                            <FontAwesomeIcon icon={faTwitter} /> {data.socials?.twitter}
                                        </Text>
                                    </Link> :
                                    <></>
                            }
                            {
                                data.socials?.instagram !== '' ?
                                    <Link href={"https://instagram.com/" + data.socials?.instagram} target="_blank">
                                        <Text fontSize='lg' className='social-btn'>
                                            <FontAwesomeIcon icon={faInstagram} /> {data.socials?.instagram}
                                        </Text>
                                    </Link> :
                                    <></>
                            }
                            {
                                data.socials?.github !== '' ?
                                    <Link href={"https://github.com/" + data.socials?.github} target="_blank">
                                        <Text fontSize='lg' className='social-btn'>
                                            <FontAwesomeIcon icon={faGithub} /> {data.socials?.github}
                                        </Text>
                                    </Link> :
                                    <></>
                            }
                            {
                                data.socials?.stackexchange ?
                                    <Text fontSize='lg' className='social-btn'>
                                        <FontAwesomeIcon icon={faStackExchange} />
                                    </Text> :
                                    <></>
                            }
                            {
                                data.socials?.stackoverflow ?
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

export default Someone