import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Importe o arquivo CSS

const Home = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        // Você atualizará esta função posteriormente
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <div className="titleText">Welcome!</div>
            </div>
            <div className="contentContainer">
                <div>This is the home page.</div>
            </div>
            <div className="buttonContainer">
                <input
                    className="inputButton"
                    type="button"
                    onClick={onButtonClick}
                    value={loggedIn ? "Log out" : "Log in"}
                />
                {loggedIn ? (
                    <div className="userInfo">
                        Your email address is {email}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Home;
