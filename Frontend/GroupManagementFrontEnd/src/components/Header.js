import React from "react";
import './header.css';

const Header = () => {

    const handleOnClickUserIcon = () => {
        localStorage.clear();
    }

    return (
        <>
            <div className="nav-bar">
                <div className="nav-left">
                    <div className="nav-logo">
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