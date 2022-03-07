import React from 'react';
import { Box, Center, Stack, Flex, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import NewPost from '../../components/new-post/new-post';

import './feed.css'
import Post from '../../components/post/post';

const feedItems = [
    {
        id: 1,
        user: {
            username: 'mikku.dev',
            avatar: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        },
        content: 'Hello World!',
        image: null,
        replyIds: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        likedBy: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        forkedBy:  Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        createdAt: new Date()
    },
    {
        id: 2,
        user: {
            username: 'techlead1337',
            avatar: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        },
        content: 'Hello World! this is some extra content thats alot of stuff',
        image: 'https://via.placeholder.com/150',
        replyIds: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        likedBy: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        forkedBy:  Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        createdAt: new Date()
    },
    {
        id: 3,
        user: {
            username: 'rngmaster099',
            avatar: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        },
        content: 'Hello World!',
        image :null,
        replyIds: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        likedBy: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        forkedBy:  Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        createdAt: new Date()
    },
    {
        id: 4,
        user: {
            username: 'rngmaster099',
            avatar: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        },
        content: 'Hello World!',
        image :null,
        replyIds: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        likedBy: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        forkedBy:  Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        createdAt: new Date()
    },
    {
        id: 5,
        user: {
            username: 'rngmaster099',
            avatar: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        },
        content: 'Hello World!',
        image :null,
        replyIds: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        likedBy: Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        forkedBy:  Array( Math.floor(Math.random() * 45) ).fill().map(() => Math.round(Math.random() * 40)),
        createdAt: new Date()
    },
]

const Feed = () => {
    return (
       <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Center>
            <Stack>
                <NewPost />
                <Stack className='feed'>
                    {feedItems.map(item => {
                        return (
                            <Post post={item} key={item.id} />
                        )
                    })}
                </Stack>
            </Stack>
        </Center>
       </Flex>
    )
}

export default Feed;