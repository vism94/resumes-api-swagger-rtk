import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import type { EditResumeType, ResumeType } from '../../types/resumeTypes';
import { useAppDispatch } from '../hooks/reduxHooks';
import { editResumeThunk } from '../../redux/Resumes/ResumeAsyncActions';

type ResumeCardTypes = {
  resume: ResumeType;
  deleteHandler: (id: ResumeType['id']) => void;
};

export default function ResumeCard({ resume, deleteHandler }: ResumeCardTypes): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as EditResumeType['data'];
    void dispatch(editResumeThunk({ id: resume.id, data }));
    onClose();
  };

  return (
    <Card maxW="sm" backgroundColor="rgba(212, 207, 207, 0.5)">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Image
            src={`/img/${resume.img}`}
            alt="Resume Image"
            objectFit="cover"
            height="200px"
            width="100%"
            borderTopLeftRadius="lg"
            borderTopRightRadius="lg"
          />
          <Heading size="md">{resume.fullName}</Heading>
          <Text>{resume.about}</Text>
          <Text>{resume.technologies}</Text>
          <Text>{resume.achievments}</Text>
          <Text>{resume.education}</Text>
          <Text>{resume.prefered}</Text>
          <Text>{resume.phone}</Text>
          <Text>{resume.telegram}</Text>
          <Text>{resume.git}</Text>
          <Text>{resume.email}</Text>
          <Text>{resume.position}</Text>
          <Text>{resume.salary}</Text>
          <Text color="blue.600" fontSize="1xl">
            {resume.phone}
          </Text>
        </Stack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Редактировать</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSave}>
              <ModalBody>
                <Stack spacing={3}>
                  <Input name="fullName" defaultValue={resume.fullName} placeholder="Редактировать имя" />
                  <Input name="img" defaultValue={resume.img} placeholder="Редактировать URL изображения" />
                  <Input name="position" defaultValue={resume.position} placeholder="Редактировать позицию" />
                  <Input name="about" defaultValue={resume.about} placeholder="Редактировать описание" />
                  <Input name="phone" defaultValue={resume.phone} placeholder="Редактировать телефон" />
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  ОК
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Отмена
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button onClick={onOpen} variant="outline" colorScheme="gray">
            Редактировать
          </Button>
          <Button onClick={() => deleteHandler(resume.id)} variant="outline" colorScheme="red">
            Удалить
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
