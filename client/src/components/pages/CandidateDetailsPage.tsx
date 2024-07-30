import { Box, Button, Flex, Image, Stack, Tag, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumeById, addComment, updateComment, deleteComment, acceptResume } from '../../redux/Resumes/ResumeSlice';
import type { RootState } from '../../redux/store';
import type { CommentType } from '../../types/resumeTypes';

export default function CandidateDetailsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const resumeId = Number(id);
  const dispatch = useDispatch();
  const resume = useSelector((state: RootState) => state.resumes.data.find((r) => r.id === resumeId));
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    if (!resume) {
      dispatch(fetchResumeById(resumeId));
    }
  }, [dispatch, resume, resumeId]);

  const handleAddComment = async (): Promise<void> => {
    if (!resume) return;
    try {
      const newCommentData = { resumeId, text: newComment, isImportant: false };
      await dispatch(addComment(newCommentData)).unwrap();
      setNewComment('');
      dispatch(fetchResumeById(resumeId));
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      alert('Не удалось добавить комментарий');
    }
  };

  const handleAcceptResume = async (): Promise<void> => {
    try {
      await dispatch(acceptResume(resumeId)).unwrap();
      dispatch(fetchResumeById(resumeId));
    } catch (error) {
      console.error('Ошибка при принятии резюме:', error);
      alert('Произошла ошибка при принятии резюме');
    }
  };

  const handleDeleteComment = async (commentId: number): Promise<void> => {
    try {
      await dispatch(deleteComment(commentId)).unwrap();
      dispatch(fetchResumeById(resumeId));
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
      alert('Не удалось удалить комментарий');
    }
  };

  if (!resume) return <Text>Загрузка...</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        {resume.fullName}
      </Text>
      <Flex mb={4}>
        <Image
          boxSize="150px"
          objectFit="cover"
          src={`/img/${resume.img}`}
          alt={resume.fullName}
          borderRadius="full"
          mr={4}
        />
        <Stack>
          <Text fontWeight="bold" fontSize="lg">
            {resume.fullName}
          </Text>
          <Text>{resume.about}</Text>
          <Box>
            <Text fontWeight="bold">Technologies:</Text>
            {resume.technologies.map((tech) => (
              <Tag key={tech} colorScheme="teal" mr={2}>
                {tech}
              </Tag>
            )) || <Text>Нет технологий</Text>}
          </Box>
        </Stack>
      </Flex>
      <Box>
        <Text fontWeight="bold" mb={2}>
          Комментарии
        </Text>
        <Stack spacing={4}>
          {Array.isArray(resume.Comments) && resume.Comments.length > 0 ? (
            resume.Comments.map((comment: CommentType) => (
              <Box
                key={comment.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg={comment.isImportant ? 'yellow.50' : 'white'}
              >
                <Text>{comment.text}</Text>
                <Button
                  mt={2}
                  onClick={() =>
                    dispatch(updateComment({ id: comment.id, isImportant: !comment.isImportant }))
                  }
                >
                  Переключить важность
                </Button>
                <Button
                  mt={2}
                  ml={2}
                  colorScheme="red"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Удалить
                </Button>
              </Box>
            ))
          ) : (
            <Text>Комментарии отсутствуют</Text>
          )}
        </Stack>
        <Textarea
          mt={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Добавить новый комментарий"
        />
        <Button mt={2} colorScheme="teal" onClick={handleAddComment}>
          Добавить комментарий
        </Button>
      </Box>
      <Button mt={4} colorScheme="teal" onClick={handleAcceptResume}>
        Принять
      </Button>
    </Box>
  );
}
