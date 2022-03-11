import React from 'react';
import { signInGithub, signInGoogle, signInTwitter } from '../../components/github-sign-in';
// import LoginForm from '../../components/forms/login/login-form';
import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    const navigate = useNavigate();

    const handleGithubClick = async () => {
        await signInGithub()

        navigate("/Feed")
    }

    const handleGoogleClick = async () => {
        await signInGoogle()

        navigate("/Feed")
    }

    const handleTwitterClick = async () => {
        await signInTwitter()

        navigate("/Feed")
    }

    return (
        <React.Fragment>
            <Flex align={'center'} justifyContent={'center'} alignContent={'space-evenly'} position={'relative'} top={'75px'}>
                <Box>
                    <Center>
                        <Stack>
                            <Box style={{padding: '16px'}}>
                                <Text>
                                    Welcome to OnlyCodes <FontAwesomeIcon icon={faCode} /> 😎
                                </Text>

                                <Text>
                                    To get started, simply sign in with <FontAwesomeIcon icon={faGithub} /> Github, <FontAwesomeIcon icon={faGoogle} /> Google or <FontAwesomeIcon icon={faTwitter} />Twitter
                                </Text>
                            </Box>
                        </Stack>
                    </Center>
                </Box>
                <Box>
                    <Center>
                        <Stack>
                            <Box>
                                <Text>
                                    Sign in with Github
                                </Text>
                                <Button style={{ height: '100px' }} onClick={handleGithubClick}>
                                    <FontAwesomeIcon size='5x' icon={faGithub} />
                                </Button>
                            </Box>
                            <Box>
                                <Text>
                                    Sign in with Google
                                </Text>
                                <Button style={{ height: '100px' }} onClick={handleGoogleClick}>
                                    <FontAwesomeIcon size='5x' icon={faGoogle} />
                                </Button>
                            </Box>
                            <Box>
                                <Text>
                                    Sign in with Twitter
                                </Text>
                                <Button style={{ height: '100px' }} onClick={handleTwitterClick}>
                                    <FontAwesomeIcon size='5x' icon={faTwitter} />
                                </Button>
                            </Box>
                        </Stack>
                    </Center>
                </Box>
            </Flex>

            {/* <LoginForm  /> */}
        </React.Fragment>
    )
}

export default Login;