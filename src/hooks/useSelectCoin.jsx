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
  const [ state, setState ] = useState({});

  // event
  const handleChange = (e) => {
    const filterValue = options.find(item => item.Id == e.target.value);
    setState(filterValue);
  }

  const SelectCoin = () => (
    <>
      <CustomLabel>{ label }</CustomLabel>
      <CustomSelect
        value={state.Id}
        onChange={ handleChange }
      >
        <option value="0">Select</option>
        {
          options.map( option => (
            <option
              key={option.Id}
              value={option.Id}
            >
              {option.Name}
            </option>
          )) 
        }
      </CustomSelect>
    </>
  )

  // return value selected
  return [ state, SelectCoin ];
}


export default useSelectCoin;