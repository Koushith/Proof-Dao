export const Navbar = () => {
    return (
        <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
                <div class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img
                    alt="logo"
                        src="https://assets.website-files.com/63f580596efa74629ceecdf5/646cd0d4bff811689094709c_Reclaim-Logo-Asterisk.jpg"
                        class="w-10 h-10 rounded-full"
                    />

                    <span class="ml-3 font-bold text-xl">Proof Dao</span>
                </div>
                <a href="https://www.reclaimprotocol.org/">
                    <button class="inline-flex cursor-pointer items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                        🔗 Reclaim Protocol
                    </button>
                </a>
            </div>
        </header>
    )
}