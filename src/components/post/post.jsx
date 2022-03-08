import React from "react";
import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
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

import "./post.css";

const PostActions = () => {
  return (
    <React.Fragment>
      <ButtonGroup variant="outline" spacing="4">
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
};

export default function Post({ post }) {
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"445px"}
        bg={useColorModeValue("white", "gray.900")}
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
            <Text fontSize="sm">{post.replyIds.length} Commits</Text>
            <Text fontSize="sm">{post.likedBy.length} Likes</Text>
            <Text fontSize="sm">{post.forkedBy.length} Forks</Text>
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
        <PostActions />
      </Box>
    </Center>
  );
}
