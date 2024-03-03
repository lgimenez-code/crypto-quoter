import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useSelectCoin from '../hooks/useSelectCoin';
import listCoins from '../data/listCoins.js';
import Error from './Error.jsx';


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


const Form = ({setCoins}) => {
  const [ listCrypto, setCrypto ] = useState([]);
  const [ error, setError ] = useState(false);

  const [ coinSelected, SelectCoin ] = useSelectCoin('Select your Coin', listCoins);
  const [ cryptoSelected, SelectCrypto ] = useSelectCoin('Select your Cryptocurrency', listCrypto);

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
      setCrypto(arrayCryptos);
    }

    getCrypto();
  }, []);

  // event button
  const handleSubmit = e => {
    e.preventDefault();

    // validate selected values in the combos
    if ([coinSelected, cryptoSelected].includes('')) {
      setError(true);
      return false;
    }

    setError(false);
    setCoins({
      coinSelected,
      cryptoSelected
    });
  }


  return (
    <>
    { error && <Error>Todos los campos son obligatorios</Error> }
      <form
        onSubmit={handleSubmit}
      >
        <SelectCoin/>
        <SelectCrypto/>
        <InputSubmit type="submit" value="Cotizar"/>
      </form>
    </>
  )
}

export default Form