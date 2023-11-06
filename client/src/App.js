import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, ChakraProvider } from '@chakra-ui/react'

import { Navbar } from "./components/navbar.component";

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("create");
  const [NSID, setNSID] = useState("");
  const [verifiedNSID, setVerifiedNSID] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const handleUpdateSwitch = (event) => {
    setSelectedTab('update');
  };

  const handleCreateSwitch = () => {
    setSelectedTab('create');
  };

  const handleViewSwitch = () => {
    setSelectedTab('view');
  };

  const handleNSIDChange = (event) => {
    setNSID(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUpdateClick = async () => {
    try {
      const resp = await fetch(`${apiUrl}/check/${NSID}`);
      const data = await resp.json();
      if (resp.status === 401) {
        toast.error(data.message);
      }
      else if (resp.status === 200) {
        toast.success(data.message);
        setVerifiedNSID(true);
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleViewClick = async () => {
    try {
      const resp = await fetch(`${apiUrl}/check/${NSID}`);
      const data = await resp.json();
      if (resp.status === 401) {
        toast.error(data.message);
      }
      else if (resp.status === 200) {
        toast.success(data.message);
        setViewProfile(true);
      }
    }
    catch (err) {
      console.log(err);
    }
  };


  const handleCreateClick = async () => {
    try {
      setIsLoading(true);
      if (!NSID) {
        // toast.error("Please enter a valid NSID");
        setIsLoading(false);
        return;
      }
      const resp = await fetch(`${apiUrl}/create/${NSID}`);
      const data = await resp.json();
      if (resp.status === 401) {
        toast.error(data.message);
        setIsLoading(false);
      }
      else if (resp.status === 200) {
        toast.success(data.message);
        setVerifiedNSID(true);
        setIsLoading(false);
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (verifiedNSID) {
      navigate(`/add-proof/${NSID}`);
    }
  }, [verifiedNSID]);

  useEffect(() => {
    if (viewProfile) {
      navigate(`/view/${NSID}`);
    }
  }, [viewProfile]);


  return (
    <>
      <>
        <>
          <>
            <>
              <Toaster />
              {/* <Navbar /> */}
              <>

                <div class=" flex  gap-20" style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div class="w-[1/2] p-20" style={{ minWidth: '50%' }}>


                    <div class="">
                      <form onSubmit={handleSubmit}>
                        <div class="flex-grow w-full h-full block">
                          <div class="relative flex-grow w-full h-full my-2">
                            <label for="provider" class="block mb-2 text-xl font-medium ">
                              Pick a psuodonym
                            </label>
                            <input type="text" className="input" required placeholder="Enter the ID" onChange={handleNSIDChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-xl py-3  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:h-[50px] p-2.5 " />
                          </div>
                        </div>
                        <div class="flex-grow w-full h-full block mb-2">
                          <Button type="submit" className="btn" isLoading={isLoading} size={'lg'} colorScheme="purple" variant='solid' onClick={handleCreateClick} >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div class="" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 50%'
                  }}>
                    <img
                      class=""
                      alt="hero"
                      src="https://images.typeform.com/images/WMALzu59xbXQ/image/default-firstframe.png"
                    // style="width: 100%; height: 100%;"
                    />
                  </div>
                </div>
              </>
            </>


          </>
        </>
      </>
    </>
  );
}

export default App;
