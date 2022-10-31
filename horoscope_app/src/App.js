import { useEffect, useState } from "react";
// import { Contract, providers } from "ethers";
import './App.css';
import MetamaskLogo from './MetamaskLogo';
import { createContext } from 'react';
import ReactSwitch from 'react-switch';
import { Contract, providers } from "ethers";
import  NFT  from  "./abi/horoscopeNFT.json";

const  NFT_CONTRACT_ADDRESS = "0xCcd36773059745823189BB7FEb6da211542B01c2";
export const ThemeContext = createContext(null)

function App() {
  
  const[theme, setTheme] = useState('dark')
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  // State for keeping track of current connected account
  const [account, setAccount] = useState(null);
  const [date, setDate] = useState("1970-01-01");
  // state for zodiacSign derived from date.
  const [zodiacSign, setZodiacSign] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  // state for whether app is minting or not.
  const [isMinting, setIsMinting] = useState(false);
  
 
    useEffect(() => {
        calculateZodiacSign(date);
    }, [date]);

  useEffect(() => {
    if(window.ethereum){
      setIsWalletInstalled(true);
    }
  }, []);


  useEffect(() => {
    function initNFTContract() {
        const provider = new providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer));
    }
    initNFTContract();
}, [account]);
 
async function mintNFT() {
    setIsMinting(true);
    try {
        await NFTContract.mintNFT(account, zodiacSign);
    } catch (e) {
    } finally {
        setIsMinting(false);
    }
}


  const toggleTheme = () =>{
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'))
  }
  async function connectWallet() {
    window.ethereum.request({
      method: "eth_requestAccounts",
    }).then((accounts) => {setAccount(accounts[0]);})
    .catch((error) => {
      alert("Something went wrong!!!")
    });
    };

    function handleDateInput({ target }) {
      setDate(target.value);
  }
   
  function calculateZodiacSign(date) {
      let dateObject = new Date(date);
      let day = dateObject.getDate();
      let month = dateObject.getMonth();
      if (month == 0) {
          if (day >= 20) {
              setZodiacSign("Aquarius");
          } else {
              setZodiacSign("Capricorn");
          }
      } else if (month == 1) {
          if (day >= 19) {
              setZodiacSign("Pisces");
          } else {
              setZodiacSign("Aquarius");
          }
      } else if (month == 2) {
          if (day >= 21) {
              setZodiacSign("Aries");
          } else {
              setZodiacSign("Pisces");
          }
      } else if (month == 3) {
          if (day >= 20) {
              setZodiacSign("Taurus");
          } else {
              setZodiacSign("Aries");
          }
      } else if (month == 4) {
          if (day >= 21) {
              setZodiacSign("Gemini");
          } else {
              setZodiacSign("Taurus");
          }
      } else if (month == 5) {
          if (day >= 21) {
              setZodiacSign("Cancer");
          } else {
              setZodiacSign("Gemini");
          }
      } else if (month == 6) {
          if (day >= 23) {
              setZodiacSign("Leo");
          } else {
              setZodiacSign("Cancer");
          }
      } else if (month == 7) {
          if (day >= 23) {
              setZodiacSign("Virgo");
          } else {
              setZodiacSign("Leo");
          }
      } else if (month == 8) {
          if (day >= 23) {
              setZodiacSign("Libra");
          } else {
              setZodiacSign("Virgo");
          }
      } else if (month == 9) {
          if (day >= 23) {
              setZodiacSign("Scorpio");
          } else {
              setZodiacSign("Libra");
          }
      } else if (month == 10) {
          if (day >= 22) {
              setZodiacSign("Sagittarius");
          } else {
              setZodiacSign("Scorpio");
          }
      } else if (month == 11) {
          if (day >= 22) {
              setZodiacSign("Capricorn");
          } else {
              setZodiacSign("Sagittarius");
          }
      }
  }

  if (account === null) {
    return (
      <ThemeContext.Provider value={{theme, toggleTheme}}>
          <div className="App" id={theme} >
          <div class='wrapper'>
            <div class='content'>
                  <div >
                    <b>
                      <p class='thicker'>LOGIN </p>
                      <p class='thicker'>TO METAMASK</p>
                    </b>
                  </div>
                  <div class='centredSVG'><><MetamaskLogo/></></div>
                  <div>
                  { 
                      isWalletInstalled ? (
                          <button class="button-87 centred" role='button' onClick={connectWallet}>Connect Wallet</button>
                      ) : (
                          <p>Install Metamask wallet</p>
                      )
                  }
                  </div>
                  <div >
                    <ReactSwitch 
                      onChange={toggleTheme} 
                      checked={theme === 'dark'}
                      onColor="#0000"
                      offColor="#f6851b"
                      />
                  </div>
          </div>
            </div>
          </div>

          </ThemeContext.Provider>
    );
}


    return (

      // I want to add a smooth transition here 
      //Foxhead transition 
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className="App" id={theme}> 

        <div class='wrapper'>
          <div class='content'>
          <h1 class="thicker"> Horoscope NFT mint</h1>
          <b><p class="thicker">Connected as: </p></b>    
          <p class="thicker" style={{color:"##46c93dde"}}>{account}</p>    
                  {/*  */}
        <input onChange={handleDateInput} value={date} type="date" id="dob"/>
   <br />
   <br />
     {zodiacSign ? (
     <svg
       xmlns="http://www.w3.org/2000/svg"
       preserveAspectRatio="xMinYMin meet"
       viewBox="0 0 300 300"
       width="400px"
       height="400px"
     >
       <style>{`.base { fill: white; font-family: serif; font-size: 24px;`}</style>
       <rect width="100%" height="100%" fill="black" />
       <text
         x="50%"
         y="50%"
         class="base"
         dominant-baseline="middle"
         text-anchor="middle"
       >
         {zodiacSign}
       </text>
     </svg>
   ) : null}
 
       <br/>
       <br/>
       <button class="button-87 centred" role='button' isLoading={isMinting} onClick={mintNFT}>Mint</button>
        {/*  */}

            <div class="centred">
            <ReactSwitch 
                      onChange={toggleTheme} 
                      checked={theme === 'dark'}
                      onColor="#0000"
                      offColor="#f6851b"
                      />
            </div>
          </div>
        </div>


        </div>

      </ThemeContext.Provider>
    );
}

export default App;
