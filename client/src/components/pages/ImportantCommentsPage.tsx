import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Stack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchImportantComments } from '../../redux/Comments/CommentsSlice';
import type { RootState } from '../../redux/store';

const ImportantCommentsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { importantComments, loading, error } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(fetchImportantComments());
  }, [dispatch]);

  if (loading) return <Text>Загрузка...</Text>;
  if (error) return <Text>Ошибка: {error}</Text>;

  return (
    <Box p={4}>
      <Text fontSize="3xl" mb={6}>Важные Комментарии</Text>
      <Stack spacing={4}>
        {importantComments.map((comment) => (
          <Box key={comment.id} borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="md">
            <Text>{comment.text}</Text>
            <Link as={RouterLink} to={`/candidates/${comment.resumeId}`} color="teal.500">
              Перейти к резюме
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ImportantCommentsPage;
