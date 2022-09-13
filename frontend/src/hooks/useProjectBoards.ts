interface IUseProjectBoards {
  boardId: string;
}

const useProjectBoards = ({ boardId }: IUseProjectBoards) => {
  console.log(boardId);
  return null;
};

export default useProjectBoards;
