export const Navbar = () => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
                <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img
                    alt="logo"
                        src="https://assets.website-files.com/63f580596efa74629ceecdf5/646cd0d4bff811689094709c_Reclaim-Logo-Asterisk.jpg"
                        className="w-10 h-10 rounded-full"
                    />

                    <span className="ml-3 font-bold text-xl">Proof Dao</span>
                </div>
                <a href="https://www.reclaimprotocol.org/">
                    <button className="inline-flex cursor-pointer items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                        🔗 Reclaim Protocol
                    </button>
                </a>
            </div>
        </header>
    )
}