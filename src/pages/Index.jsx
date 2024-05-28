import { Box, Container, VStack, HStack, Text, Input, Button, Flex, Spinner } from "@chakra-ui/react";
import { usePosts, useAddPost, useAddReaction } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: posts, isLoading, isError, error } = usePosts();
  const addPostMutation = useAddPost();
  const addReactionMutation = useAddReaction();
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost, author_id: "user-id-placeholder" });
      setNewPost("");
    }
  };

  const handleReaction = (postId, emoji) => {
    addReactionMutation.mutate({ post_id: postId, user_id: "user-id-placeholder", emoji });
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
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {posts.length === 0 ? (
              <Text>No posts yet. Be the first to post!</Text>
            ) : (
              posts.map((post) => (
                <Box key={post.id} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
                  <Text>{post.title}</Text>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={() => handleReaction(post.id, "👍")}>👍</Button>
                    <Button size="sm" onClick={() => handleReaction(post.id, "❤️")}>❤️</Button>
                    <Button size="sm" onClick={() => handleReaction(post.id, "😂")}>😂</Button>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
        )}
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
            <Button colorScheme="blue" onClick={handlePostSubmit} isLoading={addPostMutation.isLoading}>Post</Button>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;