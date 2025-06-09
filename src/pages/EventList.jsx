import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Button,
  Input,
  Select,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { events } from "../data/events";
import { format } from "date-fns";

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const categories = Array.from(new Set(events.map((event) => event.category)));

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "" || event.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxW="1200px" py={8}>
      <Heading as="h1" size="xl" mb={8}>
        Все Мероприятия
      </Heading>

      <Flex gap={4} mb={8}>
        <Input
          placeholder="Поиск мероприятий..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          placeholder="Все категории"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          maxW="200px">
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredEvents.map((event) => (
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
              <Text color="gray.600" mb={2}>
                {event.location}
              </Text>
              <Text color="blue.500" fontWeight="bold" mb={4}>
                {event.price === 0 ? "Бесплатно" : `${event.price} сом`}
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
    </Container>
  );
};

export default EventList;
