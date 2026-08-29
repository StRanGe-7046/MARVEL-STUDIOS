import { infinitySagaMovies } from '../data/infinitySaga';

/**
 * Aggressively minimal prerequisite mappings for all 23 MCU Infinity Saga movies.
 * Each entry maps target movieId -> {
 *   minimum: [array of essential prerequisite movie IDs],
 *   why: { [movieId]: "One short sentence why this movie is essential" }
 * }
 */
export const minimalWatchMappings = {
  1: {
    minimum: [],
    why: {},
    message: "NO PREVIOUS MOVIES REQUIRED. You can watch Iron Man directly as the origin of the MCU."
  },
  2: {
    minimum: [],
    why: {},
    message: "NO PREVIOUS MOVIES REQUIRED. You can watch Bruce Banner's story directly."
  },
  3: {
    minimum: [1],
    why: {
      1: "Establishes Tony Stark as Iron Man and his public identity."
    }
  },
  4: {
    minimum: [],
    why: {},
    message: "NO PREVIOUS MOVIES REQUIRED. Introduces Asgard and Thor directly."
  },
  5: {
    minimum: [],
    why: {},
    message: "NO PREVIOUS MOVIES REQUIRED. Steve Rogers' standalone origin in World War II."
  },
  6: {
    minimum: [1, 4, 5],
    why: {
      1: "Introduces Iron Man, the core anchor of the team.",
      4: "Introduces Thor and Loki, the main antagonist.",
      5: "Introduces Captain America and the Space Stone (Tesseract)."
    }
  },
  7: {
    minimum: [6],
    why: {
      6: "Establishes the Battle of New York that causes Tony Stark's anxiety."
    }
  },
  8: {
    minimum: [6],
    why: {
      6: "Explains Loki's imprisonment in Asgard following the New York invasion."
    }
  },
  9: {
    minimum: [5, 6],
    why: {
      5: "Establishes Steve Rogers and his bond with Bucky Barnes.",
      6: "Shows Cap working as an active operative for S.H.I.E.L.D."
    }
  },
  10: {
    minimum: [],
    why: {},
    message: "NO PREVIOUS MOVIES REQUIRED. Standalone introduction to the cosmic Guardians."
  },
  11: {
    minimum: [6],
    why: {
      6: "Establishes the original Avengers team dynamic and Loki's scepter."
    }
  },
  12: {
    minimum: [],
    why: {},
    message: "NO PREVIOUS MOVIES REQUIRED. Standalone origin of Scott Lang and Pym shrinking tech."
  },
  13: {
    minimum: [6, 9, 11],
    why: {
      6: "Establishes the core Avengers team.",
      9: "Introduces Bucky Barnes as the hunted Winter Soldier.",
      11: "Causes the Sokovia incident leading to political division."
    }
  },
  14: {
    minimum: [],
    why: {},
    message: "NO PREVIOUS MOVIES REQUIRED. Standalone origin of Stephen Strange and the mystic arts."
  },
  15: {
    minimum: [10],
    why: {
      10: "Introduces the Guardians family dynamic and Peter Quill's background."
    }
  },
  16: {
    minimum: [13],
    why: {
      13: "Introduces Peter Parker and his mentorship under Tony Stark."
    }
  },
  17: {
    minimum: [6],
    why: {
      6: "Establishes Thor and Hulk before they end up stranded on Sakaar."
    }
  },
  18: {
    minimum: [13],
    why: {
      13: "Introduces T'Challa taking the Wakandan throne after King T'Chaka's death."
    }
  },
  19: {
    minimum: [6, 11, 13, 17],
    why: {
      6: "Assembles Earth's defenders and introduces Loki's scepter.",
      11: "Introduces Vision and the Mind Stone.",
      13: "Explains why the Avengers are fractured and divided.",
      17: "Directly leads into Thanos attacking Thor's Asgardian refugee ship."
    }
  },
  20: {
    minimum: [12, 13],
    why: {
      12: "Introduces Scott Lang, Hank Pym, and Hope van Dyne.",
      13: "Explains Scott's house arrest following the airport battle."
    }
  },
  21: {
    minimum: [],
    why: {},
    message: "NO PREVIOUS MOVIES REQUIRED. Standalone origin of Carol Danvers set in 1995."
  },
  22: {
    minimum: [6, 11, 19],
    why: {
      6: "Establishes the original six Avengers.",
      11: "Introduces Vision, Mind Stone, and Sokovia stakes.",
      19: "Direct prerequisite showing Thanos' snap wiping out half of all life."
    }
  },
  23: {
    minimum: [16, 22],
    why: {
      16: "Introduces Peter Parker and his high school friends.",
      22: "Deals directly with the global aftermath of Tony Stark's sacrifice."
    }
  }
};

/**
 * Returns the aggressively minimal watch path for a target movie ID.
 */
export function getMinimumWatchPath(targetMovieId) {
  const targetMovie = infinitySagaMovies.find((m) => m.id === Number(targetMovieId));
  if (!targetMovie) return null;

  const data = minimalWatchMappings[targetMovie.id] || { minimum: [], why: {} };

  const prerequisites = data.minimum
    .map((id) => {
      const movie = infinitySagaMovies.find((m) => m.id === id);
      return movie ? { movie, why: data.why[id] || 'Provides essential story context.' } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.movie.id - b.movie.id);

  const watchPath = [...prerequisites.map((p) => p.movie), targetMovie];

  return {
    targetMovie,
    prerequisites,
    count: prerequisites.length,
    message: data.message || null,
    watchPath,
  };
}
