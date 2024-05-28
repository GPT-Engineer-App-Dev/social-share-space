import { Box, Container, VStack, HStack, Text, Input, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <Box as="nav" bg="blue.500" color="white" p={4}>
        <Container maxW="container.md">
          <Text fontSize="xl" fontWeight="bold">Public Post Board</Text>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.md" py={6}>
        <VStack spacing={4} align="stretch">
          {posts.length === 0 ? (
            <Text>No posts yet. Be the first to post!</Text>
          ) : (
            posts.map((post, index) => (
              <Box key={index} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
                <Text>{post}</Text>
              </Box>
            ))
          )}
        </VStack>
      </Container>

      {/* Post Submission Form */}
      <Box position="fixed" bottom={0} width="100%" bg="white" boxShadow="md" p={4}>
        <Container maxW="container.md">
          <HStack spacing={4}>
            <Input
              placeholder="Write your post here..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handlePostSubmit}>Post</Button>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;