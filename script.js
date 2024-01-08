// Define the Ethereum smart contract address for the MoodContract
const MoodContractAddress = "0x21127f7a4c0A6dC97215C4e52F90Fec883aC59D5";

// Define the ABI (Application Binary Interface) for the MoodContract, specifying its functions and their details
const MoodContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Initialize variables to store the instance of the MoodContract and the Ethereum account signer
let MoodContract = undefined;
let signer = undefined;

// Create a Web3Provider using the Ethereum provider from the browser, specifying a custom network name "sepolia"
const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

// Request Ethereum accounts from the user
provider.send("eth_requestAccounts", []).then(() => {
    // Retrieve the list of Ethereum accounts after successful account request
    provider.listAccounts().then((accounts) => {
        // Get the signer object for the first Ethereum account
        signer = provider.getSigner(accounts[0]);

        // Instantiate the MoodContract with the contract address, ABI, and signer
        MoodContract = new ethers.Contract(
            MoodContractAddress,
            MoodContractABI,
            signer
        );
    });
});

// Asynchronous function to fetch and display the current mood
async function getMood() {
    // Call the getMood function from the MoodContract
    const mood = await MoodContract.getMood();

    // Display the fetched mood on the webpage
    document.getElementById("showMood").innerText = `Your Mood: ${mood}`;

    // Log the mood to the console for debugging or further analysis
    console.log(mood);
}

// Asynchronous function to set a new mood
async function setMood() {
    // Get the mood value from the input field on the webpage
    const mood = document.getElementById("mood").value;

    // Call the setMood function of the MoodContract to update the stored mood value
    await MoodContract.setMood(mood);
}
