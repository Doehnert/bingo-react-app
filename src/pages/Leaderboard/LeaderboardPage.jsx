import React, { useEffect, useState } from 'react'
import { Box, Heading, Table, TableContainer, Thead, Tbody, Tr, Th, Td, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import Header from '../../components/Header';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!token) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Fetching leaderboard with token:', token);

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/game/leaderboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [token]); // Add token as dependency

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Box maxW="1200px" mx="auto" py={8}>
          <Text color="red.500">{error}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" >
      <Header />

      {/* Main Content */}
      <Box maxW="1200px" mx="auto" py={8}>
        <Heading size="lg" color="gray.800">Leaderboard</Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Game ID</Th>
                <Th>Winner</Th>
                <Th>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboard.map((game, index) => (
                <Tr key={game.game_id}>
                  <Td>{game.game_id}</Td>
                  <Td>{game.winner}</Td>
                  <Td>{game.winner_score}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default LeaderboardPage