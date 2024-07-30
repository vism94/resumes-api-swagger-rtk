import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ResumeCard from '../ui/ResumeCard';
import ResumeForm from '../ui/ResumeForm';
import useResumes from '../hooks/useResumes';

export default function MainPage(): JSX.Element {
  const { ResumesSubmitHandler, resumes, deleteHandler } = useResumes();

  return (
    <>
      <ResumeForm ResumesSubmitHandler={ResumesSubmitHandler} />
      <SimpleGrid columns={3} spacing={5}>
        {resumes.map((el) => (
          <ResumeCard
            resume={el}
            key={el.id}
            deleteHandler={deleteHandler}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
