import React from 'react'
import { Box, Heading, Flex, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

const Header = () => {
  const { userName, logout } = useUser();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg="white"
      px={6}
      py={4}
      boxShadow="sm"
      borderBottom="1px"
      borderColor="gray.200"
    >
      {/* Header Content */}
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Heading size="lg" color="gray.800">
          Bingo Game
        </Heading>
        <Button as={Link} to="/leaderboard" colorScheme="blue" variant="outline">Leaderboard</Button>
        <Button as={Link} to="/" colorScheme="blue" variant="outline">Game Board</Button>

        <Flex align="center" gap={4}>
          <Text color="gray.600" fontWeight="medium">
            Welcome, {userName}!
          </Text>
          <Button
            colorScheme="red"
            size="sm"
            onClick={handleLogout}
            variant="outline"
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header