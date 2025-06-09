import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="blue.500" px={4} py={4}>
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          color="white">
          EventTickets
        </Link>
        <Flex gap={4}>
          <Link as={RouterLink} to="/" color="white">
            Home
          </Link>
          <Link as={RouterLink} to="/events" color="white">
            Events
          </Link>
          <Button colorScheme="whiteAlpha" size="sm">
            Sign In
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
