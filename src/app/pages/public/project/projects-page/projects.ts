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
    from: "2022-06-01",
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
];
