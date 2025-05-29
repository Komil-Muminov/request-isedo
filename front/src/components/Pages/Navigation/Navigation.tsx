import React, { useState } from "react";
import log from "../../../assets/Formal/log.webp";
import { Avatar } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { queryClient } from "../../../queryClient";
import { useAuth } from "../../API/Hooks/useAuth";
import { logout } from "../../API/Logout";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import "./Navigation.css";

export const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const logoutMutate = useMutation(
    {
      mutationFn: () => logout(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
        queryClient.setQueryData(["users", "me"], null);
        navigate("/");
      },
    },
    queryClient
  );

  const handleLogout = async () => {
    await logoutMutate.mutateAsync();
  };

  // UserAvatar
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser((prevAnchorElUser) =>
      prevAnchorElUser ? null : event.currentTarget
    );
  };

  const handleToggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorElUser) {
      setAnchorElUser(null);
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // getInfo about currentUser
  const { getMe } = useAuth();

  const getUinfoQuery = useQuery(
    {
      queryKey: ["users", "me"],
      queryFn: () => getMe(),
    },
    queryClient
  );

  return (
    <>
      <section className="sections navigation__section">
        <div className="container">
          <div className="navigation__content">
            {/* <nav className="nav_info"> */}
            {/* <ul className="nav_info-list"> */}
            {/* <li className="info_list-item mulish-info-list-item">
									<svg
										width="8px"
										height="8px"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											></path>
										</g>
									</svg>
									<div className="nav__fullname"></div>
								</li>
								<li className="info_list-item mulish-info-list-item">
									<svg
										width="8px"
										height="8px"
										viewBox="0 0 24 24"
										fill="currentColor"
										stroke="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g>
											<path
												d="M10.9436 1.25H13.0564C14.8942 1.24998 16.3498 1.24997 17.489 1.40314C18.6614 1.56076 19.6104 1.89288 20.3588 2.64124C21.1071 3.38961 21.4392 4.33856 21.5969 5.51098C21.75 6.65019 21.75 8.10583 21.75 9.94359V14.0564C21.75 15.8942 21.75 17.3498 21.5969 18.489C21.4392 19.6614 21.1071 20.6104 20.3588 21.3588C19.6104 22.1071 18.6614 22.4392 17.489 22.5969C16.3498 22.75 14.8942 22.75 13.0564 22.75H10.9436C9.10583 22.75 7.65019 22.75 6.51098 22.5969C5.33856 22.4392 4.38961 22.1071 3.64124 21.3588C2.89288 20.6104 2.56076 19.6614 2.40314 18.489C2.24997 17.3498 2.24998 15.8942 2.25 14.0564V9.94358C2.24998 8.10582 2.24997 6.65019 2.40314 5.51098C2.56076 4.33856 2.89288 3.38961 3.64124 2.64124C4.38961 1.89288 5.33856 1.56076 6.51098 1.40314C7.65019 1.24997 9.10582 1.24998 10.9436 1.25ZM6.71085 2.88976C5.70476 3.02502 5.12511 3.27869 4.7019 3.7019C4.27869 4.12511 4.02502 4.70476 3.88976 5.71085C3.75159 6.73851 3.75 8.09318 3.75 10V14C3.75 15.9068 3.75159 17.2615 3.88976 18.2892C4.02502 19.2952 4.27869 19.8749 4.7019 20.2981C5.12511 20.7213 5.70476 20.975 6.71085 21.1102C7.73851 21.2484 9.09318 21.25 11 21.25H13C14.9068 21.25 16.2615 21.2484 17.2892 21.1102C18.2952 20.975 18.8749 20.7213 19.2981 20.2981C19.7213 19.8749 19.975 19.2952 20.1102 18.2892C20.2484 17.2615 20.25 15.9068 20.25 14V10C20.25 8.09318 20.2484 6.73851 20.1102 5.71085C19.975 4.70476 19.7213 4.12511 19.2981 3.7019C18.8749 3.27869 18.2952 3.02502 17.2892 2.88976C16.2615 2.75159 14.9068 2.75 13 2.75H11C9.09318 2.75 7.73851 2.75159 6.71085 2.88976ZM7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM7.25 16C7.25 15.5858 7.58579 15.25 8 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H8C7.58579 16.75 7.25 16.4142 7.25 16Z"
												fill="#1C274C"
											></path>
										</g>
									</svg>{" "}
									<div className="nav__inn">
										ИНН:
										<span className=""> 123456789</span>
									</div>
								</li> */}
            {/* <li className="info_list-item mulish-info-list-item">
									<svg
										width="8px"
										height="8px"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											></path>
										</g>
									</svg>{" "}
									<div className="nav__role">
										Роль:
										<span className="">
											{getUinfoQuery.data?.role ? getUinfoQuery.data.role : ``}
										</span>
									</div>
								</li> */}

            {/* <li className="info_list-item mulish-info-list-item">
									<svg
										width="8px"
										height="8px"
										viewBox="0 0 24 24"
										fill="none"
										stroke="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g>
											<path
												d="M18 21V22C18.5523 22 19 21.5523 19 21H18ZM6 21H5C5 21.5523 5.44772 22 6 22V21ZM17.454 3.10899L17 4L17.454 3.10899ZM17.891 3.54601L17 4L17.891 3.54601ZM6.54601 3.10899L7 4L6.54601 3.10899ZM6.10899 3.54601L7 4L6.10899 3.54601ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8V6ZM10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6V8ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9V11ZM14 9C13.4477 9 13 9.44772 13 10C13 10.5523 13.4477 11 14 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14V12ZM15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12V14ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14V12ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12V14ZM14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8V6ZM15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6V8ZM7.6 4H16.4V2H7.6V4ZM17 4.6V21H19V4.6H17ZM18 20H6V22H18V20ZM7 21V4.6H5V21H7ZM16.4 4C16.6965 4 16.8588 4.00078 16.9754 4.0103C17.0803 4.01887 17.0575 4.0293 17 4L17.908 2.21799C17.6366 2.07969 17.3668 2.03562 17.1382 2.01695C16.9213 1.99922 16.6635 2 16.4 2V4ZM19 4.6C19 4.33647 19.0008 4.07869 18.9831 3.86177C18.9644 3.63318 18.9203 3.36344 18.782 3.09202L17 4C16.9707 3.94249 16.9811 3.91972 16.9897 4.02463C16.9992 4.14122 17 4.30347 17 4.6H19ZM17 4L18.782 3.09202C18.5903 2.7157 18.2843 2.40973 17.908 2.21799L17 4ZM7.6 2C7.33647 2 7.07869 1.99922 6.86177 2.01695C6.63318 2.03562 6.36344 2.07969 6.09202 2.21799L7 4C6.94249 4.0293 6.91972 4.01887 7.02463 4.0103C7.14122 4.00078 7.30347 4 7.6 4V2ZM7 4.6C7 4.30347 7.00078 4.14122 7.0103 4.02463C7.01887 3.91972 7.0293 3.94249 7 4L5.21799 3.09202C5.07969 3.36344 5.03562 3.63318 5.01695 3.86177C4.99922 4.07869 5 4.33647 5 4.6H7ZM6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202L7 4L6.09202 2.21799ZM9 8H10V6H9V8ZM9 11H10V9H9V11ZM14 11H15V9H14V11ZM14 14H15V12H14V14ZM9 14H10V12H9V14ZM14 8H15V6H14V8ZM13 18V21H15V18H13ZM11 21V18H9V21H11ZM12 17C12.5523 17 13 17.4477 13 18H15C15 16.3431 13.6569 15 12 15V17ZM12 15C10.3431 15 9 16.3431 9 18H11C11 17.4477 11.4477 17 12 17V15Z"
												fill="#35B6EE"
											></path>
										</g>
									</svg>{" "}
									<div className="nav__orgname">
										Организация:
										<span className="nav__orgname">
											{getUinfoQuery.data?.orgName
												? getUinfoQuery.data.orgName
												: `${getUinfoQuery.data.uType}`}
										</span>
									</div>
								</li> */}
            {/* Другие элементы списка */}
            {/* </ul> */}
            {/* </nav> */}

            <div className="nav__log">
              <Link to="requests" className="nav__log-account">
                <img src={log} alt="log" className="nav__gerb" />
                <div className="account-text">
                  <p>Вазорати молияи</p>
                  <p>Ҷумҳурии Тоҷикистон</p>
                </div>
              </Link>
            </div>

            <div className="settings">
              <Link className="nav__notify" to={"notify"}>
                <NotificationsNoneOutlinedIcon
                  sx={{
                    fontSize: "40px",
                    color: "#959fae",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#afbacb",
                      transition: "all .2s",
                    },
                  }}
                />
              </Link>
              <div className="user_info" onClick={handleToggleUserMenu}>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title={getUinfoQuery.data?.fullName}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="alt"
                        src={
                          getUinfoQuery.data?.photo
                            ? `http://localhost:3000${getUinfoQuery.data.photo}`
                            : ""
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "100px",
                      "& .MuiMenu-paper": {
                        padding: "0 10px", // Измените padding здесь
                        borderRadius: "7px", // Измените border-radius здесь
                        border: "1px solid #0000000f",
                        boxShadow:
                          " 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link to="/uprofile/udetails" className="nav__log-account">
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        sx={{
                          p: 0,
                          minWidth: "200px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "5px",
                          borderRadius: "10px",
                          borderBottomRightRadius: "0",
                          borderBottomLeftRadius: "0",
                          borderBottom: "1px solid #00000015",
                        }}
                      >
                        <div className="user_info-icon">
                          <AccountCircleOutlinedIcon
                            sx={{ color: "#6DACF9" }}
                          />
                        </div>
                        <Typography
                          sx={{ width: "100%", textAlign: "start", p: 1 }}
                        >
                          Профиль
                        </Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        p: 0,
                        minWidth: "200px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "5px",
                        borderRadius: "10px",
                        borderTopRightRadius: "0",
                        borderTopLeftRadius: "0",
                      }}
                    >
                      <div className="user_info-icon">
                        <LogoutIcon sx={{ color: "#6DACF9" }} />
                      </div>
                      <Typography
                        sx={{
                          width: "100%",
                          textAlign: "start",
                          p: 1,
                          color: "#000",
                        }}
                      >
                        Выход
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                {/* <p>{getUinfoQuery.data?.username}</p> */}
                <svg
                  width="15px"
                  height="15px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="nav__verification--icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <KeyboardArrowDownIcon />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
