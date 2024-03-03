import { React, useState } from 'react';
import styled from '@emotion/styled';


const CustomLabel = styled.label`
  color: #FFF;
  display: block;
  font-family: 'Lato', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`;

const CustomSelect = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;

`; 

// custom Hooks
const useSelectCoin = (label, options) => {

  const [ state, setState ] = useState('');
  console.log(options);

  const SelectCoin = () => (
    <>
      <CustomLabel>{ label }</CustomLabel>
      <CustomSelect
        value={state}
        onChange={ e => setState(e.target.value) }
      >
        <option value="">Select</option>
        {
          options.lenght > 0 ? options.map( option => (
            <option
              key={option.Id}
              value={option.Id}
            >
              {option.Name}
            </option>
          )) : null
        }
      </CustomSelect>
    </>
  )

  // return value selected
  return [ state, SelectCoin ];
}


export default useSelectCoin;