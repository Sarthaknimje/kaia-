async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    console.log("Ethereum-compatible wallet detected!");
  } else {
    alert("No Ethereum-compatible wallet found. Please install a wallet like Kaia Wallet to use this app.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Connected account:", accounts[0]);
    switchToKairosTestnet();
    updateWalletButton(accounts[0]);
  } catch (error) {
    console.error("User rejected the connection request:", error);
  }
}

async function switchToKairosTestnet() {
  const kairosTestnet = {
    chainId: "0x3E9", // 1001 in hexadecimal
    chainName: "Kairos Testnet",
    rpcUrls: ["https://public-en-kairos.node.kaia.io"], // RPC URL for Kairos Testnet
    nativeCurrency: {
      name: "KAIA",
      symbol: "KAIA", // Symbol for the native currency
      decimals: 18,
    },
    blockExplorerUrls: ["https://kairos.kaiascan.io"], // Block explorer URL for Kairos Testnet
  };

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [kairosTestnet],
    });
    console.log("Switched to Kairos Testnet");
  } catch (error) {
    console.error("Failed to switch to Kairos Testnet:", error);
  }
}

function updateWalletButton(account) {
  const walletButton = document.getElementById("walletButton");
  if (account) {
    walletButton.innerHTML = `${account}`;
  } else {
    walletButton.innerHTML = `<img src="assets/gui/achives.png" alt=""> connect wallet`;
  }
}

async function initialize() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        updateWalletButton(accounts[0]);
      } else {
        updateWalletButton(null);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }
}

// Call initialize function on page load
window.addEventListener("load", initialize);
