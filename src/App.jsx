import { useState, useEffect } from 'react'
import styled from "@emotion/styled";
import ImgCrypto from './img/img-crypto.png';
import Form from './components/Form';
import Results from './components/Results';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: 'Lto', sans-serif;
  color: #FFF;
  text-align: center;
  font-wight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [ coins, setCoins ] = useState({});
  const [ results, setResults ] = useState({})

  useEffect(() => {
    if (Object.keys(coins).length > 0) {

      const quoteCrypto = async () => {
        const { coinSelected, cryptoSelected } = coins;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected.Code}&tsyms=${coinSelected.Id}`;
        const response = await fetch(url);
        const results = await response.json();

        setResults(results.DISPLAY[cryptoSelected.Code][coinSelected.Id]);
      }

      quoteCrypto();
    }

  }, [coins]);

  return (
    <Container>
      <Image src={ImgCrypto} alt="Image Crypto"/>
      <div>
        <Heading>Quote cryptocurrencies instantly</Heading>
        <Form
          setCoins={setCoins}
        />
        { results.PRICE && <Results result={results}/> }
      </div>
    </Container>
  )
}

export default App;
