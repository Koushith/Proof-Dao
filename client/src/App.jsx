import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./components";
import { Button } from "@chakra-ui/react";

const inputStyle = {
  display: 'block',
  width: '100%',
  fontFamily: 'inherit',
  color: 'rgb(4, 69, 175)',
  paddingBlockStart: '0px',
  paddingBlockEnd: 'var(--spacing-100)',
  paddingInline: '0px',
  border: 'none',
  outline: 'none',
  borderRadius: '0px',
  appearance: 'none',
  backgroundImage: 'none',
  backgroundPosition: 'initial',
  backgroundSize: 'initial',
  backgroundRepeat: 'initial',
  backgroundAttachment: 'initial',
  backgroundOrigin: 'initial',
  backgroundClip: 'initial',
  transform: 'translateZ(0px)',
  fontSize: '30px',
  WebkitFontSmoothing: 'antialiased',
  lineHeight: 'unset',
  WebkitTextFillColor: 'rgb(180, 199, 231)',
  animation: '1ms ease 0s 1 normal none running native-autofill-in',
  transition: 'background-color 1e+08s ease 0s, box-shadow 0.1s ease-out 0s',
  boxShadow: 'rgba(4, 69, 175, 0.3) 0px 1px',
  backgroundColor: 'transparent !important',
};

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [NSID, setNSID] = useState("");
  const [verifiedNSID, setVerifiedNSID] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNSIDChange = (event) => {
    setNSID(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleCreateClick = async () => {
    try {
      setIsLoading(true);
      console.log("nsid", NSID);
      console.log(apiUrl);
      if (!NSID) {
        toast.error("Please enter a valid Psuedoname");
        setIsLoading(false);
        return;
      }
      const resp = await fetch(`${apiUrl}/create/${NSID}`);
      const data = await resp.json();
      if (resp.status === 400) {
        setNSID("");
        toast.error(data.message);
        setIsLoading(false);
        setNSID("");
      }
      if (resp.status === 401) {
        toast.error(data.message);
        setIsLoading(false);
      } else if (resp.status === 200) {
        toast.success(data.message);
        setVerifiedNSID(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (verifiedNSID) {
      navigate(`/add-proof/${NSID}`);
    }
  }, [verifiedNSID, navigate, NSID]);

  return (
    <div style={{height:'100vh'}}>
      <Toaster />
      <Navbar />
      <div className="flex flex-col md:flex-row" style={{height:'10vh'}}>
        <div className="md:w-1/2 p-20">
          <form onSubmit={handleSubmit}>
            <div className="relative my-2 mt-40 ">
              <label htmlFor="provider" className="block text-xl font-medium">
                Pick a pseudonym
              </label>
              <input
                type="text"
                style={inputStyle}
                required
                placeholder="Enter the ID"
                onChange={handleNSIDChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl py-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:h-[50px] p-2.5"
              />
            </div>
            <Button
              type="submit"
              className="btn"
              isLoading={isLoading}
              size={'lg'}
              colorScheme="purple"
              variant='solid'
              onClick={handleCreateClick}
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-auto"
            alt="hero"
            src="https://images.typeform.com/images/WMALzu59xbXQ/image/default-firstframe.png"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
