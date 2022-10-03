import type { NextPage } from "next";
import Head from "next/head";
import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import Logo from "../components/Logo";

const Home: NextPage = () => {
  return (
    <Container fluid>
      <Head>
        <title>web and data developer - sneaky crow</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container size="md">
        <Logo />
        <Container fluid sx={{ textAlign: "center" }}>
          <Title order={1}>sneaky crow</Title>
          <Title order={2}>data and web developer</Title>
        </Container>
        <Container fluid>
          <Title order={3}>about me</Title>

          <Stack>
            <Text>
              My name is <strong>Zach</strong> and I love problem-solving with
              software. With over a decade of experience, &apos; worked with
              many partners including
              <strong>Twitch, Nike, and local PNW businesses</strong>. I work
              with both businesses and individuals.
            </Text>

            <Text>
              Some of my favorite technologies to work with are:{" "}
              <strong>
                Rust, Go, React, AI, CI/CD, Data Analysis, Data Pipelining...
              </strong>
            </Text>
            <Text>
              If you have an interesting project idea or would like to work with
              me then please{" "}
              <Link href="mailto:zach@sneakycrow.dev" passHref>
                <Anchor component="a">contact me via email</Anchor>
              </Link>
            </Text>
          </Stack>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
