import React from 'react';
import { Box, Stack, HStack, VStack, Textarea, Text, Button, ButtonGroup, Center, Avatar } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './profile.css';
import { useParams } from 'react-router-dom';
import { faFacebook, faGithub, faInstagram, faStackExchange, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Profile = () => {

    let params = useParams();

    return (
        <Center>
            <VStack>
                <Stack spacing={4}>
                    <Box className='profile-banner'>
                        <Avatar
                            size={'xl'}
                            src={
                                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                        />
                        <Text fontSize='2xl' className='profile-name'>
                            @{params.profileName}
                        </Text>
                    </Box>
                </Stack>
                <Stack spacing={4}>
                    <Box className='profile-stats'>
                        <HStack>
                            <Text fontSize='md'>
                                {Array(Math.floor(Math.random() * 45)).fill().map(() => Math.round(Math.random() * 40)).length} Following
                            </Text>
                            <Text fontSize='md'>
                                {Array(Math.floor(Math.random() * 45)).fill().map(() => Math.round(Math.random() * 40)).length}   Followers
                            </Text>
                            <Text fontSize='md'>
                                {Array(Math.floor(Math.random() * 45)).fill().map(() => Math.round(Math.random() * 40)).length}   Posts
                            </Text>
                        </HStack>
                    </Box>
                    <Text fontSize='md' className='bio'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>

                    <Box className='profile-externals'>
                        <HStack className='profile-ext-stack'>
                            <Text fontSize='lg' className='social-btn'>
                                <FontAwesomeIcon icon={faTwitter} />
                            </Text>
                            <Text fontSize='lg' className='social-btn'>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Text>
                            <Text fontSize='lg' className='social-btn'>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Text>
                            <Text fontSize='lg' className='social-btn'>
                                <FontAwesomeIcon icon={faGithub} />
                            </Text>
                            <Text fontSize='lg' className='social-btn'>
                                <FontAwesomeIcon icon={faStackExchange} />
                            </Text>
                            <Text fontSize='lg' className='social-btn'>
                                <FontAwesomeIcon icon={faStackOverflow} />
                            </Text>
                        </HStack>
                    </Box>
                </Stack>
            </VStack>
        </Center>
    );
}

export default Profile