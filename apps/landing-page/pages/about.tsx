import { Stack, Text, Flex, Heading, List, ListItem } from '@chakra-ui/react'
import { Header } from 'components/common/Header/Header'
import { SocialMetaTags } from 'components/common/SocialMetaTags'
import React from 'react'
import { Footer } from 'components/common/Footer'
import { EndCta } from 'components/Homepage/EndCta'

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden ">
      <Header />
      <SocialMetaTags currentUrl={`https://bot.facto.com.cn/about`} />
      <Stack
        spacing={10}
        mx="auto"
        maxW="3xl"
        my="20"
        fontSize="17px"
        textAlign="justify"
        paddingInlineStart="8"
        paddingInlineEnd="8"
      >
        <Flex w="full">
          <Heading as="h1">Why Typebot?</Heading>
        </Flex>
        <Text>
          In an ideal world, a user should be able to chat with a human from a
          company and have an instant answer. The problem is that it is
          synchronous, time-consuming and it requires a huge customer support
          team working 24/7. It doesn&apos;t scale at all. Waiting for an answer
          from a human impacts the customer experience.
        </Text>
        <Text>
          Chatbots are a solution. You can chat with your customers, at scale.
        </Text>
        <Text>
          But, when built incorrectly, chatbots can be detrimental to your user
          experience. Most solutions out there focus on customer support. It can
          be so much more.
        </Text>
        <Text>A great chatbot should:</Text>
        <List listStyleType="initial">
          <ListItem>Provide a customized experience to the user</ListItem>
          <ListItem>
            Have a great user interface and beautiful animations
          </ListItem>
          <ListItem>Feel native to the business brand</ListItem>
          <ListItem>Provide what the user is looking for</ListItem>
        </List>
        <Text>
          A chatbot is not necessarily tied to customer support. It can also do:
        </Text>
        <List listStyleType="initial">
          <ListItem>Lead generation and qualification</ListItem>
          <ListItem>Quizzes</ListItem>
          <ListItem>Surveys</ListItem>
          <ListItem>User onboarding</ListItem>
          <ListItem>Product presentation</ListItem>
          <ListItem>Registrations (newsletter, waiting list)</ListItem>
        </List>
        <Text>
          To build that kind of chatbots, you need a tool that gives you enough
          freedom to closely tie it to your business logic. The build experience
          should be a reliable and fun experience. You also need a space where
          you can analyse your results so that you can incrementally improve
          your bots.
        </Text>
        <Text>This is what Typebot provides.</Text>
        <Text>
          Typebot is extremely flexible and provides the building blocks to create great
          chat experiences.
        </Text>
      </Stack>
      <EndCta />
      <Footer />
    </div>
  )
}

export default AboutPage
