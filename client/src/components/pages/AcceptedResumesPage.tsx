import { Box, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

export default function AcceptedResumesPage(): JSX.Element {
  const resumes = useAppSelector((state) => state.resumes.data);
  const acceptedResumes = resumes.filter((resume) => resume.isAccepted);

  return (
    <Box p={4}>
      <Text fontSize="3xl" mb={6}>
        Принятые Резюме
      </Text>
      <Stack spacing={4}>
        {acceptedResumes.map((resume) => (
          <Box key={resume.id} borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="md">
            <Text fontWeight="bold" fontSize="lg">
              {resume.fullName}
            </Text>
            <Text>${resume.salary}</Text>
            <Link as={RouterLink} to={`/candidates/${resume.id}`} color="teal.500">
              Подробнее
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
