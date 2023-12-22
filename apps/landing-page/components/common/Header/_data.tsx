import { GitHubIcon } from 'assets/icons'
import { DocIcon } from 'assets/icons/DocIcon'
import { MapIcon } from 'assets/icons/MapIcon'
import { PeopleCircleIcon } from 'assets/icons/PeopleCircleIcon'
import * as React from 'react'

export const links = [
  {
    label: 'Resources',
    children: [
      {
        label: 'Video Tutorials',
        description: 'Explore quick and easy videos to become a Typebot user',
        href: 'https://space.bilibili.com/442427698',
        icon: <GitHubIcon fill="blue.300" />,
      },
      {
        label: 'Documentation',
        description:
          "Everything you need to know about how to use Typebot's builder",
        href: 'https://docs.facto.com.cn',
        icon: <DocIcon />,
      },
      {
        label: 'Roadmap',
        description:
          "Follow the development and make suggestions for which features you'd like to see",
        href: 'https://feedback.facto.com.cn/roadmap',
        icon: <MapIcon />,
      },
      {
        label: 'Community',
        description:
          'Join the Discord server and learn about chatbots best practices and get help from the community',
        href: '/discord',
        icon: <PeopleCircleIcon />,
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
]
