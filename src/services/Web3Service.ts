import Web3 from "web3";
import ABI from "./ABI.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const CONTRACT_ADDRESS = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";

export async function login() {
  if (!window.ethereum) {
    throw new Error("No MetaMask found");
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();

  if (!accounts?.length) {
    throw new Error("No waller found");
  }

  localStorage.setItem("wallet", accounts[0]);

  return accounts[0];
}

export async function getCurrentVoting() {
  const wallet = localStorage.getItem("wallet");

  if (!wallet) throw new Error("Unauthorized");

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
    from: wallet,
  });

  return contract.methods.getCurrentVoting().call();
}
