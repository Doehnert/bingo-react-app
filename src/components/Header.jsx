import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  IconButton,
  useToast,
  useBreakpointValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { HamburgerIcon } from '@chakra-ui/icons'

const Header = () => {
  const { userName, logout } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

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

  const MenuItems = () => (
    <VStack spacing={4} align="stretch">
      <Button as={Link} to="/" colorScheme="blue" variant="outline" onClick={onClose}>
        Game Board
      </Button>
      <Button as={Link} to="/leaderboard" colorScheme="blue" variant="outline" onClick={onClose}>
        Leaderboard
      </Button>
      <Button
        colorScheme="red"
        onClick={() => {
          handleLogout();
          onClose();
        }}
        variant="outline"
      >
        Logout
      </Button>
    </VStack>
  );

  return (
    <>
      <Box
        bg="white"
        px={6}
        py={4}
        boxShadow="sm"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
          <Heading size="lg" color="gray.800">
            Bingo Game
          </Heading>

          {/* Desktop Menu */}
          {!isMobile && (
            <Flex align="center" gap={4}>
              <Button as={Link} to="/leaderboard" colorScheme="blue" variant="outline">
                Leaderboard
              </Button>
              <Button as={Link} to="/" colorScheme="blue" variant="outline">
                Game Board
              </Button>
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
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Flex align="center" gap={4}>
              <Text color="gray.600" fontWeight="medium" fontSize="sm">
                Welcome, {userName}!
              </Text>
              <IconButton
                aria-label="Open menu"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                variant="outline"
                size="sm"
              />
            </Flex>
          )}
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <MenuItems />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header