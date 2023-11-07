import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ChakraProvider, Grid } from '@chakra-ui/react'
import {
    Card, CardHeader, CardBody, Collapse, Button,
    VStack, Heading, Text, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Stack, StackDivider, Badge, Flex, useDisclosure
} from '@chakra-ui/react'
import { Navbar } from "./components";


export const ProofView = () => {
    let { nsid } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;
    const baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""
        }`;
    const profileLink = `${baseUrl}/view/${nsid}`;
    const { isOpen, onOpen, onClose } = useDisclosure();
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

    const handleShare = async () => {
        try {

            // Create a temporary input element
            const tempInput = document.createElement('input');

            // Set the input's value to the link you want to copy
            tempInput.value = profileLink;

            // Append the input element to the document
            document.body.appendChild(tempInput);

            // Select the input's text
            tempInput.select();

            // Copy the selected text to the clipboard
            document.execCommand('copy');

            // Remove the temporary input element
            document.body.removeChild(tempInput);

            toast.success("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy link:", err);
            toast.error("Failed to copy link!");
        }

        // Optionally, you can provide some user feedback
        // alert('Link copied to clipboard: ' + link);
        // if (navigator.share) {
        //     try {
        //         await navigator.share({
        //             title: "Share verification link",
        //             text: "verification link",
        //             url: `${profileLink}`,
        //         });
        //     } catch (err) {
        //         console.log(err);
        //     }
        // } else {
        //     try {
        //         await navigator.clipboard.writeText(profileLink);
        //         toast.success("Link copied to clipboard!");
        //     } catch (error) {
        //         console.error("Failed to copy link:", error);
        //     }
        // }
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
            <Navbar/>

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
                                <div className="flex-col text-center mb-12">
                                    <button className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg" onClick={handleShare}>
                                        {/* <Button colorScheme='purple' size='lg' onClick={handleShare}> */}
                                        Copy Profile Link
                                    </button>
                                </div>
                                {/* <Grid templateColumns="repeat(2, 1fr)" bg="white" alignItems={"center"} justifyContent={"center"} align={"center"} spacing={['4','8']} margin={['3','14']} gap={5}> */}
                                {/* <VStack bg="white" alignItems={"center"} justifyContent={"center"} align={"center"} spacing="4" margin='auto'> */}
                                <Flex style={{ flexWrap: 'wrap' }} alignItems={"center"} justifyContent={"center"} gap={['2', '4']}>
                                    {proofData.proofs.map((proof, index) => (

                                        <Card
                                            borderWidth="1px"
                                            borderRadius="lg"
                                            key={index}
                                            mb={4}
                                            minW={["xs", "md"]}
                                            maxW={["xs", "md"]}
                                            minH={['70%', '100%']}
                                            maxH={['70%', '100%']}
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
                                                       
                                                    </Heading>
                                                    <Heading size='sm'>
                                                        {proof.parameters}
                                                    </Heading>

                                                </VStack>
                                            </CardHeader>
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
                               
                            </>
                        )}
                    </div>
                </section >
            </div >
        </ChakraProvider >
    );
};