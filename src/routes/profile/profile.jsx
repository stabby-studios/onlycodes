import React, { useEffect } from 'react';
import { Box, Stack, HStack, VStack, Text, Center, Avatar, Button, Spinner } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './profile.css';
import { useParams } from 'react-router-dom';
import { faFacebook, faGithub, faInstagram, faStackExchange, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query, collection, limit, where, doc } from 'firebase/firestore';
import { useFirestoreQuery, useFirestoreTransaction } from '@react-query-firebase/firestore';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const FollowUnfollowButton = ({following, userId, targetId}) => {

    const col = collection(db, "users");
    const ref = doc(col, targetId.toString())
    const fref = ref.firestore;

    const userRef = query(col, limit(1), where("uid", "==", userId.toString()));
    const q = useFirestoreQuery(["users"], userRef);
    const snapshot = q.data

    const uref = doc(col, snapshot.docs[0].id.toString())
    const ufref = uref.firestore;

    const followMutation = useFirestoreTransaction(fref, async (tsx) => {
        const doc = await tsx.get(ref);

        var followers = doc.data().followers.followerIds;

        if (followers.length === 0) {
            console.log('no followers. add first one')
            followers.push(userId.toString());

            tsx.update(ref, {
                followers: {
                    followerIds: followers
                }
            });
            return followers;
        }

        if (followers.includes(userId.toString())) {
            let index = followers.indexOf(userId.toString());

            if(index !== -1) {
                followers.splice(index, 1);
            }

            tsx.update(ref, {
                followers: {
                    followerIds: followers
                }
            });
            return followers;
        }

        tsx.update(ref, {
            followers: {
                followerIds: followers
            }
        });

        return followers;
    });

    const updateFollowingMutation = useFirestoreTransaction(ufref, async (tsx) => {
        const doc = await tsx.get(uref);

        var following = doc.data().following.followedUsers;

        if(following.length === 0) {
            console.log('no followed users')
            following.push(targetId.toString())
            tsx.update(uref, {
                following: {
                    followedUsers: following
                }
            });
            return following;
        }

        if (following.includes(userId.toString())) {
            let i = following.indexOf(userId.toString())
            if (i !== -1) {
                following.splice(i, 1);
            }

            tsx.update(uref, {
                following: {
                    followedUsers: following
                }
            });
            return following;
        }

            tsx.update(uref, {
                following: {
                    followedUsers: following
                }
            });
        return following;
    });

    const handleFollowClick = () => {
        console.log('clicked follow/unfollow button')

        followMutation.mutate();
        updateFollowingMutation.mutate();
    }

    if (q.isLoading) {
        return <Spinner />
    }

    return (
        <>
            <Button style={{position: 'relative', left: '10px'}} onClick={handleFollowClick}>
                {
                    following ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />
                }
            </Button>
        </>
    )
}

const Profile = () => {

    let params = useParams();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const ref = query(collection(db, "users"), limit(1), where("name", "==", params.profileName));
    const firestoreQuery = useFirestoreQuery(["users"], ref);

    useEffect(() => {

        if (loading) return;

        if (!user) {
            return <>{navigate('/login')}</>
        }

    }, [user, navigate, loading])

    if (firestoreQuery.isLoading) {
        return <div>Loading user profile data...</div>
    }

    const profileSnapshot = firestoreQuery.data;
    const foundProfileData = profileSnapshot.docs[0].data();

    return (
        <Center>
            <VStack>
                <Stack spacing={4}>
                    <Box className='profile-banner'>
                        <Avatar
                            size={'xl'}
                            src={
                                user.photoURL
                            }
                        />
                        <Text fontSize='2xl' className='profile-name'>
                            @{foundProfileData.name}
                        </Text>

                        <HStack>
                            <Text className='profile-data-text' fontSize='md'>
                                {foundProfileData.following.followedUsers.length} Following
                            </Text>
                            <Text className='profile-data-text' fontSize='md'>
                                {foundProfileData.followers.followerIds.length} Followers
                            </Text>
                            {
                                params.profileName !== user.displayName ? <FollowUnfollowButton following={false} targetId={profileSnapshot.docs[0].id} userId={user.uid} authUserDoc={profileSnapshot.docs[0].id} /> : <></> 
                            }
                        </HStack>
                    </Box>

                </Stack>
                <Stack spacing={4}>

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