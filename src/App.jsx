import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";
import { useDispatch, useSelector } from "react-redux";
import EmptyBoard from "./components/EmptyBoard";
import LoginForm from "./components/LoginForm";
import { fetchBoards } from "./utils/api";

function App() {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  useEffect(() => {
    fetchBoards(dispatch);
  }, [dispatch]);

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="overflow-hidden">
      {isAuthenticated ? (
        <>
          {boards.length > 0 ? (
            <>
              {/* Header Section */}
              <Header
                boardModalOpen={boardModalOpen}
                setBoardModalOpen={setBoardModalOpen}
              />

              {/* Center Section */}
              <Center
                boardModalOpen={boardModalOpen}
                setBoardModalOpen={setBoardModalOpen}
              />
            </>
          ) : (
            <>
              <EmptyBoard type="add" />
            </>
          )}
        </>
      ) : (
        // Render login page if not authenticated
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
