import React, { useEffect } from 'react';
import { Center, Stack, Flex, Spinner } from '@chakra-ui/react'
import NewPost from '../../components/new-post/new-post';
import './feed.css'
import Post from '../../components/post/post';
import { db, auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, orderBy, query } from 'firebase/firestore';
import {  useFirestoreQuery } from '@react-query-firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Feed = () => {

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const queryRef = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const firestoreQuery = useFirestoreQuery(["posts"], queryRef, {
        subscribe: true
    });

    useEffect(() => {
        if  (loading) return

        
        if (!user) {
            return navigate('/login')
        }
    });

    if (firestoreQuery.isLoading) {
        return (
            <>
                <Flex>
                    <Center>
                        <Stack>
                            <Spinner color='red.500' size={'xl'}/>
                        </Stack>
                    </Center>
                </Flex>
            </>
        );
    }

    const snapshot = firestoreQuery.data;

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={'gray.800'}>
            <Center>
                <Stack>
                    <NewPost />
                    <Stack className='feed'>
                        {snapshot.docs.map(post => {
                            const data = post.data();
                            return (
                                <Post post={data} key={post.id} />
                            )
                        })}
                    </Stack>
                </Stack>
            </Center>
        </Flex>
    )
}

export default Feed;