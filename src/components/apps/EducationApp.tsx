import { BookOpen } from "lucide-react";

interface EducationCardProps {
  title: string;
  institution: string;
  date: string;
  description: string;
  logo: React.ReactNode; // Changed from string to ReactNode for JSX elements
  skills: string[];
}

const EducationCard = ({
  title,
  institution,
  date,
  description,
  logo,
  skills,
}: EducationCardProps) => {
  return (
    <div className="border border-border rounded-lg p-5 mb-6 hover:bg-muted/30 transition-colors">
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4 flex-shrink-0">
          {logo}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{title}</h3>
              <h4 className="text-os-accent">{institution}</h4>
            </div>
            <div className="text-sm text-muted-foreground">{date}</div>
          </div>

          <p className="my-3 text-sm">{description}</p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-muted px-2 py-1 rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationApp = () => {
  const educationData = [
    {
      title: "ITI 3-Months Intensive MEARN Stack Bootcamp",
      institution: "Information Technology Institute (ITI)",
      date: "Mar 2023 - Jul 2023",
      description:
        "Gained hands-on experience with MongoDB, Express, Angular, React, and Node.js. Developed proficiency in building robust and scalable web applications using the MEARN stack, with a strong focus on best practices and industry standards.",
      logo: "ITI",
      skills: [
        "MongoDB",
        "Express",
        "Angular",
        "React",
        "Node.js",
        "Full Stack",
      ],
    },
    {
      title: "Bachelor's Degree in Computer Engineering",
      institution: "Kafr El-Sheikh University",
      date: "Sep 2016 - Jul 2021",
      description:
        "Proficient in programming languages such as C++, JavaScript, and Python, with a strong foundation in algorithms, data structures, computer networks, software engineering, and problem-solving skills.",
      logo: "KSU",
      skills: [
        "Computer Engineering",
        "Programming",
        "Algorithms",
        "Data Structures",
        "Networks",
      ],
    },
    {
      title: "Full Stack JavaScript Developer Nanodegree",
      institution: "Udacity",
      date: "2022",
      description:
        "Comprehensive program covering advanced JavaScript concepts, modern frameworks, and full-stack development practices for building scalable web applications.",
      logo: "UD",
      skills: [
        "JavaScript",
        "Full Stack",
        "Web Development",
        "Modern Frameworks",
      ],
    },
    {
      title: "Web Development Professional Nanodegree",
      institution: "Udacity",
      date: "2022",
      description:
        "In-depth exploration of professional web development practices, covering frontend and backend technologies, performance optimization, and deployment strategies.",
      logo: "UD",
      skills: ["Web Development", "Frontend", "Backend", "Performance"],
    },
    {
      title: "The Complete JavaScript Course: From Zero to Expert",
      institution: "Udemy",
      date: "2021",
      description:
        "Comprehensive JavaScript course covering fundamentals to advanced concepts, including ES6+, asynchronous programming, and modern practices.",
      logo: "UM",
      skills: ["JavaScript", "ES6+", "Asynchronous Programming"],
    },
    {
      title: "The Complete Web Development Bootcamp",
      institution: "Udemy",
      date: "2021",
      description:
        "End-to-end web development training covering HTML, CSS, JavaScript, and popular frameworks for building responsive web applications.",
      logo: "UM",
      skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    },
    {
      title: "React - The Complete Guide (incl Hooks, Router, Redux)",
      institution: "Udemy",
      date: "2022",
      description:
        "Comprehensive React course covering components, state management, hooks, context API, routing, and Redux for building dynamic user interfaces.",
      logo: "UM",
      skills: ["React", "Hooks", "Context API", "Redux", "Router"],
    },
    {
      title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
      institution: "Udemy",
      date: "2022",
      description:
        "Complete backend development program covering Node.js, Express, MongoDB, authentication, security, and deployment of RESTful APIs.",
      logo: "UM",
      skills: [
        "Node.js",
        "Express",
        "MongoDB",
        "RESTful APIs",
        "Authentication",
      ],
    },
  ];

  const getLogoComponent = (logo: string) => {
    switch (logo) {
      case "KSU":
        return <div className="text-sm font-bold">KSU</div>;
      case "ITI":
        return <div className="text-sm font-bold">ITI</div>;
      case "UD":
        return <div className="text-sm font-bold">UD</div>;
      case "UM":
        return <div className="text-sm font-bold">UM</div>;
      default:
        return <BookOpen size={18} />;
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-os-accent" />
          <h1 className="text-2xl font-bold">Education & Courses</h1>
        </div>

        <p className="mb-8 text-muted-foreground">
          My educational background and continuous learning journey through
          various courses and certifications.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {educationData.map((item, index) => (
            <EducationCard
              key={index}
              {...item}
              logo={getLogoComponent(item.logo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationApp;
