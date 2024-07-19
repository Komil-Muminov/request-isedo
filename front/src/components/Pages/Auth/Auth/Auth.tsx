import "./Auth.css";
import React from "react";
import Registration from "../Registration.tsx/Registarion";
import Authorization from "../Authorization/Authorization";
const Auth: React.FC = () => {
  const [authType, setAuthType] = React.useState<string>("registration");

  const handleClick = (state: string) => {
    setAuthType(state);
  };

  return (
    <section className="sections auth__section">
      <div className="container">
        <div className="auth_box">
          <div className="wrapper-buttons">
            <button
              onClick={() => handleClick("registration")}
              className={`${
                authType === "registration" ? "btn-reg" : "btn-auth"
              }`}
            >
              Зарегистрироваться
            </button>
            <button
              onClick={() => handleClick("authorization")}
              className={`${
                authType === "registration" ? "btn-auth" : "btn-reg"
              }`}
            >
              Войти
            </button>
          </div>
          <div className="auth__content">
            <div className="auth_render">
              {authType === "registration" ? (
                <Registration />
              ) : (
                <Authorization />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;

{
  /*  */
}
