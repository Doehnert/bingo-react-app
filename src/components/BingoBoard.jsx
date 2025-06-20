import { Box, Grid, GridItem, Text, VStack, Heading, Button } from '@chakra-ui/react';

const BingoBoard = ({ boardNumbers, handleCellClick }) => {

  return (
    <VStack spacing={6} align="center">
      <Heading size="lg" color="blue.600">
        BINGO Board
      </Heading>

      {/* Bingo board grid */}
      <Grid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(5, 1fr)"
        gap={2}
        w="400px"
        h="400px"
        maxW="90vw"
        maxH="90vw"
      >
        {boardNumbers && boardNumbers.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const cellKey = `${rowIndex}-${colIndex}`;
            const isMarked = cell.marked;
            const number = cell.number;
            const isCenter = rowIndex === 2 && colIndex === 2; // The middle cell

            return (
              <GridItem
                key={cellKey}
                bg={isCenter ? "red.100" : isMarked ? "green.200" : "white"}
                border="2px solid"
                borderColor={isMarked ? "green.500" : "gray.300"}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  bg: isCenter ? "red.200" : isMarked ? "green.300" : "gray.50",
                  transform: "scale(1.05)"
                }}
                onClick={() => !isCenter && handleCellClick(cell)}
                position="relative"
              >
                {isCenter ? (
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    color="red.600"
                    textAlign="center"
                  >
                    FREE
                  </Text>
                ) : (
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={isMarked ? "green.700" : "gray.700"}
                  >
                    {number}
                  </Text>
                )}

                {/* Marked indicator */}
                {isMarked && !isCenter && (
                  <Box
                    position="absolute"
                    top="2px"
                    right="2px"
                    w="12px"
                    h="12px"
                    bg="green.500"
                    borderRadius="full"
                  />
                )}
              </GridItem>
            );
          })
        )}
      </Grid>



    </VStack>
  );
};

export default BingoBoard; 