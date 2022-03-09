import React from "react";
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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faCodeFork,
    faCodeCommit,
} from "@fortawesome/free-solid-svg-icons";
import {
    faHeart as faHeartRegular
} from "@fortawesome/free-regular-svg-icons"
import "./post.css";
import { db } from "../../firebase";
import { collection, doc } from 'firebase/firestore'
import { useFirestoreDocument, useFirestoreTransaction } from "@react-query-firebase/firestore";

const PostActions = ({ postId, userId }) => {

    const col = collection(db, "posts");
    const ref = doc(col, postId.toString());
    const fref = ref.firestore;

    const docRef = doc(db, "posts", postId);
    const postFromDoc = useFirestoreDocument(["posts", postId], docRef, {
        subscribe: true
    });

    const likeMutation = useFirestoreTransaction(fref, async (tsx) => {
        // Get the document
        const doc = await tsx.get(ref);

        var likesOnPost = doc.data().likes.uid;

        if (likesOnPost.length === 0) {
            likesOnPost.push(userId.toString());
            tsx.update(ref, {
                likes: {
                    uid: likesOnPost
                }
            })

            return likesOnPost
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
            })

            return likesOnPost;
        }

        likesOnPost.push(userId.toString())

        tsx.update(ref, {
            likes: {
                uid: likesOnPost
            }
        })


        // if (!likesOnPost.includes(userId.toString())) {
        //     likesOnPost.push(userId.toString())
        //     tsx.update(fref, {
        //         likes: {
        //             uid: likesOnPost
        //         }
        //     });
        // } else {
        //     var likeIndexOnPost = likesOnPost.indexOf(userId);
        //     if (likeIndexOnPost !== -1) {
        //         likesOnPost.splice(likeIndexOnPost, 1);
        //     }

        //     tsx.update(fref, {
        //         likes: {
        //             uid: likesOnPost
        //         }
        //     });
        // }
        return likesOnPost;
    });

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
    }

    const handleClickFork = (event) => {
        event.preventDefault()
        console.log('clicked fork');
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
        </React.Fragment>
    );
};

export default function Post({ post, postId }) {
    return (
        <Center py={6}>
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
                <Stack>
                    <Text color={"white"}>{post.content}</Text>
                    <Box className="post-stats">
                        <Text fontSize="sm">{post.replies} Commits</Text>
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
                        <Link href={"/" + post.user.username} className="author">
                            <Text fontWeight={600}>@{post.user.username}</Text>
                        </Link>
                        <Text color={"gray.500"}>{post.createdAt.toDate().toLocaleString()}</Text>
                    </Stack>
                </Stack>
                <PostActions postId={postId} userId={post.user.uid} />
            </Box>
        </Center>
    );
}
