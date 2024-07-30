import React, { useState } from 'react';
import { Box, Button, Input, Stack ,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';


type PropsType = {
  ResumesSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ResumeForm({ ResumesSubmitHandler }: PropsType): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  const wrappedResumesSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    ResumesSubmitHandler(e);
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal} colorScheme="purple" mt={8} mb={8}>
        Добавить Задачу
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить новую задачу</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box onSubmit={wrappedResumesSubmitHandler} as="form" mt={3}>
              <Stack spacing={3}>
                <Input name="fullName" placeholder="fullName" size="md" />
                <Input name="position" placeholder="position" size="md" />
                <Input name="about" placeholder="about" size="md" />
                <Input name="img" placeholder="img" size="md" />
                <Input name="phone" placeholder="phone" size="md" />
                <Button type="submit" colorScheme="green">
                  Добавить Задачу
                </Button>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
