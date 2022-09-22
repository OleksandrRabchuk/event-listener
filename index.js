const ethers = require('ethers')
const contractAbi = require("./abi.json");
const fetch = require('node-fetch');

(async () => {
    const provider = new ethers.providers.AlchemyProvider('goerli', 'Exs46ULpQ51iFcHpidgBjDuT2B40jDXc')
    const contract = new ethers.Contract('0xad464BCBdF3C9d835364be22B45A696B2440c7c0', contractAbi, provider)
    console.log('Server running');
    contract.on('Transfer', async (from, to, token) => {
        console.log((from, to, token))
        const tokenUri = await contract.tokenURI(ethers.BigNumber.from(token).toNumber())
        const res = await fetch(`https://czzeocbspa.execute-api.eu-west-3.amazonaws.com/handleTransferEvent`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                from,
                to,
                tokenId: ethers.BigNumber.from(token).toNumber(),
                tokenUri,
            })
        })
        console.log(res)
    })

})()