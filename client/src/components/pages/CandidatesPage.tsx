import { Box, Button, Image, Text, Link, Stack, Badge, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes } from '../../redux/Resumes/ResumeSlice';
import type { RootState } from '../../redux/store';

export default function CandidatesPage(): JSX.Element {
  const dispatch = useDispatch();
  const { data: resumes, loading, error } = useSelector((state: RootState) => state.resumes);
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  const loadMore = (): void => setLimit((prev) => prev + 5);

  if (loading) return <Text>Загрузка...</Text>;
  if (error) return <Text>Ошибка: {error}</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Кандидаты</Text>
      <Stack spacing={4}>
        {resumes.slice(0, limit).map((resume) => (
          <Box
            key={resume.id}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            p={4}
            bg="white"
            shadow="md"
          >
            <Flex mb={4}>
              <Image
                boxSize="100px"
                objectFit="cover"
                src={`/img/${resume.img}`}
                alt={resume.fullName}
                borderRadius="full"
                mr={4}
              />
              <Stack>
                <Text fontWeight="bold" fontSize="lg">{resume.fullName}</Text>
                <Text>{resume.prefered}</Text>
                <Text>${resume.salary}</Text>
                <Text>{resume.phone}</Text>
                {Array.isArray(resume.Comments) && resume.Comments.some(comment => comment.isImportant) && (
                  <Badge colorScheme="red">
                    {resume.Comments.filter(comment => comment.isImportant).length} Важные комментарии
                  </Badge>
                )}
              </Stack>
            </Flex>
            <Link as={RouterLink} to={`/candidates/${resume.id}`} color="teal.500">Посмотреть детали</Link>
          </Box>
        ))}
      </Stack>
      <Button mt={4} onClick={loadMore} colorScheme="teal">Загрузить еще</Button>
    </Box>
  );
}
