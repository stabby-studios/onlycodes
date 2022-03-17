import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Center,
    Text,
    Stack,
    Avatar,
    Image,
    Link,
    Button,
    ButtonGroup,
    useDisclosure,
    Modal, ModalOverlay, ModalContent,
    ModalFooter, ModalBody,
    ModalCloseButton, Textarea
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faCodeFork,
    faCodeCommit,
    faCancel,
} from "@fortawesome/free-solid-svg-icons";
import {
    faHeart as faHeartRegular
} from "@fortawesome/free-regular-svg-icons"
import { faCodeMerge } from "@fortawesome/free-solid-svg-icons";
import "./post.css";
import { db, auth } from "../../firebase";
import { collection, doc } from 'firebase/firestore'
import { useFirestoreDocument, useFirestoreTransaction } from "@react-query-firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";

const PostActions = ({ postId, userId, post, user }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [postContent, setPostContent] = useState('');
    // const [postImage, setPostImage] = useState(null); // TODO: Try and figure this out...
    const textareaRef = useRef(null)

    const col = collection(db, "posts");
    const ref = doc(col, postId.toString());
    const fref = ref.firestore;

    const docRef = doc(db, "posts", postId);
    const postFromDoc = useFirestoreDocument(["posts", postId], docRef, {
        subscribe: true
    });

    const [data] = useProfile(userId)

    //#region Like mutation
    const likeMutation = useFirestoreTransaction(fref, async (tsx) => {
        // Get the document
        const doc = await tsx.get(ref);

        var likesOnPost = doc.data().likes.uid;

        if (likesOnPost.length === 0) {
            console.log('no likes')
            likesOnPost.push(userId.toString());
            tsx.update(ref, {
                likes: {
                    uid: likesOnPost
                }
            });

            return likesOnPost;
        }

        if (likesOnPost.includes(userId.toString())) {
            let index = likesOnPost.indexOf(userId.toString());

            if (index !== -1) {
                likesOnPost.splice(index, 1);
            }

            tsx.update(ref, {
                likes: {
                    uid: likesOnPost
                }
            });

            return likesOnPost
        }

        likesOnPost.push(userId.toString())

        tsx.update(ref, {
            likes: {
                uid: likesOnPost
            }
        })

        return likesOnPost;
    });
    //#endregion
    //#region Add reply
    const replyMutation = useFirestoreTransaction(fref, async (tsx) => {
        const doc = await tsx.get(ref);

        var replies = doc.data().replies;

        if (replies.length === 0) {
            console.log('no replies');
            replies.push({
                postContent,
                userId,
                user: {
                    name: data.name,
                    avatar: user.photoURL
                },
                createdAt: new Date()
            })

            tsx.update(ref, {
                replies: replies
            })

            return replies
        }

        replies.push({
            postContent,
            userId,
            user: {
                name: data.name,
                avatar: user.photoURL
            },
            createdAt: new Date()
        })

        tsx.update(ref, {
            replies: replies
        })

        return replies
    })
    //#endregion


    if (postFromDoc.isLoading) {
        return <>Loading post...</>
    }
    const postSnapshot = postFromDoc.data;

    const handleClickAddLike = (event) => {
        event.preventDefault()
        console.log('clicked like')

        likeMutation.mutate()
    }

    const handleClickAddReply = (event) => {
        event.preventDefault()
        console.log('clicked add reply');

        onOpen();
    }

    const handleClickFork = (event) => {
        event.preventDefault()
        console.log('clicked fork');
    }


    const handleChangePostContent = (event) => {
        event.preventDefault();

        setPostContent(event.target.value);
    }

    const handleClickReplyPost = (event) => {
        event.preventDefault()

        // add logic to reply to the post.
        replyMutation.mutate()
    }

    return (
        <React.Fragment>
            <ButtonGroup variant="outline" spacing="4">
                <Button onClick={handleClickAddReply}>
                    <FontAwesomeIcon icon={faCodeCommit} />
                </Button>
                <Button onClick={handleClickAddLike}>
                    {/* <FontAwesomeIcon icon={postSnapshot.data().likes.uid.includes(userId.toString()) ? faHeart : faHeartRegular} /> */}
                    {
                        postSnapshot.data().likes.uid.includes(userId.toString()) === true ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartRegular} />
                    }
                </Button>
                <Button onClick={handleClickFork}>
                    <FontAwesomeIcon icon={faCodeFork} />
                </Button>
            </ButtonGroup>

            <>
                <Modal isOpen={isOpen} onClose={onClose} isCentered >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box className="new-post">
                                <Stack spacing={4}>
                                    <Text fontSize='2xl'>Replying to {post.user.username}</Text>
                                    <Textarea placeholder="What's on your mind?" onChange={handleChangePostContent} ref={textareaRef} />
                                </Stack>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                <FontAwesomeIcon icon={faCancel} /> Cancel
                            </Button>
                            <Button variant='solid' onClick={handleClickReplyPost}>
                                <FontAwesomeIcon icon={faCodeMerge} /> Reply
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </React.Fragment>
    );
};

export default function Post({ post, postId }) {

    const [user, loading] = useAuthState(auth);
    const nav = useNavigate()



    useEffect(() => {

        if (loading) {
            return;
        }

        if (!user) {
            return
        }

    }, [user, loading])

    const handleClickOnPost = (event) => {
        event.preventDefault()

        nav("/Post/" + postId)
    }

    return (
        <Center py={6} className="post-p">
            <Box
                maxW={"445px"}
                w={"445px"}
                bg={'gray.900'}
                boxShadow={"2xl"}
                rounded={"md"}
                p={6}
                overflow={"hidden"}
            >
                {post.image && (
                    <Box
                        h={"210px"}
                        bg={"gray.100"}
                        mt={-6}
                        mx={-6}
                        mb={6}
                        pos={"relative"}
                    >
                        {<Image src={post.image} layout={"fill"} />}
                    </Box>
                )}
                <Stack onClick={handleClickOnPost}>
                    <Stack className='post-content-text'>
                        <Text color={"white"}>{post.content}</Text>
                    </Stack>
                    <Box className="post-stats">
                        <Text fontSize="sm">{post.replies.length} Commits</Text>
                        <Text fontSize="sm">{post.likes.uid.length} Likes</Text>
                        <Text fontSize="sm">{post.forks} Forks</Text>
                    </Box>
                </Stack>
                <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                    <Avatar
                        src={
                            post.user.avatar
                        }
                        alt={"Author"}
                    />
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        <Link href={"profile/" + post.user.uid} className="author">
                            <Text fontWeight={600}>@{post.user.username}</Text>
                        </Link>
                        <Text color={"gray.500"}>{post.createdAt.toDate().toLocaleString()}</Text>
                    </Stack>
                </Stack>
                <PostActions postId={postId} userId={user.uid} post={post} user={user} />
            </Box>
        </Center>
    );
}
