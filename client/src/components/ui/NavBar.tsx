import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function NavBar(): JSX.Element {
  return (
    <Breadcrumb
      width="32.5cm"
      backgroundColor="blue.500"
      padding="1em"
      borderRadius="md"
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/'>Main Page</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink as={NavLink} to='/filter'>Account Page</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/signup' ml={785}>SignUp</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/signin'>SignIn</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/logout'>Logout</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
