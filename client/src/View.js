import { useParams, useNavigate } from "react-router-dom";

import { QRCodeSVG } from "qrcode.react";

import { useState, useEffect } from "react";

import { Toaster, toast } from "react-hot-toast";
import { ChakraProvider, Grid } from '@chakra-ui/react'
import { TriangleDownIcon } from '@chakra-ui/icons'
import {
    Card, CardHeader, CardBody, Collapse, Button,
    VStack, Heading, Text, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Stack, StackDivider, Badge, IconButton, Flex, useDisclosure
} from '@chakra-ui/react'


export const View = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { isOpen, onOpen, onClose } = useDisclosure();
    let { nsid } = useParams();
    const [proofData, setProofData] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [collapsedCards, setCollapsedCards] = useState({});
    const [selectedProof, setSelectedProof] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);




    const navigate = useNavigate();

    const checkNSID = async () => {
        try {
            const resp = await fetch(`${apiUrl}/check/${nsid}`);
            if (resp.status === 401) {
                setIsVerified(false);
            }
            else if (resp.status === 200) {
                setIsVerified(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${apiUrl}/fetch/${nsid}`);
            const data = await res.json();
            setProofData(data.data);
            console.log(proofData);
        } catch (err) {
            console.log(err);
        }
    };

    const handleGoBack = () => {
        navigate(`/`);
    }

    const handleViewProof = (proof) => {
        if (selectedProof === null && isModalOpen === false && proof !== null) {
            setSelectedProof(proof);
            setIsModalOpen(true);
        }
    }

    const closeModal = () => {
        setSelectedProof(null);
        setIsModalOpen(false);
    };


    const toggleCollapse = (index) => {
        setCollapsedCards({
            ...collapsedCards,
            [index]: !collapsedCards[index],
        });
    };


    useEffect(() => {
        checkNSID();
    }, []);

    useEffect(() => {
        if (isVerified === true) {
            fetchProfile();
        }
    }, [isVerified]);


    return (
        <ChakraProvider>
            <div className="">
                <Toaster />
                <header className="text-gray-600 body-font border ">
                    <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
                        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <img
                                src="https://assets.website-files.com/63f580596efa74629ceecdf5/646cd0d4bff811689094709c_Reclaim-Logo-Asterisk.jpg"
                                className="w-10 h-10 rounded-full"
                            />

                            <span className="ml-3 font-bold text-xl">Proofs DAO</span>
                        </a>
                        <a href="https://www.reclaimprotocol.org/">
                            <button className="inline-flex cursor-pointer items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                🔗 Reclaim Protocol
                            </button>
                        </a>
                    </div>
                </header>

                <section className="text-gray-600 body-font">
                    <div className="container py-20 mx-auto text-center">
                        {isVerified === false && (
                            <>
                                <div className="flex flex-col text-center w-full mb-12">
                                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                                        Invalid NS.ID. Please check again.
                                    </h1>
                                </div>
                            </>
                        )}
                        {isVerified === true && proofData !== null && (
                            <>
                                <div className="flex flex-col text-center w-full mb-12">
                                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                                        Credentials of {nsid} ID
                                    </h1>
                                </div>
                                {/* <Grid templateColumns="repeat(2, 1fr)" bg="white" alignItems={"center"} justifyContent={"center"} align={"center"} spacing={['4','8']} margin={['3','14']} gap={5}> */}
                                    {/* <VStack bg="white" alignItems={"center"} justifyContent={"center"} align={"center"} spacing="4" margin='auto'> */}
                                    <Flex style={{flexWrap:'wrap'}} alignItems={"center"} justifyContent={"center"} gap={['2','4']}>
                                        {proofData.proofs.map((proof, index) => (
                                            
                                            <Card
                                                borderWidth="1px"
                                                borderRadius="lg"
                                                key={index}
                                                mb={4}
                                                minW={["xs", "md"]}
                                                maxW={["xs", "md"]}
                                                minH={['70%','100%']}
                                                maxH={['70%','100%']}
                                                variant="elevated"
                                                onClick={() => handleViewProof(proof)}
                                                shadow={"lg"}

                                            >
                                                <CardHeader>
                                                    <VStack align='left' spacing='4'>
                                                        <Heading size='md'>
                                                            {proof.provider}
                                                            <Badge ml='3' size='md' colorScheme='green'>
                                                                Verified
                                                            </Badge>
                                                            {/* <Flex
                                                            position="absolute"
                                                            top="1"
                                                            right="1"
                                                            p="2"
                                                            bg="white"
                                                            borderRadius="md"
                                                        >
                                                            <IconButton
                                                                aria-label="TriangleDown"
                                                                icon={<TriangleDownIcon />}
                                                                onClick={() => toggleCollapse(index)}
                                                            />
                                                        </Flex> */}
                                                        </Heading>
                                                        <Heading size='sm'>
                                                            {proof.parameters}
                                                        </Heading>

                                                    </VStack>
                                                </CardHeader>
                                                {/* <CardBody>
                                                <Collapse
                                                    in={collapsedCards[index]}
                                                >
                                                    <Stack divider={<StackDivider />} spacing='4'>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Claim Id
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.templateClaimId}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Parameters
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.parameters}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Owner Public Key
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.ownerPublicKey}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Timestamp
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.timestampS}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Witness Addresses
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.witnessAddresses}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Signatures
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.signatures}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Redacted Parameters
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.redactedParameters}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Context
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.context}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Epoch
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.epoch}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Identifier
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {proof.identifier}
                                                            </Text>
                                                        </Box>

                                                    </Stack>
                                                </Collapse>
                                            </CardBody> */}
                                            </Card>
                                        ))}
                                        {selectedProof !== null && (
                                            <Modal isOpen={isModalOpen} onClose={closeModal} scrollBehavior="inside">
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>{selectedProof.provider}</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Stack divider={<StackDivider />} spacing='4'>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Claim Id
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.templateClaimId}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Parameters
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.parameters}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Owner Public Key
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.ownerPublicKey}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Timestamp
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.timestampS}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Witness Addresses
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.witnessAddresses}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Signatures
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.signatures}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Redacted Parameters
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.redactedParameters}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Context
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.context}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Epoch
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.epoch}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Heading size='xs' textTransform='uppercase'>
                                                                    Identifier
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm'>
                                                                    {selectedProof.identifier}
                                                                </Text>
                                                            </Box>

                                                        </Stack>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button colorScheme='blue' mr={3} onClick={closeModal}>
                                                            Close
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>

                                            </Modal>
                                        )}
                                    </Flex>
                                    {/* </VStack> */}
                                {/* </Grid> */}
                            </>
                        )}
                    </div>
                </section >
            </div >
        </ChakraProvider >
    );
};