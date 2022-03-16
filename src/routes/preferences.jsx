import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Box, Stack, Flex, Center, Tabs, TabPanels, TabPanel, TabList, Tab } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileData from '../components/preferences/profile-data';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBrush, faGears, faHashtag } from '@fortawesome/free-solid-svg-icons';
import ProfileSocials from '../components/preferences/profile-socials';


const Preferences = () => {
    const [profile, setProfile] = useState({});
    const [documentId, setDocumentId] = useState('')

    let params = useParams();

    // not using the useProfile hook beacuse this needs to set the document id for the preferences. page
    const fetchProfile = useCallback(async () => {
        try {
            const profileSnapshot = await getDocs(collection(db, "users"));
            const data = [];

            if (profileSnapshot) {
                setDocumentId(profileSnapshot.docs[0].id);
            }

            profileSnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            const foundProfile = data.find(p => p['uid'] === params.id);
            setProfile(foundProfile);

        } catch (e) {
            console.error(e);
        }
    }, [params.id]);



    useEffect(() => {

        fetchProfile();

    }, [fetchProfile])

    return (
        <>
            <Flex align={'center'} justify={'center'} bg={'gray.800'} position={'relative'} top={'25px'}>
                <Center>
                    <Tabs orientation="vertical" isLazy>
                        <TabList>
                            <Tab><FontAwesomeIcon icon={faUser} /> Profile</Tab>
                            <Tab><FontAwesomeIcon icon={faHashtag} /> Socials</Tab>
                            <Tab><FontAwesomeIcon icon={faBrush} /> Appearence</Tab>
                            <Tab><FontAwesomeIcon icon={faGears} /> Settings</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ProfileData profile={profile} />
                            </TabPanel>
                            <TabPanel>
                                <ProfileSocials profile={profile} documentId={documentId} />
                            </TabPanel>
                            <TabPanel>
                                <Box width='750px' shadow="base" rounded={[null, "md"]} overflow={{ sm: 'hidden' }}>
                                    <Stack px={4} py={5} bg={'gray.700'} spacing={6} p={{ sm: 6 }} height='580px'>
                                        <h1>2nd tab</h1>
                                    </Stack>
                                </Box>
                            </TabPanel>
                            <TabPanel>
                                <Box width='750px' shadow="base" rounded={[null, "md"]} overflow={{ sm: 'hidden' }}>
                                    <Stack px={4} py={5} bg={'gray.700'} spacing={6} p={{ sm: 6 }} height='580px' >
                                        <h1>3rd tab</h1>
                                    </Stack>
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Center>
            </Flex>

        </>
    );
}

export default Preferences