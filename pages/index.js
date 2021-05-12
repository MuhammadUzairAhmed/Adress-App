import React from "react";
import faker from "faker";
import Head from "next/head";
import Navbar from "./components/Navbar";
import { API, Auth } from "aws-amplify";
import { createTodo } from "../src/graphql/mutations";

export default function Home() {
  React.useEffect(()=>{
    console.log('hellow rold')
  },[])
  const fakerObj = {
    city: faker.address.city(),
    streetAddress: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const currentUser = await Auth.currentAuthenticatedUser();
    try {
      const result = await API.graphql({
        query: createTodo,
        variables: {
          input: {
            id: currentUser.attributes.sub,
            streetAddress: fakerObj?.streetAddress,
            city: fakerObj?.city,
            zipCode: fakerObj?.zipCode,
          },
        },
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-start">
      <Head>
        <title>Address App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <ul>
        <li>City: {fakerObj?.city}</li>
        <li>StreetAddress: {fakerObj?.streetAddress}</li>
        <li>ZipCode: {fakerObj?.zipCode}</li>
      </ul>
      <button
        style={{ width: "150px", margin: "10px" }}
        className="btn btn-primary"
        type="button"
        onClick={submitHandler}
      >
        Save Address
      </button>
    </div>
  );
}
