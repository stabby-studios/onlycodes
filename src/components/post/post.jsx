import React from 'react'
import {
    Box,
    Center,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
    Link,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart, faCodeFork, faCodeCommit } from '@fortawesome/free-solid-svg-icons'

import './post.css'

const PostActions = () => {
    return (
        <React.Fragment>
            <ButtonGroup variant='outline' spacing='4'>
                <Button>
                    <FontAwesomeIcon icon={faCodeCommit} />
                </Button>
                <Button>
                    <FontAwesomeIcon icon={faHeart} />
                </Button>
                <Button>
                    <FontAwesomeIcon icon={faCodeFork} />
                </Button>
            </ButtonGroup>
        </React.Fragment>
    );
}

export default function Post({ post }) {
    return (
        <Center py={6}>
            <Box
                maxW={'445px'}
                w={'445px'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                {post.image && <Box
                    h={'210px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                        {<Image src={post.image} layout={'fill'} />}
                    </Box>}
                <Stack>
                    <Text color={'gray.500'}>
                        {post.content}
                    </Text>
                    <Box className="post-stats">
                        <Text fontSize="sm">
                            {post.replyIds.length} Commits
                        </Text>
                        <Text fontSize="sm">
                            {post.likedBy.length} Likes
                        </Text>
                        <Text fontSize="sm">
                            {post.forkedBy.length} Forks
                        </Text>
                    </Box>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
                        alt={'Author'}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>
                            <Link to={'/' + post.user.username} className="author">@{post.user.username} </Link>
                        </Text>
                        <Text color={'gray.500'}>{post.createdAt.toLocaleString()}</Text>
                    </Stack>
                </Stack>
                <PostActions />
            </Box>
        </Center>
    );
}
