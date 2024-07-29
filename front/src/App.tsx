import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Pages/Navigation/Navigation";
// Импортируются функции Suspense и lazy из React для ленивой загрузки компонентов.
import { Suspense, lazy } from "react";
import { Loader } from "./components/UI/Loader/Loader";
// Каждая страница приложения загружается лениво с помощью функции lazy. Это значит, что соответствующий модуль будет загружен только тогда, когда потребуется его отображение, что улучшает производительность приложения.
const LazyAuthPage = lazy(() => import("./components/Pages/Auth/Auth/Auth"));
const LazyUserProfile = lazy(
  () => import("./components/Pages/UserProfile/Profile")
);
const LazyAccount = lazy(() => import("./components/Pages/Account/Account"));
const LazyErrorPage = lazy(
  () => import("./components/Pages/ErrorPage/ErrorPage")
);
const LazyAddRequest = lazy(
  () => import("./components/Pages/AddRequest/AddRequest")
);

const LazyMfrqst = lazy(() => import(`./components/Pages/Mfrqst/Mfrqst`));

/* Надо сделать динамический запрос */
function App() {
  return (
    <>
      <Navigation />
      {/* Компонент Suspense оборачивает маршруты и показывает компонент Loader (обернутый в div), пока лениво загружаются страницы.
       */}
      <Suspense fallback={<div>{<Loader />}</div>}>
        <Routes>
          {/* Путь "*" отображает LazyErrorPage для всех несуществующих маршрутов (страница ошибки 404).
           */}
          <Route path="*" element={<LazyErrorPage />} />
          <Route path="/" element={<LazyAuthPage />} />
          <Route path="auth" element={<LazyAuthPage />} />
          <Route path="account" element={<LazyAccount />} />
          <Route path="uprofile" element={<LazyUserProfile />} />
          <Route path="addrequest" element={<LazyAddRequest />} />
          {/* Надо сделать динамический запрос */}
          <Route path="mfrqst" element={<LazyMfrqst />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
