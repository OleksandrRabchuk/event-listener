const ethers = require('ethers')
const contractAbi = require("./abi.json");
const fetch = require('node-fetch');

(async () => {
    const provider = new ethers.providers.AlchemyProvider('homestead', 'xPXwiz9sef2wP9VAprruRIqP-o9n0W3s')
    const contract = new ethers.Contract('0x9F83b08D90eeDa539f7E2797fEd3f6996917BbA8', contractAbi, provider)
    contract.on('Transfer', async (from, to, token) => {
        const tokenUri = await contract.tokenURI(ethers.BigNumber.from(token).toNumber())
        await fetch(`https://8cyq9zjqx7.execute-api.us-east-2.amazonaws.com/handleTransferEvent`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                from,
                to,
                tokenId: ethers.BigNumber.from(token).toNumber(),
                tokenUri,
            })
        })
    })

})()