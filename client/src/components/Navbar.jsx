import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import apiRequest from "../api/index";
import { useNavigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';
import { logout } from '../redux/userRedux'
import { IoMenu } from "react-icons/io5";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

let controller;

const Container = styled.div`
  height: 72px;
  ${mobile({ height: "62px" })}
`;

const Wrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  height:42px;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:flex-start;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  flex-direction:column;
  z-index:2;
  padding: 5px;
  background-color:white;
  width:100%;
  position:absolute;
  top:0px;
  ${mobile({ display: "none" })}

`;
const MobileSearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  flex-direction:column;
  z-index:2;
  padding: 5px;
  background-color:white;
  width:100%;
  position:absolute;
  top:0px;
  left:0px


`;

const Input = styled.input`
  border: none;
  outline:none;
  width:100%;
  height:42px
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ textAlign: "start" })}

`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding:0 15px;
`;
const SliderWrapper = styled.div`
display:flex;
  ${mobile({ display: "none" })}
`;


const NavItems = styled.div`
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
const SidebarLink = styled.div`
margin-left:10px;
font-size:24px;
margin-top:5px;
display:none;
${mobile({ display: "block" })}
`;


const Navbar = () => {
  const User = useSelector((state) => state.user.currentUser);
  const Navigate = useNavigate();
  const products = useSelector(state => state.cart.products)
  const [active, setActive] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loader, setLoader] = useState(false)
  const searchRef = useRef()
  const quantity = products.length;

  const handleSuggestionClick = (id) => {
    Navigate(`/product/${id}`)
  }

  const handleChange = async (e) => {
    // const filteredSuggestions = DATA.filter(item =>
    //   item.name.toLowerCase().includes(e.target.value.toLowerCase())
    // );
    setSearchTerm(e.target.value)
    if (!e.target.value) {
      setSuggestions([])
      return
    }
    setActive(true)
    controller && controller.abort()
    controller = new AbortController();
    setLoader(true);
    const res = await apiRequest("GET", `products/search-by-title/${e.target.value}`, undefined, undefined, controller.signal, false)
    if (res?.status == 200)
      setSuggestions(res.data);
    setLoader(false)

  }

  // const removeHistory = (id) => {
  //   const index = DATA.findIndex(item => item.id == id)
  //   DATA.splice(index, 1);
  //   // console.log("suggestions", suggestions)
  //   // console.log('data', DATA)
  //   // console.log("suggestions", suggestions)

  // }

  const handleClickOutside = (event) => {
    // console.log('searchRef.current', searchRef.current)
    // console.log('event.target', event.target)
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const dispatch = useDispatch();
  const [sider, setSider] = useState(false);

  return (
    <div style={{position:"relative"}}>
    <Container>
      <Wrapper>
        <Left>
          <SidebarLink>
            <IoMenu onClick={() => {
            if (sider)
              setSider(false)
            else
              setSider(true)

          }} />
          </SidebarLink>
          <SearchContainer ref={searchRef}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "5px 2px" }}>
              <Input placeholder="Search" onChange={handleChange} onFocus={() => { setActive(true) }} />
              {loader
                ? <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="gray"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{ paddingRight: "10px" }}
                  wrapperClass=""

                />
                : <Search style={{ color: "gray", fontSize: 20, paddingRight: "5px" }} />
              }


            </div>
            {(searchTerm && active) &&
              <>
                {
                  suggestions.length > 0
                    ? <SearchHistory className="suggestions">
                      {suggestions.map((suggestion) => (
                        <SearchList key={suggestion._id} onClick={() => handleSuggestionClick(suggestion._id)}>
                          {suggestion.title}
                        </SearchList>
                      ))}
                    </SearchHistory>
                    : !loader
                      ? <SearchHistory style={{ color: "gray" }}>No item Found</SearchHistory>
                      : null

                }
              </>
            }
          </SearchContainer>

        </Left>
        <Center>
          <Logo>DILKASH.</Logo>
        </Center>
        <Right>
          <SliderWrapper>
            <Link to="/register">
              <NavItems>REGISTER</NavItems>
            </Link>
            {!User
              ? <Link to="/login">
                <NavItems>SIGN IN</NavItems>
              </Link>
              : <Link >
                <NavItems onClick={() => {
                  dispatch(logout())
                }}>SIGN OUT</NavItems>
              </Link>

            }
          </SliderWrapper>
          <Link to="/cart">
            <NavItems>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </NavItems>
          </Link>
        </Right>
      </Wrapper>
    </Container>
    {sider
        ? <Sidebar style={{backgroundColor:"#fafafa",zIndex:"1",position:"absolute"}}>
          <Menu>
            <MenuItem>
              <Link to="/register">
                <NavItems>REGISTER</NavItems>
              </Link>
            </MenuItem>
            <MenuItem>
              {!User
                ? <Link to="/login">
                  <NavItems>SIGN IN</NavItems>
                </Link>
                : <Link >
                  <NavItems onClick={() => {
                    dispatch(logout())
                  }}>SIGN OUT</NavItems>
                </Link>

              }
            </MenuItem>
            <MenuItem>
            <MobileSearchContainer ref={searchRef}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "5px 2px" }}>
              <Input placeholder="Search" onChange={handleChange} onFocus={() => { setActive(true) }} />
              {loader
                ? <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="gray"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{ paddingRight: "10px" }}
                  wrapperClass=""

                />
                : <Search style={{ color: "gray", fontSize: 20, paddingRight: "5px" }} />
              }


            </div>
            {(searchTerm && active) &&
              <>
                {
                  suggestions.length > 0
                    ? <SearchHistory className="suggestions">
                      {suggestions.map((suggestion) => (
                        <SearchList key={suggestion._id} onClick={() => handleSuggestionClick(suggestion._id)}>
                          {suggestion.title}
                        </SearchList>
                      ))}
                    </SearchHistory>
                    : !loader
                      ? <SearchHistory style={{ color: "gray" }}>No item Found</SearchHistory>
                      : null

                }
              </>
            }
          </MobileSearchContainer>
            </MenuItem>

          </Menu>
        </Sidebar>
        : null

      }
    </div>
  );
};

export default Navbar;
