import React from 'react'
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
    return (
        <Box p={4} className="post">
            <Link to={'/:username'} className="author">@{post.author} </Link>
            <span className="content">{post.content}</span>
            {post.image && <img src={post.image} alt="" />}
        </Box>
    );
}

export default Post;