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
    from: null,
    to: null,
    tools: ["Angular", "Redux", "Javascript", "HTML", "CSS", "Node"],
    position: null,
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
];
