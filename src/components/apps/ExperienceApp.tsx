import { Briefcase, ChevronRight } from "lucide-react";

const ExperienceCard = ({
  company,
  role,
  period,
  location,
  description,
  technologies,
  subProjects,
}: {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  subProjects?: Array<{
    name: string;
    role: string;
    period: string;
    description: string;
    technologies: string[];
  }>;
}) => {
  return (
    <div className="border border-border rounded-lg p-5 mb-6 hover:bg-muted/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{company}</h3>
          <h4 className="text-os-accent font-medium">{role}</h4>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">{period}</div>
          <div className="text-sm">{location}</div>
        </div>
      </div>

      <p className="mb-4 text-sm">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-muted px-2 py-1 rounded-md text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {subProjects && subProjects.length > 0 && (
        <div className="mt-4 border-t border-border pt-4">
          <h5 className="text-sm font-semibold mb-3 text-muted-foreground">
            Projects:
          </h5>
          <div className="space-y-4">
            {subProjects.map((project, index) => (
              <div key={index} className="pl-4 border-l-2 border-os-accent">
                <div className="flex items-start mb-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-os-accent mr-1" />
                  <div>
                    <h6 className="font-medium">{project.name}</h6>
                    <p className="text-xs text-os-accent">{project.role}</p>
                  </div>
                </div>
                <p className="text-xs mb-2 pl-5">{project.description}</p>
                <div className="flex flex-wrap gap-1 pl-5">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-muted/50 px-1.5 py-0.5 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ExperienceApp = () => {
  const experiences = [
    {
      company: "Nexventures SA",
      role: "Front-End Developer",
      period: "Sep 2023 - Present",
      location: "Switzerland",
      description:
        "Working as a key developer at Nexventures, a software development company with a focus on innovative solutions for various industries. Contributing to multiple projects with different tech stacks.",
      technologies: [
        "React",
        "Angular",
        "Next.js",
        "REST APIs",
        "Firebase",
        "Git",
        "GitHub",
      ],
      subProjects: [
        {
          name: "Propyz",
          role: "React Developer",
          period: "Part of Nexventures role",
          description:
            "Contributed to developing an ERP system for real estate management, improving processes for companies, tenants, owners, and admins. Developed real-time chat functionality, ticketing module, and voting module.",
          technologies: [
            "Next.js",
            "React",
            "REST APIs",
            "Firebase",
            "React Hook Forms",
            "API Integration",
          ],
        },
        {
          name: "Tapgo",
          role: "Angular Developer",
          period: "Part of Nexventures role",
          description:
            "Contributed to the upgrades and maintenance of POS software for restaurants, enhancing online ordering, QR solutions, and Kiosk systems. Optimized admin portal for better restaurant management.",
          technologies: [
            "Angular",
            "Services",
            "Guards",
            "Routing",
            "Interceptors",
            "Lazy Loading",
          ],
        },
      ],
    },
    {
      company: "Safka",
      role: "MERN Stack Developer",
      period: "Mar 2024",
      location: "Part Time, Remote, Egypt",
      description:
        "Streamlined platform performance and fortified security to boost efficiency for web administrators, marketers, and merchants. Implemented role-based access and permissions middleware, eliminating critical vulnerabilities. Engineered financial reports, analytics, and marketer alerts, empowering data-driven decisions.",
      technologies: [
        "React.js",
        "Redux",
        "REST APIs",
        "Chakra UI",
        "Express",
        "NGINX",
        "PM2",
        "MongoDB",
        "Node.js",
        "DigitalOcean",
      ],
    },
    {
      company: "Freelance",
      role: "Software Engineer",
      period: "Jan 2023 - Present",
      location: "Remote",
      description:
        "Delivered a wide range of projects in web development, data science, and web scraping for clients across various freelancing platforms. Managed end-to-end project execution, consistently delivering high-quality solutions. Achieved a 98% Job Success Score (JSS) with 50+ completed jobs.",
      technologies: [
        "Next.js",
        "REST APIs",
        "Web Development",
        "Python",
        "Web Scraping",
        "JavaScript",
        "React.js",
        "Software Development",
        "Chrome Extensions",
        "Supabase",
      ],
    },
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 flex items-center">
          <Briefcase className="w-8 h-8 mr-3 text-os-accent" />
          <h1 className="text-2xl font-bold">Professional Experience</h1>
        </div>

        <p className="mb-8 text-muted-foreground">
          My professional journey spans multiple companies and roles, where I've
          applied my JavaScript expertise to solve diverse challenges and
          deliver impactful solutions.
        </p>

        <div>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceApp;
