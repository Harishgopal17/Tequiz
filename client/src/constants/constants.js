import css from "../assets/images/css.jpg";
import html from "../assets/images/html.jpg";
import javascript from "./../assets/images/javascript.jpg";
import reactjs from "./../assets/images/reactjs.jpg";
import nodejs from "./../assets/images/nodejs.jpg";
import sql from "./../assets/images/sql.jpg";
import java from "./../assets/images/java.jpg";
import php from "./../assets/images/php.jpg";
import seo from "./../assets/images/seo.jpg";
import ai from "./../assets/images/ai.jpg";

export const navLinks = [
  { href: "guide", label: "Guide" },
  { href: "contact", label: "Contact" },
];

export const explore = [
  {
    name: "",
    subheading: "Basic html questions",
    category: "frontend",
    imgurl: html,
    quiz: "htmlquiz",
  },
  {
    name: "",
    subheading: "Basic css questions",
    category: "frontend",
    imgurl: css,
    quiz: "cssquiz",
  },
  {
    name: "",
    subheading: "Basic Javascript questions",
    category: "frontend",
    imgurl: javascript,
    quiz: "javascriptquiz",
  },
  {
    name: "",
    subheading: "Basic React questions",
    category: "frontend",
    imgurl: reactjs,
    quiz: "reactjsquiz",
  },
  {
    name: "",
    subheading: "Basic Nodejs questions",
    category: "backend",
    imgurl: nodejs,
    quiz: "nodejsquiz",
  },
  {
    name: "SQL",
    subheading: "Basic SQL questions",
    category: "database",
    imgurl: sql,
    quiz: "sqlquiz",
  },
  {
    name: "",
    subheading: "Basic Java questions",
    category: "backend",
    imgurl: java,
    quiz: "javaquiz",
  },
  {
    name: "",
    subheading: "Basic Php questions",
    category: "backend",
    imgurl: php,
    quiz: "phpquiz",
  },
  {
    name: "",
    subheading: "Introduction to SEO",
    category: "digital marketing",
    imgurl: seo,
    quiz: "seoquiz",
  },
  {
    name: "",
    subheading: "Introduction to AI",
    category: "ai",
    imgurl: ai,
    quiz: "aiquiz",
  },
];

export const guide = [
  {
    heading: "Web Development",
    context:
      "The ultimate beginner-friendly platform for web development tutorials on HTML and CSS.",
    urlname: "W3Schools",
    url: "https://www.w3schools.com/",
  },
  {
    heading: "JavaScript",
    context:
      "Comprehensive and up-to-date with the detailed documentation for mastering JavaScript.",
    urlname: "MDN",
    url: "https://developer.mozilla.org/",
  },
  {
    heading: "UI/UX Design",
    context:
      "Learn UI design principles and Figma tools to bring your ideas to life.",
    urlname: "Learnux",
    url: "https://learnux.io/",
  },
  {
    heading: "Node.js",
    context:
      "The best place to start with comprehensive, official guides and examples.",
    urlname: "The odin project",
    url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs",
  },
  {
    heading: "React.js",
    context:
      "The ultimate guide straight from the React team with examples and API references.",
    urlname: "React",
    url: "https://react.dev/",
  },
  {
    heading: "MongoDB",
    context: "Step-by-step guide from the mongoDB team with examples.",
    urlname: "MongoDB",
    url: "https://www.mongodb.com/docs/guides/",
  },
  {
    heading: "Version Control",
    context:
      "A detailed and practical guide to mastering Git and version control.",
    urlname: "Git SCM",
    url: "https://git-scm.com/",
  },
  {
    heading: "SEO",
    context:
      "Learn Search Engine Optimization basics and advanced strategies from the experts.",
    urlname: "Moz",
    url: "https://moz.com/beginners-guide-to-seo",
  },
  {
    heading: "AI and Machine Learning",
    context:
      "Different approaches to AI, including the 'good old' symbolic approach with Knowledge Representation and reasoning.",
    urlname: "Microsoft",
    url: "https://microsoft.github.io/AI-For-Beginners/",
  },
];
