import { useParams, useNavigate } from "react-router-dom"

import { useState, useEffect, useRef } from "react"

import { Toaster, toast } from "react-hot-toast"

import { Navbar } from "./components"

import { SelectProofs } from "./screens/add-proof/select.component"
import {
  ChakraProvider,
  useDisclosure,
  Button,
  Alert,
  Modal,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Progress,
  Card,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import { QRCodeSVG } from "qrcode.react"

export const AddProof = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  let { nsid } = useParams()
  const [claimUrl, setClaimUrl] = useState(null)
  const [checkId, setCheckId] = useState(null)
  const [selectProvider, setSelectProvider] = useState([])
  const [gotValidProof, setGotValidProof] = useState(false)
  const intervalRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [hideSubmit, setHideSubmit] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  const [provider, setProvider] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const options = [
    { value: "0", label: "Student or Alum of Top 50 Universities" },
    { value: "1", label: "Works at Big4 consulting Firms" },
    { value: "2", label: "Works at FAANG" },
    { value: "yc-login", label: "YC Alum" },
    { value: "carta-esops", label: "Owns ESPOS from Top Companies - CARTA" },
  ]

  // Dummy data array of objects
  const mailProviders = [
    {
      id: 1,
      text: "Login using Gmail",
      logo: "https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png",
      value: "google-login",
    },
    {
      id: 2,
      text: "Login using Outlook",
      logo: "https://icones.pro/wp-content/uploads/2022/04/icone-outlook-bleu.png",
      value: "outlook-login",
    },
  ]

  const [selectedMailProvider, setSlectedMailProvider] = useState({
    provider: "google-login",
    value: "google-login",
    id: 0,
  })
  const [linkGenerationReady, setLinkGenerationReady] = useState(false)
  const handleSelecctMailProvider = (item) => {
    setSlectedMailProvider(item)
    setProvider([
      ...provider,
      {
        provider: item.value,
        value: item.value,
      },
    ])

    setLinkGenerationReady((ready) => !ready)
  }
  console.log("provider---", provider)
  console.log("linkGenerationReady", linkGenerationReady)
  console.log("selectedMailProvider", selectedMailProvider)

  const postData = async () => {
    try {
      setIsLoading(true)
      if (provider.length === 0) {
        toast.error("Please select atleast one credential!")
        setIsLoading(false)
        return
      }
      setGotValidProof(false)
      let url = `${apiUrl}/reclaim-url`
      console.log("before maniplating..", provider)
      const ycCheck =
        selectedOptions.includes("YC Alum") ||
        selectProvider.includes("Owns ESPOS from Top Companies - CARTA")
          ? [
              ...provider,
              { value: "yc-login", provider: "yc-login" },
              { value: "carta-esops", provider: "carta-esops" },
            ]
          : provider
      console.log("ycCheck", ycCheck)
      let options = {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Sec-Fetch-Mode": "cors",
        },
        body: JSON.stringify({
          provider: ycCheck,
          nsId: nsid,
          selectedOptions: selectedOptions,
        }),
      }
      const res = await fetch(url, options)
      const data = await res.json()

      console.log("data", data)
      setCheckId(data.checkId)
      setClaimUrl(data.url)
      setIsLoading(false)
      setHideSubmit(true)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/fetch-check/${checkId}`)
      const data = await response.json()
      if (data.data?.proofs) {
        toast.success("Proof Added to your profile!")
        navigate(`/view/${nsid}`)
      }
    } catch (err) {
      console.log(`error in fetchData: ${err}`)
    }
  }

  const handleGoProfile = () => {
    navigate(`/view/${nsid}`)
  }

  console.log("selected", selectedOptions)
  useEffect(() => {
    if (checkId) {
      intervalRef.current = setInterval(() => {
        fetchData()
      }, 7000)
      return () => clearInterval(intervalRef.current)
    }
  }, [checkId])

  useEffect(() => {
    if (gotValidProof === true) {
      clearInterval(intervalRef.current)
    }
  }, [gotValidProof])

  return (
    <ChakraProvider>
      <div className=''>
        <Toaster />
        <Navbar />

        <section className='text-gray-600 body-font'>
          <div className='container px-5 py-24 mx-auto'>
            <div className='flex flex-col text-center w-full mb-12'>
              {/* <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                                Verified By Default
                            </h1> */}
              {gotValidProof === true && (
                <>
                  <p className='sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900'>
                    Credentials Added to your profile!
                  </p>
                </>
              )}
            </div>

            {/* ceneter- proof collection */}
            <div className='w-[1/2] mx-auto max-w-lg'>
              <form className=''>
                <div className=''>
                  <label
                    htmlFor='countries'
                    className='block mb-2 text-xl text-black'
                    style={{ fontWeight: 600 }}
                  >
                    2 - Attach Credentials to your Psuedonymous Profile
                  </label>

                  <p className='mb-2 mt-2'>Choose as many as you like</p>

                  <div className='mt-4'>
                    {/* <div className="radio-list__Wrapper-sc-16rzvkh-0 buYfpT"><div aria-disabled="false" className="Root-sc-__sc-164255h-0 cnWoOa" data-qa="choice" data-qa-index="0" data-qa-selected="false" data-selectable="true"><div className="Root-sc-__sc-1iyh3rv-0 jodjEt"><div aria-hidden="true" className="KeyHelperWrapper-sc-__sc-1iyh3rv-1 jDPQrH"><div data-qa="key-hint-wrapper-A" className="HintWrapper-sc-__sc-1iyh3rv-5 cvRTpu"><div className="Hint-sc-__sc-1iyh3rv-3 cyGqRo"><span data-qa="key-hint" className="HintText-sc-__sc-1iyh3rv-4 gSClia">Key</span><span className="Letter-sc-__sc-1iyh3rv-2 lDVFL">A</span></div></div></div></div><div data-qa="choice-0-readable-element" aria-label="Instagram" className="ChoiceContent-sc-__sc-1r651ck-0 kNxYOj"><div className="TextWrapper-sc-__sc-1f8vz90-0 fDiQnR">Instagram</div></div><div className="CheckboxContent-sc-__sc-1r651ck-1 jmseRK"><span data-qa="icon-check-svg" className="Boundary-sc-__sc-184gmm6-0 eOWvGy"><svg height="13" width="16"><path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path></svg></span></div></div></div> */}

                    <SelectProofs
                      data={options}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                    />
                  </div>

                  {/* <Select
                                        isDisabled={hideSubmit}
                                        isMulti
                                        options={options}
                                        styles={customStyles}
                                        onChange={handleProviderOptionChange}
                                        placeholder="Select options..."
                                        required
                                        maxMenuHeight={'300px'}
                                    /> */}
                </div>
                <div className='mt-4'>
                  <Button
                    onClick={() => {
                      onOpen()
                      //  postData()
                    }}
                    className='btn mt-6'
                    style={{
                      background: " rgba(4, 69, 175, 0.8)",
                      color: "#fff",
                    }}
                    hidden={hideSubmit}
                    isLoading={isLoading}
                    size={"lg"}
                    variant='solid'
                  >
                    Connect to Credentials Wallet..
                  </Button>
                </div>
              </form>
              {gotValidProof === true && (
                <>
                  <button
                    onClick={handleGoProfile}
                    className='text-white sm:h-[60px] bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-xl'
                  >
                    Profile
                  </button>
                </>
              )}
            </div>

            {/* goes inside model */}
          </div>
        </section>
        {/* drawer */}

        <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Attach Proof (2/2) </DrawerHeader>
            <DrawerBody>
              <p className='pt-4 mb-4 text-black text-xl font-medium'>
                Selected Proofs
              </p>
              {selectedOptions.map((i) => (
                <div
                  key={i}
                  className={`mb-2 cursor-pointer  p-4 hover:bg-gray-100  'bg-gray-100' 
                                    `}
                  style={{
                    borderRadius: "4px",
                    background: " rgba(4, 69, 175, 0.1)",
                    color: "rgb(4, 69, 175)",
                    boxShadow: "rgba(4, 69, 175, 0.8) 0px 0px 0px 2px inset",
                  }}
                >
                  {i}
                </div>
              ))}

              <p className='pt-4 text-base'>
                To Create a Proof you need to login using any of the mail
                provider
              </p>
              <div className='flex mt-4 gap-10 '>
                {mailProviders.map((item) => (
                  <div
                    className='flex items-center justify-center flex-col '
                    key={item.id}
                    onClick={() =>
                      handleSelecctMailProvider({
                        id: item.id,
                        value: item.value,
                        provider: item.value,
                      })
                    }
                    style={{
                      borderRadius: "4px",
                      padding: "20px",
                      border:
                        selectedMailProvider.id === item.id
                          ? "1px solid rgba(4, 69, 175, 0.8)"
                          : "1px solid #eee",

                      margin: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.logo}
                      alt='logo'
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                    <p className='text-center mt-2 font-semibold'>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className='mt-6 mb-6'> And</p>

              <div className='flex justify-start'>
                {selectedOptions.includes("YC Alum") && (
                  <div>
                    <div
                      className='flex items-center justify-center flex-col '
                      style={{
                        borderRadius: "4px",
                        padding: "20px",
                        border: "1px solid rgba(4, 69, 175, 0.8)",
                        width: "fit-content",
                        margin: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/220px-Y_Combinator_logo.svg.png'
                        alt='logo'
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                      />
                      <p className='text-center mt-2 font-semibold'>
                        YC- BookFace
                      </p>
                    </div>
                  </div>
                )}

                {selectedOptions.includes(
                  "Owns ESPOS from Top Companies - CARTA"
                ) && (
                  <div>
                    <div
                      className='flex items-center justify-center flex-col '
                      style={{
                        borderRadius: "4px",
                        padding: "20px",
                        border: "1px solid rgba(4, 69, 175, 0.8)",
                        width: "fit-content",
                        margin: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src='https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/wypw7nnrsebjl8k2eljh'
                        alt='logo'
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                      />
                      <p className='text-center mt-2 font-semibold'>
                        CARTA - ESOPS
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {!claimUrl && (
                <Button
                  onClick={postData}
                  mt={4}
                  colorScheme='blue'
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              )}

              <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 justify-center  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-center sm:items-end'>
                {claimUrl !== null && (
                  <div className='flex flex-col justify-center items-center gap-4 text-center w-full mt-12'>
                    <p className='sm:text-3xl hidden md:block text-2xl font-medium title-font mb-4 text-gray-900'>
                      Scan in Reclaim App
                    </p>
                    <QRCodeSVG
                      className='hidden md:block'
                      height={200}
                      width={200}
                      value={claimUrl}
                    />
                    <div className='flex-row p-5 rounded-lg  gap-4'>
                      <div className='mb-7'>
                        <p className='sm:text-sm text-sm font-medium title-font justify-centre mb-1 text-gray-900'>
                          Waiting for Proof ....{" "}
                        </p>
                        <Progress size='xs' isIndeterminate />
                      </div>
                      <p className='mt-4 mb-4'>OR</p>
                      <a target='_blank' href={claimUrl} rel='noreferrer'>
                        <button className='text-white w-full bg-indigo-500 border-0 py-2 px-6 focus:outline-none m-2 hover:bg-indigo-600 rounded-xl text-lg'>
                          Tap to Create Proof
                        </button>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </ChakraProvider>
  )
}
