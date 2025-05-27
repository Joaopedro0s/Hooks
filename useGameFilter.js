import { useMemo } from 'react';

const useGameFilter = (games, search) => {
  return useMemo(() => {
    return games.filter(game =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [games, search]);
};

export default useGameFilter;
