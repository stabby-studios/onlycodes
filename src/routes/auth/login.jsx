import React from 'react';
import {signInGithub} from '../../components/github-sign-in';
// import LoginForm from '../../components/forms/login/login-form';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';

const Login = () => {

    const handleClick = () => {
        signInGithub()
    }

    return (
        <React.Fragment>
            <Center>
                <Stack>
                    <Box>
                        <Text>
                            Sign in with Github
                        </Text>
                        <Button style={{height: '100px'}} onClick={handleClick}>
                            <FontAwesomeIcon size='5x' icon={faGithub} />
                        </Button>
                    </Box>
                </Stack>
            </Center>
            {/* <LoginForm  /> */}
        </React.Fragment>
    )
}

export default Login;