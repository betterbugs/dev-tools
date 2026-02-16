"use client";

import React, { useState } from "react";

const SudokuSolver: React.FC = () => {
  const [grid, setGrid] = useState<(number | null)[][]>(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [status, setStatus] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");

  // Helper to check if safe
  const isSafe = (board: (number | null)[][], row: number, col: number, num: number) => {
    // Check row
    for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
    // Check col
    for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
    // Check box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i + startRow][j + startCol] === num) return false;
    return true;
  };

  const solve = (board: (number | null)[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolve = () => {
    const board = grid.map(row => [...row]);
    if (solve(board)) {
      setGrid(board);
      setStatus("Solved!");
    } else {
      setStatus("No solution found.");
    }
  };

  const handleClear = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill(null)));
    setStatus("");
  };

  const isSafeBox = (board: (number | null)[][], rowStart: number, colStart: number, num: number) => {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[rowStart + i][colStart + j] === num) return false;
    return true;
  };

  const fillBox = (board: (number | null)[][], row: number, col: number) => {
    let num: number;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        do {
          num = Math.floor(Math.random() * 9) + 1;
        } while (!isSafeBox(board, row, col, num));
        board[row + i][col + j] = num;
      }
    }
  };

  const generate = () => {
    // Start fresh
    const board = Array(9).fill(null).map(() => Array(9).fill(null));

    // Fill diagonal 3x3 matrices (independent)
    for (let i = 0; i < 9; i = i + 3) {
      fillBox(board, i, i);
    }

    // Solve remaining
    if (!solve(board)) {
        setStatus("Failed to generate. Try again.");
        return;
    }

    // Remove digits based on difficulty
    // Easy: ~30 removed (keep 51), Medium: ~45 removed (keep 36), Hard: ~55 removed (keep 26)
    // Actually, usually it's specified by givens.
    // Easy: 40-50 givens. Medium: 30-40 givens. Hard: 20-30 givens.
    // Let's remove cells.
    let attempts = difficulty === "Easy" ? 40 : difficulty === "Medium" ? 50 : 60;

    while (attempts > 0) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      while (board[row][col] === null) {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
      }
      board[row][col] = null;
      attempts--;
    }
    setGrid(board);
    setStatus("");
  };

  const handleChange = (row: number, col: number, value: string) => {
    const val = parseInt(value);
    const newGrid = grid.map(r => [...r]);
    if (value === "" || isNaN(val)) {
      newGrid[row][col] = null;
    } else if (val >= 1 && val <= 9) {
      newGrid[row][col] = val;
    }
    setGrid(newGrid);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">Sudoku Solver & Generator</h2>

            <div className="flex justify-center gap-4 flex-wrap">
               <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="bg-black/20 border border-white/20 rounded px-3 py-2"
                >
                 <option value="Easy">Easy</option>
                 <option value="Medium">Medium</option>
                 <option value="Hard">Hard Level</option>
               </select>
               <button onClick={generate} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 font-bold">Generate</button>
               <button onClick={handleSolve} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 font-bold">Solve</button>
               <button onClick={handleClear} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 font-bold">Clear</button>
            </div>

            <div className="flex justify-center overflow-auto p-2">
              <div className="grid grid-cols-9 gap-0 border-4 border-white bg-white text-black w-fit">
                {grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <input
                      key={`${rowIndex}-${colIndex}`}
                      type="text"
                      maxLength={1}
                      value={cell ?? ""}
                      onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                      className={`w-10 h-10 text-center font-bold text-lg focus:outline-none focus:bg-blue-100
                        ${colIndex % 3 === 2 && colIndex !== 8 ? "border-r-2 border-r-gray-800" : "border-r border-gray-300"}
                        ${rowIndex % 3 === 2 && rowIndex !== 8 ? "border-b-2 border-b-gray-800" : "border-b border-gray-300"}
                      `}
                    />
                  ))
                ))}
              </div>
            </div>

            {status && <div className="text-center text-xl font-bold mt-4">{status}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SudokuSolver;
