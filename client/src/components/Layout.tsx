import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
  return (
    <Box p={4}>
      <Flex mb={4}>
        <Heading size="md">IT Рекрутер</Heading>
        <Spacer />
        <Button as={Link} to="/candidates" colorScheme="teal" mr={4}>
          Кандидаты
        </Button>
        <Button as={Link} to="/comments/important" colorScheme="teal" mr={4}>
          Важные Комментарии
        </Button>
        <Button as={Link} to="/accepted" colorScheme="teal">
          Принятые Резюме
        </Button>
      </Flex>
      <Outlet />
    </Box>
  );
}
