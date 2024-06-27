export type Project = {
  name: string;
  from: string | null; // "2024-06-27T15:47:36.666Z"
  to: string | null; // "2024-06-27T15:47:36.666Z"
  desc: string;
  tools: string[];
  position: string | null;
  github: string | null;
  thumb: string;
};

export const projects: Project[] = [
  {
    name: "Portfolio",
    from: null,
    to: null,
    tools: ["Angular", "Tailwind", "Github Pages"],
    position: null,
    github: "https://github.com/vinagreti/vinagreti.github.io",
    thumb: "/images/thumb-portfolio.png",
    desc: `My portfolio

Here is where I can gather what I have built and what experiences I got from it.

The Idea is to showcase some libs, some apps and sideprojects I have done.
    `,
  },
  {
    name: "Slate",
    from: "2023-09-19",
    to: "2024-05-29",
    tools: ["Angular", "Redux", "Javascript", "HTML", "CSS", "Node", "Figma"],
    position: "Senior UI Engineer",
    github: null,
    thumb: "/images/thumb-slate.png",
    desc:
      `Working on the web part of the business. I was responsible for maintaining and adding features to the web apps and making sure the business gets what it needs to move forward in the fast growing social media content creation market.

Projects:
Web client used to manage assets and create contents.

Responsibilities:
Working on the web client my responsabilities includes maintaining the application and adding new features.
As the social media environment changes constantly I have to help the company to evolve in the speed needed and with the quality it needs.
    `,
  },
  {
    name: "Avail Car Sharing",
    from: "2022-06-16",
    to: "2023-06-27",
    tools: ["React", "Redux", "Javascript", "HTML", "CSS", "Node", "Figma"],
    position: "Senior UI Engineer",
    github: null,
    thumb: "/images/thumb-avail.png",
    desc:
      `The company has multiple systems that support a Car Sharing and Rent business.

Responsibilities:

My responsabilities includes creating and maintaining well written and documented front and back-end applications.
Working with Javascript, NodeJs, React, Jira, Github, Jenkings, Kafka and other tools and services, we support the business with fast and secure response to the business needs trying to be ready for any request the company does.The company has multiple systems that support a Car Sharing and Rent business. Responsibilities: I'm responsible for creating and maintaining well written and documented front and back-end applications. Working with Javascript, NodeJs, React, Jira, Github, Jenkings, Kafka and other tools and services, we support the business with fast and secure response to the business needs trying to be ready for any request the company does.
Web Development, React.js and +3 skills
    `,
  },
  {
    name: "Reef.ai",
    from: "2021-06-01",
    to: "2022-06-15",
    tools: [
      "Angular",
      "Graphql",
      "Javascript",
      "HTML",
      "CSS",
      "Node",
      "Figma",
      "Jenkins",
      "Bff",
      "Microservices",
    ],
    position: "Senior UI Engineer",
    github: null,
    thumb: "/images/thumb-reef.webp",
    desc:
      `Reef uses AI to improve customer success. My main role was to develop an app to help companies to measure and plan the relationship with the customers.

Responsibilities:

I was responsible for creating and maintaining well written and documented front-end applications.
Working with Javascript, Angular, Firebase, Bitbucket, Github Actions, Git, AWS, Google Cloud and other tools and services, we support the business with fast and secure response to the business needs trying to be ready for any request the company does.
    `,
  },
  {
    name: "Reef.ai",
    from: "2020-12-01",
    to: "2022-06-26",
    tools: [
      "React",
      "NextJS",
      "Javascript",
      "HTML",
      "CSS",
      "Node",
      "Figma",
      "Jenkins",
      "Microservices",
    ],
    position: "Software Engeneering III",
    github: null,
    thumb: "/images/thumb-cvc.png",
    desc:
      `Search for rooms, search for flights, search for traveling programs, request transfer, easing burocracy or whatever aspect of your travel you can do with CVC Corp products.

We work to ensure that everyone from everywhere can plan, buy, enjoy and come back from their adeventure.

Projects:

Focused on front-end, working with the Hotels team, I'm responsible by making the hotels search as easy, secure and fast as possible.

Using micro frontends with react and next.js, using Jira to manage the work flow, Jenkins to control deploy processes and Kubernets/Docker to run and delivery the applications, we have a very strong technical set.

Responsibilities:

As a Developer III I'm responsible by ensure we can solve any problem and create any feature the business needs.
    `,
  },
];
