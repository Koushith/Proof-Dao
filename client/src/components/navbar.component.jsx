import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate= useNavigate()
    return (
        <header className="text-gray-600 body-font  border-b border-gray-300">
            <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center" >
                <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer" onClick={()=>navigate('/')}>
                    <img
                    alt="logo"
                        src="https://assets.website-files.com/64ca974841739b6ec696173f/64d75492ab17a008282d7d31_Frame%201%20(7).png"
                        className="w-10 h-10 rounded-full"
                    />

                    <span className="ml-3 font-bold text-xl">Proof Dao</span>
                </div>
                <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
    
      <Link to='/all-members' class="mr-5 hover:text-gray-900">All DAO Members</Link>
    </nav>
                <a href="https://www.reclaimprotocol.org/">
                    <button className="inline-flex cursor-pointer items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                        🔗 Reclaim Protocol
                    </button>
                </a>
            </div>
        </header>
    )
}