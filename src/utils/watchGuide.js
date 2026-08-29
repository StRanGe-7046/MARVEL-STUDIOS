import { infinitySagaMovies } from '../data/infinitySaga';

/**
 * Watch Guide Mappings for all 23 MCU Infinity Saga Movies.
 * Maps target movieId -> { mustWatch: [id...], optional: [id...] }
 */
export const watchGuideMappings = {
  1: { mustWatch: [], optional: [] },
  2: { mustWatch: [], optional: [1] },
  3: { mustWatch: [1], optional: [2] },
  4: { mustWatch: [1], optional: [3] },
  5: { mustWatch: [1], optional: [4] },
  6: { mustWatch: [1, 4, 5], optional: [2, 3] },
  7: { mustWatch: [1, 6], optional: [3] },
  8: { mustWatch: [4, 6], optional: [1] },
  9: { mustWatch: [5, 6], optional: [3] },
  10: { mustWatch: [6], optional: [] },
  11: { mustWatch: [1, 6, 9], optional: [4, 8] },
  12: { mustWatch: [6, 11], optional: [1] },
  13: { mustWatch: [1, 5, 6, 9, 11], optional: [3, 10, 12] },
  14: { mustWatch: [6], optional: [11] },
  15: { mustWatch: [10], optional: [] },
  16: { mustWatch: [6, 13], optional: [1] },
  17: { mustWatch: [4, 6, 8, 11], optional: [15] },
  18: { mustWatch: [13], optional: [11] },
  19: { mustWatch: [1, 6, 10, 11, 13, 14, 17], optional: [4, 5, 8, 15, 18] },
  20: { mustWatch: [12, 13], optional: [19] },
  21: { mustWatch: [6, 19], optional: [1, 5] },
  22: { mustWatch: [1, 6, 9, 11, 13, 14, 17, 19], optional: [4, 5, 10, 12, 20, 21] },
  23: { mustWatch: [6, 13, 16, 19, 22], optional: [1] },
};

/**
 * Resolves full watch guide details for a given movie ID or title.
 */
export function getWatchGuide(targetMovieId) {
  const targetMovie = infinitySagaMovies.find((m) => m.id === Number(targetMovieId));
  if (!targetMovie) return null;

  const mapping = watchGuideMappings[targetMovie.id] || { mustWatch: [], optional: [] };

  // Resolve movie objects in chronological order (by id)
  const mustWatchMovies = mapping.mustWatch
    .map((id) => infinitySagaMovies.find((m) => m.id === id))
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  const optionalMovies = mapping.optional
    .map((id) => infinitySagaMovies.find((m) => m.id === id))
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  // Watch Path sequence leading up to target movie
  const watchPath = [...mustWatchMovies, targetMovie];

  // Calculate total runtime in hours
  const parseRuntime = (str) => parseInt(str || '120', 10);

  const mustWatchMinutes = mustWatchMovies.reduce((sum, m) => sum + parseRuntime(m.runtime), 0);
  const totalMinutes = watchPath.reduce((sum, m) => sum + parseRuntime(m.runtime), 0);

  const mustWatchHours = Math.round(mustWatchMinutes / 60);
  const totalHours = Math.round(totalMinutes / 60);

  return {
    targetMovie,
    mustWatchMovies,
    optionalMovies,
    watchPath,
    totalMustWatch: mustWatchMovies.length,
    totalOptional: optionalMovies.length,
    mustWatchHours,
    totalHours,
  };
}
