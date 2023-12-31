import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";

import express from "express";
import { Router } from "express";

import { Check } from "../models/Check.js";
import { ProofDao } from "../models/NSID.js";

const router = Router();
const reclaim = new reclaimprotocol.Reclaim();
// const allProviderParams = require("./utils.json")

router.get("/", (request, response) => {
  response.status(200).json({
    message: "This route works!!",
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get("/check/:nsId", async (req, res) => {
  try {
    const nsId = req.params.nsId;
    const nsIdConfig = await ProofDao.findOne({ nsId: nsId });
    if (!nsIdConfig) {
      return res.status(401).json({ message: "Invalid NS Id, please check." });
    }
    res.status(200).json({ message: "NS Id is valid." });
  } catch (err) {
    console.log(err);
  }
});

router.get("/fetch/:nsId", async (req, res) => {
  try {
    const nsId = req.params.nsId;
    console.log("fetch", nsId)
    const nsIdConfig = await ProofDao.findOne({ nsId: nsId });
    if (!nsIdConfig) {
      return res.status(401).json({ message: "Invalid NS Id, please check." });
    }
    res.status(200).json({ data: nsIdConfig.data });
  } catch (err) {
    console.log(err);
  }
});

router.get("/create/:nsId", async (req, res) => {
  // try {
  //   const nsId = req.params.nsId;
  //   console.log("create route was called", nsId)
  //   const nsIdConfig = await ProofDao.findOne({ nsId: nsId });
  //   console.log("found??", nsIdConfig)
  //   if (nsIdConfig) {
  //     return res.status(401).json({ message: "Given Network State Id already exists." });
  //   }
  //   const newNsIdConfig = await new ProofDao();
  //   newNsIdConfig.nsId = nsId;
  //   await newNsIdConfig.save();
  //   res.status(200).json({ message: "Network State Id has been created." });
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    const nsId = req.params.nsId;
    console.log("create route was called", nsId)
    const nsIdConfig = await ProofDao.findOne({ nsId: nsId });
    console.log("found??", nsIdConfig)
    if (nsIdConfig) {
      return res.status(400).json({ message: "Given  Id already exists." });
    }
    const newNsIdConfig = new ProofDao();
    newNsIdConfig.nsId = nsId;
    await newNsIdConfig.save();
    res.status(200).json({ message: "New Id has been created." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }

});

// Request Reclaim URL for a proof request

const createObj = async () => {
  try {
    const check = new Check();
    check.data = {};
    await check.save();
    return check.checkId;
  } catch (err) {
    console.log(`err: ${err}`);
  }
};



router.post("/reclaim-url", async (req, res) => {
  try {
    const providers = req.body.provider;
    const selectedOptions = req.body.selectedOptions
    console.log("providers---", providers)
    console.log("final dry run-", selectedOptions)
    const nsId = req.body.nsId;
    const nsIdConfig = await ProofDao.findOne({ nsId: nsId });
    if (!nsIdConfig) {
      return res.status(401).json({ message: "Invalid Network State Id, please check." });
    }
    const checkId = await createObj();
    const check = await Check.findOne({ checkId: checkId });
    check.data = { nsId: nsId, providerValue: req.body.provider, selectedOptions };
    await check.save();
    var requestedProofsArr = [];
    for (let provider of providers) {
      requestedProofsArr.push(
        new reclaim.CustomProvider({
          provider: provider?.value,
          payload: {},
        }));
    }
    const request = reclaim.requestProofs({
      title: "Reclaim Protocol",
      baseCallbackUrl: process.env.BASE_URL + "/update/proof",
      callbackId: checkId,
      requestedProofs: requestedProofsArr,
    });
    const reclaimUrl = await request.getReclaimUrl();
    if (!reclaimUrl) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(201).json({ url: reclaimUrl, checkId: checkId });
    return reclaimUrl;
  } catch (err) {
    console.log(`error in getReclaimUrl: ${err}`);
  }
});

// Handle callback from Reclaim Proofs

router.post("/update/proof", async (req, res) => {
  try {
    const check = await Check.findOne({ checkId: req.query.id });
    if (!check) return res.status(401).send("<h1>Unable to update Proof</h1>");
    check.data = {
      ...check.data,
      proofs: JSON.parse(Object.keys(req.body)[0]).proofs,
    };
    await check.save();
    const nsId = await ProofDao.findOne({ nsId: check.data.nsId });
    // console.log('Check data is ', check.data);
    // console.log('Check proofs is ', check.data.proofs);
    if (!nsId) return res.status(401).send("<h1>Unable to update Proof</h1>");
    nsId.data = {
      proofs: check.data.proofs,
      selectedOptions: check.data.selectedOptions
    };
    await nsId.save();
    const url = `${process.env.CLIENT_URL}/proof-view/${check.data.nsId}`;
    const htmlPage = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proof DAO</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div className="container">
        <header className="bg-light border mb-3 p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <a className="d-flex align-items-center text-decoration-none" href="#">
                    <img src="https://assets.website-files.com/63f580596efa74629ceecdf5/646cd0d4bff811689094709c_Reclaim-Logo-Asterisk.jpg"
                        alt="Logo" className="rounded-circle" width="50" height="50">
                    <span className="ml-3 font-weight-bold text-xl">Proof DAO</span>
                </a>
                <a href="https://www.reclaimprotocol.org/">
                    <button className="btn btn-light">
                        🔗 Reclaim Protocol
                    </button>
                </a>
            </div>
        </header>

        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">

                <!-- Credentials of NS.ID -->
                <div className="flex flex-col text-center w-full mb-12">
                    <h3 className="text-2xl font-medium title-font mb-4 text-gray-900">
                        Your Psuedonymous Profile is ready!
                    </h3>
                </div>

                <!-- Proof data -->
                <div className="flex flex-col text-center w-full mb-12">
                    <div className="flex justify-center">
                        <button onclick="copyToClipboard('${url}')"
                            className="btn btn-primary inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                            Copy Profile link
                        </button>
                    </div>

                </div>
            </div>
        </section>
    </div>

    <!-- Add Bootstrap JS and Popper.js (required for Bootstrap) -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        function copyToClipboard(link) {
            // Create a temporary input element
            const tempInput = document.createElement('input');

            // Set the input's value to the link you want to copy
            tempInput.value = link;

            // Append the input element to the document
            document.body.appendChild(tempInput);

            // Select the input's text
            tempInput.select();

            // Copy the selected text to the clipboard
            document.execCommand('copy');

            // Remove the temporary input element
            document.body.removeChild(tempInput);

            // Optionally, you can provide some user feedback
            alert('Link copied to clipboard: ' + link);
        }
    </script>

    <!-- JavaScript function to toggle card collapse -->
    <script>
        function toggleCollapse(index) {
            const card = document.querySelectorAll('.card')[index];
            card.querySelector('.collapse').classNameList.toggle('show');
        }
    </script>

</html>
    `
    res.status(201).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <script>
    window.location.href = '${url}';
    </script>
    </head>
    <body>
    <h1>Redirecting...</h1>
    <p>The location.href method redirects the user to a new webpage: '${url}'</p>

    </body>
    </html>
    `);
  } catch (err) {
    console.log(err);
  }
});

//get all memers
router.get('/all-members', async (req, res) => {
  try {
    // Use the MongoDB find method to find all documents with 'proofs' key
    const membersWithProofs = await ProofDao.find({ 'data.proofs': { $exists: true } });

    res.status(200).json(membersWithProofs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Polling API to check if the member has been verified or not

router.get("/fetch-check/:checkId", async (req, res) => {
  const check = await Check.findOne({ checkId: req.params.checkId });

  if (!check)
    return res.status(401).json({ message: "Invalid URL, please check." });
  res.status(200).json({
    data: check.data,
  });
});

export default router