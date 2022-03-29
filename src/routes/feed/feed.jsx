import React, { useCallback, useEffect, useState } from 'react';
import { Center, Stack, Flex } from '@chakra-ui/react'
import NewPost from '../../components/new-post/new-post';
import './feed.css'
import Post from '../../components/post/post';
import { db, auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SubSpinner from '../../components/utility/SubSpinner/subspinner';

const Feed = () => {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const [authedUser, setAuthedUser] = useState({});

    const queryRef = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const firestoreQuery = useFirestoreQuery(["posts"], queryRef, {
        subscribe: true
    });

    const fetchUser = useCallback(async () => {
        try {
            const userSnapshot = await getDocs(collection(db, "users"));
            const data = []

            userSnapshot.forEach((doc) => {
                data.push(doc.data())
            })

            if (!user) {
                return;
            } else {
                const u = data.find(foundUser => foundUser['uid'] === user.uid)
                setAuthedUser(u)
            }
        } catch (e) {
            console.error(error)
            alert(e)
        }
    }, [error, user])

    useEffect(() => {
        if (loading) return
        if (!user) {
            return navigate('/login')
        }

        fetchUser()

    }, [fetchUser, user, loading, navigate]);


    if (firestoreQuery.isLoading) {
        return (
            <>
                <Flex align={'center'} justify={'center'} bg={'gray.800'}>
                    <Center>
                        <Stack>
                            <SubSpinner />
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
                    <NewPost loggedInUser={authedUser} />
                    <Stack className='feed'>
                        {snapshot.docs.map(post => {
                            const data = post.data();
                            return (
                                <Post post={data} postId={post.id} key={post.id} />
                            )
                        })}
                    </Stack>
                </Stack>
            </Center>
        </Flex>
    )
}

export default Feed;