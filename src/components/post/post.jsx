import React from 'react'
import { Box, ButtonGroup, Button, Avatar, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart, faCodeFork, faCodeCommit } from '@fortawesome/free-solid-svg-icons'

import './post.css'

const PostActions = () => {
    return (
        <React.Fragment>
            <ButtonGroup variant='outline' spacing='0'>
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

const Post = ({ post }) => {
    return (
        <Box p={4} className="post">
            <Box className='post-data'>
                <Box className='user'>
                    <Text fontSize="xl">
                        <Avatar
                            size={'md'}
                            src={
                                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                        />
                        <Link to={'/' + post.user.username} className="author">@{post.user.username} </Link>
                    </Text>
                </Box>
                <Box className="content">
                    <Text fontSize="md">
                        {post.content}
                    </Text>
                    {post.image && <img src={post.image} alt="" />}
                </Box>
                
            </Box>
            <PostActions />
            <Box className="post-stats">
                <Text fontSize="sm">
                    { post.replyIds.length } Commits
                </Text>
                <Text fontSize="sm">
                    { post.likedBy.length } Likes
                </Text>
                <Text fontSize="sm">
                    { post.forkedBy.length } Forks
                </Text>
            </Box>
            <Box className='post-footer'>
                <span className="small">{post.createdAt.toDateString()}</span>
            </Box>
        </Box>
    );
}

export default Post;