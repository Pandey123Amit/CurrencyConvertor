import { useEffect, useState } from 'react'
import React from 'react'


export function useCurrencyInfo(currency) {

    const [data, setData] = useState({})

    const callApi = () => {
        fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => {
                setData(() => res[currency]);
            })
    }
    useEffect(() => {
        callApi();
    }, [currency])

    return data
}