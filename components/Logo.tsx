import { Avatar, Box, Button, Image, Stack, Text } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const Logo = () => {
  const { data: session } = useSession();
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Box sx={{ position: "relative" }}>
      <Image
        src="/logo.png"
        fit="contain"
        width={400}
        radius={400}
        sx={{ marginLeft: "auto", marginRight: "auto" }}
        alt="A line art graphic of a crow with a green baseball cap on"
        onClick={() => setVisible(!visible)}
        withPlaceholder={visible}
        placeholder={
          !session ? (
            <Button onClick={() => signIn("github")}>
              Sign in with Github
            </Button>
          ) : (
            <Stack align="center">
              <Avatar radius="xl" src={session.user?.image} alt="it's me" />
              <Text>Welcome, {session.user?.name}</Text>
            </Stack>
          )
        }
      />
    </Box>
  );
};

export default Logo;
