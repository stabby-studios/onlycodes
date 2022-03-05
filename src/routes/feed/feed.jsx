import React from 'react';
import { Box, Center, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

import './feed.css'
import Post from '../../components/post/post';

const feedItems = [
    {
        id: 1,
        author: 'mikku.dev',
        content: 'Hello World!',
        image: null
    },
    {
        id: 2,
        author: 'techlead1337',
        content: 'Hello World!',
        image: 'https://via.placeholder.com/150'
    },
]

const Feed = () => {
    return (
        <Center>
            <Stack className='feed'>
                {feedItems.map(item => {
                    return (
                        <Post post={item} />
                    )
                })}
            </Stack>
        </Center>
    )
}

export default Feed;