import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useSelectCoin from '../hooks/useSelectCoin';
import listCoins from '../data/listCoins.js';


const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 10px;
  margin-top: 20px;
  transition: background-color .3s ease;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`;


const Form = () => {
  const [ listCrypto, setCrypto ] = useState([]);

  const [ coin, SelectCoin ] = useSelectCoin('Select your Coin', listCoins);
  const [ crypto, SelectCrypto ] = useSelectCoin('Select your Cryptocurrency', listCrypto);

  useEffect(() => {
    const getCrypto = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD'
      const response = await fetch(url);
      const result = await response.json();

      const arrayCryptos = result.Data.map(crypto => {
        const object = {
          Id: crypto.CoinInfo.Id,
          Name: crypto.CoinInfo.FullName,
          Code: crypto.CoinInfo.Name,
        };

        return object;
      });

      // set list with data
      console.log(listCrypto);
      setCrypto(arrayCryptos);
    }

    getCrypto();
  }, []);

  // event button
  const handleSubmit = e => {
    e.preventDefault();

    if ([coin, crypto].includes('')) {
      console.log('ERROR');

      return false;
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <SelectCoin/>
      <SelectCrypto/>
      <InputSubmit type="submit" value="Cotizar"/>
    </form>
  )
}

export default Form