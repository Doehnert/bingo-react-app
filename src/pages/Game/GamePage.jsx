import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Container,
  useToast
} from '@chakra-ui/react';
import { useUser } from '../../contexts/UserContext';
import BingoBoard from '../../components/BingoBoard';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';

const GamePage = () => {
  const { userName, logout, token } = useUser();
  const [boardNumbers, setBoardNumbers] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [callCount, setCallCount] = useState(0);

  const callNextNumber = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/game/next-number`);
      const newNumber = response.data;
      setCurrentNumber(newNumber);

      // Update call count and recalculate score
      const newCallCount = callCount + 1;
      setCallCount(newCallCount);
      const newScore = Math.abs(100 - newCallCount);
      setScore(newScore);
    } catch (error) {
      console.error('Error calling next number:', error);
    } finally {
      setLoading(false)
    }
  }

  const toast = useToast();

  const [searchParams] = useSearchParams();

  const saveBoardToLocalStorage = (boardData) => {
    localStorage.setItem('bingoBoard', JSON.stringify(boardData));
  };

  const loadBoardFromLocalStorage = () => {
    const savedBoard = localStorage.getItem('bingoBoard');
    if (savedBoard) {
      try {
        return JSON.parse(savedBoard);
      } catch (error) {
        console.error('Error loading board from localStorage:', error);
        return null;
      }
    }
    return null;
  };

  const loadBoardFromURL = () => {
    const numbersParam = searchParams.get('numbers');
    if (numbersParam) {
      try {
        const boardData = JSON.parse(decodeURIComponent(numbersParam));
        setBoardNumbers(boardData);
        saveBoardToLocalStorage(boardData);
        return boardData;
      } catch (error) {
        console.error('Error loading board from URL:', error);
        return null;
      }
    }
    return null;
  };


  const generateBoardNumbers = async () => {
    // Check if there is any marked cells
    if (boardNumbers && boardNumbers.some(row => row.some(cell => cell.marked))) {
      // Alert the user that they need to clear the board first

      if (confirm("Are you sure you want to generate a new board? There are marked cells on the board.")) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/game/new-game`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log(response);
          setBoardNumbers(null);
          setCurrentNumber(null);
          setScore(0);
          setCallCount(0);
          setHasWon(false);
        } catch (error) {
          console.error('Error generating new board:', error);
        }
      } else {
        return;
      }
    }

    // Generate all numbers for the entire board at once
    const allNumbers = new Set();
    const newBoardNumbers = [];

    // Generate 5 numbers for each column
    for (let col = 0; col < 5; col++) {
      const columnNumbers = [];

      while (columnNumbers.length < 5) {
        const number = Math.floor(Math.random() * 100) + 1;

        if (!allNumbers.has(number)) {
          allNumbers.add(number);
          columnNumbers.push({ number, marked: false });
        }
      }
      newBoardNumbers.push(columnNumbers);
    }

    // Transpose the array to get rows instead of columns
    const transposedBoard = [];
    for (let i = 0; i < 5; i++) {
      const row = newBoardNumbers.map(column => column[i]);
      transposedBoard.push(row);
    }

    // Set free cell as marked
    transposedBoard[2][2].marked = true;

    setBoardNumbers(transposedBoard);
    saveBoardToLocalStorage(transposedBoard);
  };

  useEffect(() => {
    // Priority order: URL params > localStorage > generate new
    const urlBoard = loadBoardFromURL();
    if (urlBoard) {
      return; // URL board loaded successfully
    }

    const savedBoard = loadBoardFromLocalStorage();
    if (savedBoard) {
      setBoardNumbers(savedBoard);
    } else {
      // Generate new board if none exists
      generateBoardNumbers();
    }
  }, [searchParams]); // Re-run when URL params change

  const checkWinnerStatus = (boardNumbers) => {
    console.log('Checking winner status...');
    console.log('Current board:', boardNumbers);

    // Check center cell specifically
    const centerCell = boardNumbers[2][2];
    console.log('Center cell:', centerCell);

    // Check any completed rows
    for (let i = 0; i < 5; i++) {
      const row = boardNumbers[i];
      console.log(`Row ${i}:`, row);
      console.log(`Row ${i} marked cells:`, row.filter(cell => cell.marked).length);
      if (row.every(cell => cell.marked)) {
        console.log(`BINGO! Row ${i} is complete!`);
        return true;
      }
    }

    // Check any completed columns
    for (let i = 0; i < 5; i++) {
      const column = boardNumbers.map(row => row[i]);
      console.log(`Column ${i}:`, column);
      console.log(`Column ${i} marked cells:`, column.filter(cell => cell.marked).length);
      if (column.every(cell => cell.marked)) {
        console.log(`BINGO! Column ${i} is complete!`);
        return true;
      }
    }

    // Check any completed diagonals
    const diagonal1 = boardNumbers.map((row, index) => row[index]);
    const diagonal2 = boardNumbers.map((row, index) => row[4 - index]);
    console.log('Diagonal 1 (top-left to bottom-right):', diagonal1);
    console.log('Diagonal 2 (top-right to bottom-left):', diagonal2);
    console.log('Diagonal 1 marked cells:', diagonal1.filter(cell => cell.marked).length);
    console.log('Diagonal 2 marked cells:', diagonal2.filter(cell => cell.marked).length);

    if (diagonal1.every(cell => cell.marked)) {
      console.log('BINGO! Diagonal 1 is complete!');
      return true;
    }
    if (diagonal2.every(cell => cell.marked)) {
      console.log('BINGO! Diagonal 2 is complete!');
      return true;
    }

    console.log('No winner yet...');
    return false;
  }

  const handleSubmitScore = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/game/win`,
        {
          score: score
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast({
        title: 'You have won the game!',
        description: `You have won the game! Your score is ${score}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setCurrentNumber(null);
      setScore(0);
      setCallCount(0);
      generateBoardNumbers();
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  }

  const handleCellClick = async (cell) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/game/validate-number`,
        { number: cell.number },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // if (response.data.correct === true) {
      if (true) {
        const newBoardNumbers = boardNumbers.map(row =>
          row.map(c => c.number === cell.number ? { ...c, marked: !c.marked } : c)
        );
        setBoardNumbers(newBoardNumbers);
        saveBoardToLocalStorage(newBoardNumbers);
        const winStatus = checkWinnerStatus(newBoardNumbers);
        console.log(winStatus);
        if (winStatus) {
          await handleSubmitScore();
        }
      }
    } catch (error) {
      console.error('Error validating number:', error);
    }
  };



  const shareBoardURL = () => {
    // Share the board numbers to the clipboard
    const boardNumbersString = JSON.stringify(boardNumbers);
    const boardURL = `${window.location.origin}/board?numbers=${encodeURIComponent(boardNumbersString)}`;
    navigator.clipboard.writeText(boardURL);
    alert("Board URL copied to clipboard");
  };

  return (
    <Box minH="100vh" bg="gray.50" >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container maxW="1200px" py={10}>
        <VStack spacing={8}>

          <Heading color="gray.600" fontWeight="bold">
            Current Number: {currentNumber}
          </Heading >
          <Flex align="center" justify="center" w="full" gap={4}>
            <Text color="gray.600" fontWeight="bold">Current Score: {score}</Text>
            <Text color="gray.600" fontWeight="bold">Call Count: {callCount}</Text>
          </Flex>

          <Button
            colorScheme="green"
            onClick={callNextNumber}
            isLoading={loading}
            size="lg"
          >
            Call Next Number
          </Button>

          {/* Bingo Board */}
          <Box
            bg="white"
            borderRadius="xl"
            p={8}
            boxShadow="lg"
            w="full"
            display="flex"
            justifyContent="center"
          >
            <BingoBoard boardNumbers={boardNumbers} handleCellClick={handleCellClick} />
          </Box>
          <Flex justify="center" gap={4}>
            <Button colorScheme="blue" onClick={generateBoardNumbers}>Generate New Board</Button>
            <Button colorScheme="blue" onClick={shareBoardURL}>Share Board URL</Button>
          </Flex>
        </VStack>

      </Container>
    </Box>
  );
};

export default GamePage; 