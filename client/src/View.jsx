import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components";

const View = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    let { nsid } = useParams();
    const [proofData, setProofData] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${apiUrl}/fetch/${nsid}`);
            const data = await res.json();
        
            setProofData(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Toaster />
            <Navbar />
            {/* <div className="container mx-auto py-8">
                {proofData && (
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                            Profile of {nsid}
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {proofData.proofs.map((proof, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
                                >
                                    <h2 className="text-xl font-semibold mb-2">{nsid}</h2>
                                    <p className="text-gray-500 text-sm mb-4">{proofData?.selectedOptions?.map(p => p)}</p>
                                    <span className="text-green-500">Verified</span>
                                    <div className="mt-4">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">Claim Id:</span>
                                            <span>{proof.templateClaimId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold">Owner Public Key:</span>
                                            <span>{proof.ownerPublicKey.substr(0, 8)}.......</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold">Timestamp:</span>
                                            <span>{proof.timestampS}</span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div> */}

            <div className=" flex items-center justify-center">


                <div
                    className="relative w-full max-w-2xl my-8 md:my-16 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">

                    <span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-green-600 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
                        Verified
                    </span>

                    <div className="w-full flex justify-center sm:justify-start sm:w-auto">
                        <img className="object-cover w-20 h-20 mt-3 mr-3 rounded-full" src="data:image/jpeg;base64,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" />
                    </div>

                    <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">

                        <p className="text-xl font-semibold" itemprop="author">
                         {nsid}
                        </p>

                        <div className="mb-4 md:text-lg text-gray-500">
                            <p>{proofData?.selectedOptions?.map(p => p)}</p>
                        </div>

                        <div className="flex gap-4">


                            <a href="#">Click here to Request more info</a>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export { View };
