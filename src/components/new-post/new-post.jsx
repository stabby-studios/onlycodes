import React, { useRef } from 'react';
import { Box, Stack, Textarea, Text, Button, ButtonGroup } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeMerge, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';

import './new-post.css'

const NewPost = () => {

    const inputFile = useRef(null)

    const onUploadButtonClick = () => {
        inputFile.current.click()
    }

    return (

        <Box className="new-post">
            <Stack spacing={4}>
                <Text fontSize='2xl'>New item</Text>
                <Textarea placeholder="What's on your mind?" />
                <ButtonGroup>
                    <input type="file" ref={inputFile} name="upload" id="upload" style={{ display: 'none' }} />

                    <Button variant='outline' onClick={onUploadButtonClick}>
                        <FontAwesomeIcon icon={faFileArrowUp} />
                    </Button>

                </ButtonGroup>
                <Button variant='solid'>
                    <FontAwesomeIcon icon={faCodeMerge} /> Merge to feed
                </Button>
            </Stack>
        </Box>

    );
}

export default NewPost;