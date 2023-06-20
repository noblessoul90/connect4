import { isDraw } from "./game";
import { Board } from "../components/interfaces/Board";

describe("Is the game a draw", () => {
  it("Will show as a draw if one by one board filled", () => {
    const oneByOneBoard: Board = {
      rows: [
        {
          columns: [
            {
              player: 1,
            },
          ],
        },
      ],
    };

    expect(isDraw(oneByOneBoard)).toBe(true);
  });
  it("Will not show as a draw if one by one board isn't filed", () => {
    const oneByOneBoard: Board = {
      rows: [
        {
          columns: [
            {
              player: null,
            },
          ],
        },
      ],
    };

    expect(isDraw(oneByOneBoard)).toBe(false);
  });

  it("Will not show as a draw if two by two board isn't filed", () => {
    const twoByTwoBoard: Board = {
      rows: [
        {
          columns: [
            {
              player: 1,
            },
            {
              player: 1,
            },
          ],
        },
        {
          columns: [
            {
              player: 1,
            },
            {
              player: null,
            },
          ],
        },
      ],
    };

    expect(isDraw(twoByTwoBoard)).toBe(false);
  });
});
