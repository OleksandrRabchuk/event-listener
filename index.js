const ethers = require('ethers')
const contractAbi = require("./abi.json");

module.exports.run = async () => {
    const rinkebyAlchemyProvider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/iRkguVLmnNufz3fZbDThtEgK-lcxI5uF')
    const contract = new ethers.Contract('0xE1A97980e5691AE8Dc99B458e0Dd705e50E85EE5', contractAbi, rinkebyAlchemyProvider)
    contract.on('Transfer', async (from, to, token) => {
        const tokenUri = await contract.tokenURI(ethers.BigNumber.from(token).toNumber())
        await fetch(`https://u6i3kt6ir7.execute-api.eu-west-3.amazonaws.com/dev/handleTransferEvent`, {
            method: "POST",
            "Content-Type":"application/json",
            "body": JSON.stringify({
                from,
                to,
                tokenId: ethers.BigNumber.from(token).toNumber(),
                tokenUri,
            })
        })
    })
}