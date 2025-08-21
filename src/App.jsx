import { useState } from 'react'
import './App.css'
import viteLogo from './assets/vite.svg'   // ✅ correct import
import InputBox from './components/InputBox'
import { useCurrencyInfo } from './hooks/useCurrency'

function App() {
  const BackgroundImage =
    "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertAmount, setconvertAmount] = useState(0)

  const currencyRate = useCurrencyInfo(from)
  const currencyOption = Object.keys(currencyRate)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setconvertAmount(amount)
    setAmount(convertAmount)
  }

  const convert = () => {
    setconvertAmount(amount * currencyRate[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${BackgroundImage}')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          {/* ✅ Show vite.svg logo */}
          <div className="flex justify-center mb-4">
            <img src={viteLogo} alt="Vite Logo" className="w-16 h-16" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOption={currencyOption}
                onCurrencyChanges={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertAmount}
                currencyOption={currencyOption}
                onCurrencyChanges={(currency) => setTo(currency)}
                selectCurrency={to}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
