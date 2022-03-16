/**
 * Singular post.
 */
import { Box, Center, Stack, Image, Avatar, Text, Link, IconButton, Spinner } from '@chakra-ui/react'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'

const SinglePost = () => {

    let params = useParams()
    const nav = useNavigate()
    const [data] = useGetPost(params.id)

    const handleGoBack = (event) => {
        nav(-1)
    }

    if (!data) {
        return (
            <Center py={6}>
                <Spinner size={'xl'} />
            </Center>
        )
    }

    return (
        <Center py={6}>
            <Stack>
                <Box>
                    <IconButton icon={<FontAwesomeIcon icon={faAngleLeft} />} onClick={handleGoBack} />
                </Box>
                <Box
                    maxW={"445px"}
                    w={"445px"}
                    bg={'gray.900'}
                    boxShadow={"2xl"}
                    rounded={"md"}
                    p={6}
                    overflow={"hidden"}
                >
                    {data && data.image && (
                        <Box
                            h={"210px"}
                            bg={"gray.100"}
                            mt={-6}
                            mx={-6}
                            mb={6}
                            pos={"relative"}
                        >
                            {<Image src={data.image} layout={"fill"} />}
                        </Box>
                    )}
                    <Stack>
                        <Text color={"white"}>{data.content}</Text>
                        <Box className="post-stats">
                            <Text fontSize="sm">{data.replies} Commits</Text>
                            <Text fontSize="sm">{data.likes.uid.length} Likes</Text>
                            <Text fontSize="sm">{data.forks} Forks</Text>
                        </Box>
                    </Stack>
                    <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                        <Avatar
                            src={
                                data.user.avatar
                            }
                            alt={"Author"}
                        />
                        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                            <Link href={"profile/" + data.user.uid} className="author">
                                <Text fontWeight={600}>@{data.user.username}</Text>
                            </Link>
                            <Text color={"gray.500"}>{data.createdAt.toDate().toLocaleString()}</Text>
                        </Stack>
                    </Stack>
                    {/* <PostActions postId={params.id} userId={user.uid} /> */}
                </Box>
            </Stack>
        </Center>
    )
}

export default SinglePost