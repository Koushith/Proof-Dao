import { useEffect, useState } from "react"
import { Navbar } from "../../components"
import { useNavigate } from "react-router-dom"

export const ViewAllMembers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [members, setMembers] = useState([])

      const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchAllMembers = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`${apiUrl}/all-members`)
            const data = await res.json()
            console.log(data)
            setMembers(data)
            setIsLoading(false)
        } catch (error) {
            console.log("something went wrong.. ", error)
        }
    }

    useEffect(() => {
        fetchAllMembers()
    }, [])
    console.log(members)
  
    return (
        <>
            <Navbar />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">All Members</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Unlocking Trust Through Verified Profiles"</p>
                    </div>
                    <div className="flex flex-wrap -m-2">


                        {isLoading ? <>Loading...</> : <>

                            {members.map(m => (
                                <div className="p-2 lg:w-1/3 md:w-1/2 w-full cursor-pointer" key={m.nsId} onClick={()=> navigate(`/view/${m.nsId}`)}>
                                    <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                        < img
                                            alt="team"
                                            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                            src="https://picsum.photos/80/80/?random"
                                        />
                                        <div className="flex-grow">
                                            <h2 className="text-gray-900 title-font font-medium">{m?.nsId}</h2>
                                            <p className="text-gray-500">
                                                {/* {m.data.proofs[0] &&
                                                    (() => {
                                                        const emailAddress = JSON.parse(m.data.proofs[0].parameters)?.emailAddress;
                                                        if (emailAddress) {
                                                            const [localPart, domain] = emailAddress.split('@');
                                                            const maskedLocalPart = '*'.repeat(localPart.length);
                                                            const maskedEmailAddress = `${maskedLocalPart}@${domain}`;
                                                            return maskedEmailAddress;
                                                        }
                                                    })()} */}

                                                    {m?.data?.selectedOptions?.map(p=>p)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>}



                    </div>
                </div>
            </section>
        </>
    )
}