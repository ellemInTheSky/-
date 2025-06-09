import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { events } from "../data/events";
import { format } from "date-fns";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [ticketCount, setTicketCount] = useState(1);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <Container maxW="1200px" py={8}>
        <Heading>Мероприятие не найдено</Heading>
        <Button mt={4} onClick={() => navigate("/events")}>
          Вернуться к списку
        </Button>
      </Container>
    );
  }

  const handleBookTickets = () => {
    if (ticketCount > event.availableTickets) {
      toast({
        title: "Недостаточно билетов",
        description: `Доступно только ${event.availableTickets} билетов`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Билеты забронированы!",
      description: `Успешно забронировано ${ticketCount} билет(ов) на ${event.title}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="1200px" py={8}>
      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={8}>
        <GridItem>
          <Image
            src={event.imageUrl}
            alt={event.title}
            borderRadius="lg"
            width="100%"
            height="400px"
            objectFit="cover"
          />
          <Box mt={6}>
            <Heading as="h1" size="xl" mb={4}>
              {event.title}
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={4}>
              {event.description}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              Дата: {format(new Date(event.date), "d MMMM yyyy")}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              Время: {event.time}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              Место: {event.location}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              Категория: {event.category}
            </Text>
          </Box>
        </GridItem>

        <GridItem>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            position="sticky"
            top="100px">
            <Heading as="h2" size="md" mb={4}>
              Забронировать билеты
            </Heading>
            <Text fontSize="2xl" color="blue.500" fontWeight="bold" mb={4}>
              {event.price === 0 ? "Бесплатно" : `${event.price} сом`}
            </Text>
            <Text color="gray.600" mb={4}>
              Доступно билетов: {event.availableTickets}
            </Text>
            <NumberInput
              min={1}
              max={event.availableTickets}
              value={ticketCount}
              onChange={(_, value) => setTicketCount(value)}
              mb={4}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Итого:{" "}
              {event.price === 0
                ? "Бесплатно"
                : `${(event.price * ticketCount).toFixed(2)} сом`}
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              width="100%"
              onClick={handleBookTickets}>
              Забронировать
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default EventDetails;
