async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    alert("MetaMask is not installed. Please install it to use this app.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Connected account:", accounts[0]);
    switchToCrossFiNetwork();
    updateWalletButton(accounts[0]);
  } catch (error) {
    console.error("User rejected the request.");
  }
}

async function switchToCrossFiNetwork() {
  const ancient8Testnet = {
    chainId: "0x1AD1BA8", // Chain ID for CrossFi Testnet (decimal 4157 converted to hex)
    chainName: "Ancient8 Testnet",
    rpcUrls: ["https://rpcv2-testnet.ancient8.gg/"], // Public RPC URL for CrossFi Testnet
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://scanv2-testnet.ancient8.gg/"],
  };

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [ancient8Testnet],
    });
    console.log("Switched to CrossFi Testnet");
  } catch (error) {
    console.error("Failed to switch to CrossFi Testnet:", error);
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
