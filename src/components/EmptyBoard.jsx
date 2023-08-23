function EmptyBoard() {
  return (
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      <h3 className=" text-gray-500 font-bold text-6xl mr-[300px] ml-[300px] text-center">
        Choose an existing board from the sidebar or Create a new board to get
        started.
      </h3>
    </div>
  );
}

export default EmptyBoard;
