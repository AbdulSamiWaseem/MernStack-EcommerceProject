import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: start;
  margin-left: 25px;
  display:flex;
  flex-direction:column;
  z-index:1;
  padding: 5px;
  background-color:white;
  width:100%;
`;

const Input = styled.input`
  border: none;
  outline:none;
  width:100%;

  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 16px;
  font-weight:600;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const SearchHistory = styled.ul`
  list-style: none;
  padding: 10px;
  width:90%;
`;
const SearchList = styled.li`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:5px;
  &:hover {
    background-color: #f0f0f0; 
    cursor: pointer;           
  }
`;

const DATA = [
  {
    id: 1,
    name: 'abc'
  }, {
    id: 2,
    name: 'fwrui'
  }, {
    id: 3,
    name: 'vwrg'
  }, {
    id: 4,
    name: 'gfuwrk'
  }, {
    id: 5,
    name: 'fgrig'
  }, {
    id: 6,
    name: 'ucdhfabc'
  }, {
    id: 7,
    name: 'uefhwe'
  }, {
    id: 8,
    name: 'ffk'
  }, {
    id: 9,
    name: 'uifh'
  }, {
    id: 10,
    name: 'gbfvbc'
  }, {
    id: 11,
    name: 'abrfkc'
  }, {
    id: 12,
    name: 'eopdbf'
  }
]

const Navbar = () => {
  const products = useSelector(state => state.cart.products)
  const [active, setActive] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const quantity = products.length;
  const handleActive = () => {
    // console.log('active')
    setActive(true)
  }
  const handleBlur = () => {
    setActive(false)
    // console.log("blurrr");
  }
  const handleSuggestionClick = () => {

  }


  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    const filteredSuggestions = DATA.filter(item =>
      item.name.includes(e.target.value)
    );
    setSuggestions(filteredSuggestions);
  }

  const removeHistory = (id) => {
    const index = DATA.findIndex(item => item.id == id)
    DATA.splice(index, 1);
    // console.log("suggestions", suggestions)
    // console.log('data', DATA)
    // console.log("suggestions", suggestions)

  }
  useEffect(() => {
    const filteredSuggestions = DATA.filter(item =>
      item.name.includes(searchTerm)
    );
    setSuggestions(filteredSuggestions);
    console.log('hello')
  }, DATA)

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language> */}

          <SearchContainer onFocus={handleActive} onBlur={handleBlur}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "5px 2px" }}>
              <Input placeholder="Search" onChange={handleChange} />
              <Search style={{ color: "gray", fontSize: 16,paddingRight:"5px" }} />
            </div>
            {(active && suggestions.length > 0)
              ? <SearchHistory className="suggestions">
                {suggestions.map((suggestion) => (
                  <SearchList key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.name)}>
                    {suggestion.name}
                    {/* <RxCross2 onClick={() => removeHistory(suggestion.id)} /> */}
                  </SearchList>
                ))}
              </SearchHistory>
              : active
                ? <SearchHistory style={{ color: "gray" }}>No item Found</SearchHistory>
                : null
            }
          </SearchContainer>

        </Left>
        <Center>
          <Logo>DILKASH.</Logo>
        </Center>
        <Right>
          <Link to="/register">
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem>SIGN IN</MenuItem>
          </Link>

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
