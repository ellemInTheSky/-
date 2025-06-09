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
        <Heading>Event not found</Heading>
        <Button mt={4} onClick={() => navigate("/events")}>
          Back to Events
        </Button>
      </Container>
    );
  }

  const handleBookTickets = () => {
    if (ticketCount > event.availableTickets) {
      toast({
        title: "Not enough tickets",
        description: `Only ${event.availableTickets} tickets available`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Tickets booked!",
      description: `Successfully booked ${ticketCount} ticket(s) for ${event.title}`,
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
              Date: {format(new Date(event.date), "MMMM d, yyyy")}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              Time: {event.time}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              Location: {event.location}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              Category: {event.category}
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
              Book Tickets
            </Heading>
            <Text fontSize="2xl" color="blue.500" fontWeight="bold" mb={4}>
              ${event.price}
            </Text>
            <Text color="gray.600" mb={4}>
              Available Tickets: {event.availableTickets}
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
              Total: ${(event.price * ticketCount).toFixed(2)}
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              width="100%"
              onClick={handleBookTickets}>
              Book Now
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default EventDetails;
