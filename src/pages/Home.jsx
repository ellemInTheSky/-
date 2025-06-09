import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { events } from "../data/events";
import { format } from "date-fns";

const Home = () => {
  const featuredEvents = events.slice(0, 3);

  return (
    <Container maxW="1200px" py={8}>
      <Box textAlign="center" mb={12}>
        <Heading as="h1" size="2xl" mb={4}>
          Мероприятия Кыргызстана
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Покупайте билеты на лучшие события в Кыргызстане онлайн
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {featuredEvents.map((event) => (
          <Box
            key={event.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.02)" }}>
            <Image
              src={event.imageUrl}
              alt={event.title}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <Box p={6}>
              <Heading as="h3" size="md" mb={2}>
                {event.title}
              </Heading>
              <Text color="gray.600" mb={2}>
                {format(new Date(event.date), "d MMMM yyyy")} в {event.time}
              </Text>
              <Text color="gray.600" mb={4}>
                {event.location}
              </Text>
              <Button
                as={RouterLink}
                to={`/events/${event.id}`}
                colorScheme="blue"
                width="100%">
                Подробнее
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Box textAlign="center" mt={12}>
        <Button as={RouterLink} to="/events" colorScheme="blue" size="lg">
          Все мероприятия
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
