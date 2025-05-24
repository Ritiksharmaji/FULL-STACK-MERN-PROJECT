import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ritik from '../../img/ritik.jpg';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive }) {
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    const handleMenuItemClick = (id) => {
        setActive(id);
        setIsMobileOpen(false);
    };

    return (
        <>
        <navbar>
            <MobileToggle onClick={toggleMobileMenu}>
                <img src={ritik} alt="Toggle Menu" />
            </MobileToggle>
            
           {isMobileOpen && <CloseButton onClick={() => setIsMobileOpen(false)}>×</CloseButton>}

            <SidebarContainer isMobileOpen={isMobileOpen}>
                <Sidebar>
                    <UserContainer>
                        <img src={ritik} alt="User" />
                        <div className="text">
                            <h2>Ritik Sharma</h2>
                            <p>Your Money</p>
                        </div>
                    </UserContainer>

                    <MenuItems>
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.id}
                                onClick={() => handleMenuItemClick(item.id)}
                                active={active === item.id}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </MenuItem>
                        ))}
                    </MenuItems>

                    <BottomNav>
                        <MenuItem onClick={handleLogout}>
                            {signout}
                            <span>Sign Out</span>
                        </MenuItem>
                    </BottomNav>
                </Sidebar>
            </SidebarContainer>
            </navbar>
        </>
    );
}


const SidebarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    transition: transform 0.3s ease-in-out;

    @media (max-width: 768px) {
        width: 436px;
        transform: ${({ isMobileOpen }) =>
            isMobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
    }
`;

const Sidebar = styled.nav`
    padding: 2rem 1.5rem;
    width: 100%;
    height: 100%;
    background: rgba(252, 246, 249, 0.95);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 0 32px 32px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    @media (max-width: 768px) {
        border-radius: 0;
        width: 100%; // use full container width (436px set in SidebarContainer)
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    display: ${({ isMobileOpen }) => (isMobileOpen ? 'block' : 'none')};

    @media (min-width: 769px) {
        display: none;
    }
`;

const UserContainer = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        background: #fcf6f9;
        border: 2px solid #FFFFFF;
        padding: .2rem;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
        color: rgba(34, 34, 96, 1);
        margin: 0;
        font-size: 1.5rem;
    }

    p {
        color: rgba(34, 34, 96, .6);
        margin: 0.25rem 0 0;
    }
`;

const MenuItems = styled.ul`
    flex: 1;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const MenuItem = styled.li`
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    margin: .6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all .4s ease-in-out;
    color: ${({ active }) => active ? 'rgba(34, 34, 96, 1)' : 'rgba(34, 34, 96, .6)'};
    padding-left: 1rem;
    position: relative;

    i {
        color: ${({ active }) => active ? 'rgba(34, 34, 96, 1)' : 'rgba(34, 34, 96, 0.6)'};
        font-size: 1.4rem;
        transition: all .4s ease-in-out;
    }

    &:hover {
        color: rgba(34, 34, 96, 1);
        
        i {
            color: rgba(34, 34, 96, 1);
        }
    }

    ${({ active }) => active && `
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    `}
`;

const BottomNav = styled.div`
    padding: 1rem 0 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
const CloseButton = styled.div`
    align-self: flex-end;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    color: rgba(34, 34, 96, 0.8);

    @media (min-width: 769px) {
        display: none;
    }
`;

const MobileToggle = styled.div`
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 997;
    display: none;
    cursor: pointer;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        display: block;
    }
`;

// export default Navigation;


// const NavStyled = styled.nav`
//     padding: 2rem 1.5rem;
//     width: 374px;
//     height: 100%;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     gap: 2rem;

//     .user-con {
//         height: 100px;
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         img {
//             width: 80px;
//             height: 80px;
//             border-radius: 50%;
//             object-fit: cover;
//             background: #fcf6f9;
//             border: 2px solid #FFFFFF;
//             padding: .2rem;
//             box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
//         }
//         h2 {
//             color: rgba(34, 34, 96, 1);
//         }
//         p {
//             color: rgba(34, 34, 96, .6);
//         }
//     }

//     .menu-items {
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         li {
//             display: grid;
//             grid-template-columns: 40px auto;
//             align-items: center;
//             margin: .6rem 0;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all .4s ease-in-out;
//             color: rgba(34, 34, 96, .6);
//             padding-left: 1rem;
//             position: relative;
//             i {
//                 color: rgba(34, 34, 96, 0.6);
//                 font-size: 1.4rem;
//                 transition: all .4s ease-in-out;
//             }
//         }
//     }

//     .active {
//         color: rgba(34, 34, 96, 1) !important;
//         i {
//             color: rgba(34, 34, 96, 1) !important;
//         }
//         &::before {
//             content: "";
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 4px;
//             height: 100%;
//             background: #222260;
//             border-radius: 0 10px 10px 0;
//         }
//     }

//     .bottom-nav {
//         li {
//             cursor: pointer;
//             font-weight: bold;
//             color: red;
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             transition: all 0.3s ease-in-out;
//             &:hover {
//                 color: darkred;
//             }
//         }
//     }
// `;



export default Navigation;
