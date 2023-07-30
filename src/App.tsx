import { useState } from 'react'
import { ethers } from 'ethers'

function App() {
    const [data, setData] = useState<{account: string, balance: string}>({
      account: '',
      balance: ''
    })

  console.log(data)

  function getBalance(address: string){
    window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, "latest"]
    })
    .then((balance: string)=>{
      console.log(balance)
      setData((prevData)=>{
        return {
          ...prevData,
          balance: ethers.formatEther(balance)
        }
      })
    })
  }

  window.ethereum.on('accountsChanged', changeAccount)

  function changeAccount(accounts: string[]){
    if (accounts.length > 0) {
      const address = accounts[0]; // Use the first address from the array

      setData((prevData) => ({
        ...prevData,
        account: address,
        balance: '',
      }));
  
      getBalance(address);
    }
  }

  function connectWallet(){
    if(window.ethereum){
      window.ethereum.request({ method: 'eth_requestAccounts'})
      .then((res: string[])=>{
        console.log(res)
        changeAccount(res)
      })
    }  else {
      alert("install metamask extension!!");
    }
  }


  return (
    <div className='App'>
      <p><strong>ADDRESS: </strong>{data.account}</p>
      <p><strong>BALANCE: </strong>{data.balance}</p>
      <button onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  )
}

export default App
