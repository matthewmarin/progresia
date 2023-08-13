import React, { useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";
import LoginForm from "./components/LoginForm"; // Import your login form component

function App() {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  // Simulate user authentication (replace with your actual authentication logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true); // Set authentication state to true
  };

  return (
    <div className="overflow-hidden">
      {isAuthenticated ? (
        // Render main content if authenticated
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
