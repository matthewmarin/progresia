import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";
import { useDispatch, useSelector } from "react-redux";
import { setBoardActive, setBoards } from "./redux/boardsSlice"; // Import the action creators correctly
import EmptyBoard from "./components/EmptyBoard";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import { fetchBoards } from "./utils/api";

function App() {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  // Fetch boards when the app starts (assuming this action fetches boards from the server)
  useEffect(() => {
    fetchBoards(dispatch);
  }, []);

  useEffect(() => {
    const activeBoard = boards.find((board) => board.isActive);

    if (!activeBoard && boards.length > 0) {
      dispatch(setBoardActive({ index: 0 }));
    }
  }, [boards]);

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
