import React from "react";
import './header.css';

const Header = () => {

    const handleOnClickUserIcon = () => {
        localStorage.clear();
    }

    const handleOnClickLogo = () => {
        window.location.replace('http://localhost:3000');
    }

    const username = localStorage.getItem('userName') ? localStorage.getItem('userName') : '';

    return (
        <>
            <link
                rel="stylesheet"
                href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                crossOrigin="anonymous"
            />
            <div className="nav-bar">
                <div className="nav-left">
                    <div className="nav-logo" onClick={handleOnClickLogo}>
                        <img src="./img/logo.png" alt="logo" />
                    </div>
                    <div className="nav-link">
                        <ul>
                            <li>
                                <a href="#">
                                    Du lịch
                                    <i className="fas fa-caret-down" />
                                </a>
                            </li>
                            <li>
                                <a href="#">Vietravel MICE</a>
                            </li>
                            <li>
                                <a href="#">
                                    Vận chuyển
                                    <i className="fas fa-caret-down" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Tin tức
                                    <i className="fas fa-caret-down" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Khuyến mãi
                                    <i className="fas fa-caret-down" />
                                </a>
                            </li>
                            <li>
                                <a href="#">ViettravelPlus</a>
                            </li>
                            <li>
                                <a href="#">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="nav-right">
                    <div className="nav-search">
                        <input type="text" id="serach" placeholder="Bắt đầu tìm kiếm..." />
                        <i className="fal fa-search" />
                    </div>
                    <div className="username">
                        <span>{username}</span>
                    </div>
                    <div className="nav-login">
                        <a href="http://localhost:3000/auth/sign-in" onClick={handleOnClickUserIcon}>
                            <i className="fal fa-user" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;