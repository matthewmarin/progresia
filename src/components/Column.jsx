import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";

function Column({ colIndex }) {
  const allColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const col = board.columns.find((col, i) => i === colIndex);

  const [usedColors, setUsedColors] = useState([]);
  const availableColors = allColors.filter(
    (color) => !usedColors.includes(color)
  );

  useEffect(() => {
    setUsedColors((prevUsedColors) => [...prevUsedColors, col.color]);
  }, [col.color]);

  const randomColor =
    availableColors.length > 0
      ? availableColors[Math.floor(Math.random() * availableColors.length)]
      : "";

  return (
    <div className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]">
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <span className={`rounded-full w-4 h-4 ${randomColor}`} />
        {col.name} ({col.tasks ? col.tasks.length : 0})
      </p>
      {col.tasks &&
        col.tasks.map((task, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}
    </div>
  );
}

export default Column;
