import "./TypeRequest.css";
import AssignmentIcon from "@mui/icons-material/Assignment";

import changeOfAccountant from "../../../assets/icons/change-of-accountant.webp";
import { Button } from "@mui/material";

import { typeRequests } from "../../API/Data/TypeRequests/TypeRequests";

import { motion, AnimatePresence } from "framer-motion";

const TypeRequest = ({ setReqType, setShowTypeRequest, reqType }: any) => {
  const handleClick = (value: any) => {
    setReqType(value);
    setShowTypeRequest(false);
  };

  const handleModalClose = () => {
    // Временно блокируем закрытие модалки, чтобы анимация успела завершиться
    setShowTypeRequest(false);
  };

  console.log(reqType);

  return (
    <AnimatePresence>
      {reqType && (
        <div className="wrapper-modal" onClick={handleModalClose}>
          <motion.div
            initial={{ scale: 0, translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: 1, translateX: "-50%", translateY: "-50%" }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="header">
              <p>Типы заявок</p>
            </div>
            <main className="center">
              <ul className="wrapper-request-list">
                {typeRequests.map((e) => {
                  return (
                    <li
                      className={e.name === reqType ? "active" : ""}
                      key={e.id}
                      onClick={() => handleClick(e.name)}
                    >
                      <div className="icon">
                        <img src={e.image} alt="" />
                      </div>
                      <p>{e.name}</p>
                    </li>
                  );
                })}
              </ul>
            </main>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TypeRequest;
