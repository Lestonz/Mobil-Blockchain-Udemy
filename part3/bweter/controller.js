import Web3 from "web3";
import React from "react";
import { TICKET_SMART_CONTRACT_ADDRESS, BWEET_SMART_CONTRACT_ADDRESS, YOUR_PROVIDER_LINK_SEPOLIA } from "./config";

import BweetContract from './artifacts/contracts/BweetContract.sol/BweetContract.json'
import BweterTicket from './artifacts/contracts/BweterTicket.sol/BweterTicket.json'


export const web3ContractProvider = React.useMemo(
    () => new Web3(new Web3.providers.HttpProvider(YOUR_PROVIDER_LINK_SEPOLIA)),[]
)

export const myBweetContract = new web3ContractProvider.eth.Contract(BweetContract.abi, BWEET_SMART_CONTRACT_ADDRESS )
export const myBweterTicket = new web3ContractProvider.eth.Contract(BweterTicket.abi, TICKET_SMART_CONTRACT_ADDRESS )