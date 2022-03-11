import React from 'react'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import './navbar.css'

import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase';

const Links = ['Feed'];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: 'gray.700',
        }}
        href={"/" + children}>
        {children}
    </Link>
);

const auth = getAuth(app);

export default function Navbar({user}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // signout successful!
            console.log('signed out')
        }).catch((error) => {
            console.log(error)
        })
    }

    const UserMenu = ({user}) => {
        return (
            <>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                size={'xl'}
                                src={
                                    user.avatar ? user.avatar : null
                                }
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <Link href={"/Self/" + user.uid} px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                    }}>
                                    {user.name}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href='/faq' px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                    }}>
                                    FAQ
                                </Link>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem>
                                <Link href={'/Self/' + user.uid + '/Preferences'} px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                    }}>
                                    Preferences
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Link px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                    }}>
                                    Logout
                                </Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </>
        )
    }

    return (
        <>
            <Box bg={'gray.900'} px={4} className="sticky" >
                <Flex  alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <UserMenu user={user} />
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
