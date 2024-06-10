import React, { useState } from "react";
import { Container, VStack, Text, Button, Input, Box, useToast } from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";

const Index = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAnalyze = () => {
    // Mock trading analysis response
    const mockResponse = `The analysis for ${query} shows a positive trend with a potential growth of 5% in the next quarter.`;
    setResponse(mockResponse);
    speakResponse(mockResponse);
  };

  const speakResponse = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = speechSynthesis.getVoices().find((voice) => voice.name === "Google UK English Female");
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech Synthesis not supported",
        description: "Your browser does not support speech synthesis.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Trading Analysis AI</Text>
        <Input placeholder="Enter stock symbol or query" value={query} onChange={handleInputChange} />
        <Button leftIcon={<FaMicrophone />} colorScheme="teal" onClick={handleAnalyze}>
          Analyze
        </Button>
        {response && (
          <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text>{response}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
