import { useState } from 'react'
import { ethers } from 'ethers'

function App() {
    const [data, setData] = useState({
      account: '',
      balance: null
    })

  function getBalance(address){
    window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, "latest"]
    })
    .then(balance=>{
      setData(prevData=>{
        return {
          ...prevData,
          balance: ethers.formatEther(balance)
        }
      })
    })
  }

  function changeAccount(account){
    setData(prevData=>{
      return {
        ...prevData,
        account: account
      }
    })

    getBalance(account)
  }

  function connectWallet(){
    if(window.ethereum){
      window.ethereum.request({ method: 'eth_requestAccounts'})
      .then((res)=>changeAccount(res[0]))
    
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
