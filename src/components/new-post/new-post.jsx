import React, { useRef, useState } from 'react';
import { Box, Stack, Textarea, Text, Button, ButtonGroup } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeMerge, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';

import './new-post.css'
import { collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const NewPost = () => {
    const [user] = useAuthState(auth);

    const dbRef = collection(db, "posts");
    const mutation = useFirestoreCollectionMutation(dbRef);

    const inputFile = useRef(null);
    const textAreaRef = useRef(null);

    /**
     * Post State on Component...
     */
    const [postContent, setPostContent] = useState('');
    // const [postImage, setPostImage] = useState(null); // TODO: Try and figure this out...

    const handleChangePostContent = (event) => {
        event.preventDefault();

        setPostContent(event.target.value);
    }

    const onUploadButtonClick = () => {
        inputFile.current.click()
    }

    const handleClickCreateNewPost = (event) => {
        event.preventDefault();

       textAreaRef.current.value = ""

        mutation.mutate({
            user: {
                uid: user.uid,
                username: user.displayName,
                avatar: user.photoURL ?? 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            },
            content: postContent,
            image: null,
            replies: [],
            likes: {
                uid: []
            },
            forks: [],
            createdAt: new Date()
        });


    }

    return (

        <Box className="new-post">
            <Stack spacing={4}>
                <Text fontSize='2xl'>New item</Text>
                <Textarea placeholder="What's on your mind?" onChange={handleChangePostContent} ref={textAreaRef}/>
                <ButtonGroup>
                    <input type="file" ref={inputFile} name="upload" id="upload" style={{ display: 'none' }} />

                    <Button variant='outline' onClick={onUploadButtonClick}>
                        <FontAwesomeIcon icon={faFileArrowUp} />
                    </Button>

                </ButtonGroup>
                <Button variant='solid' disabled={mutation.isLoading} onClick={handleClickCreateNewPost}>
                    <FontAwesomeIcon icon={faCodeMerge} /> Merge to feed
                </Button>
            </Stack>
        </Box>

    );
}

export default NewPost;