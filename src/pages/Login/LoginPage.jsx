import { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  useToast
} from '@chakra-ui/react';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

const LoginPage = () => {
  const [name, setName] = useState('');
  const { login } = useUser();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.400, purple.600)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <Box
          bg="white"
          borderRadius="xl"
          p={8}
          boxShadow="xl"
          textAlign="center"
        >
          <VStack spacing={6}>
            <Heading
              size="2xl"
              bgGradient="linear(to-r, blue.400, purple.600)"
              bgClip="text"
              fontWeight="bold"
            >
              Welcome to Bingo!
            </Heading>

            <Text color="gray.600" fontSize="lg">
              Enter your name to start playing
            </Text>

            <Box as="form" onSubmit={handleSubmit} w="full">
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold" color="gray.700">
                    Your Name
                  </FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    size="lg"
                    autoFocus
                    _focus={{
                      borderColor: 'blue.400',
                      boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
                    }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  isDisabled={!name.trim()}
                  bgGradient="linear(to-r, blue.400, purple.600)"
                  _hover={{
                    bgGradient: 'linear(to-r, blue.500, purple.700)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                >
                  Start Playing
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage; 