
import { useState } from "react";
import { Code, ExternalLink, Github, ChevronRight } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  features: string[];
  github?: string;
  demo?: string;
  image: string;
}

const ProjectCard = ({ 
  project, 
  isSelected, 
  onClick 
}: { 
  project: Project; 
  isSelected: boolean; 
  onClick: () => void 
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all min-w-0 w-full overflow-hidden ${
        isSelected ? 'border-os-accent bg-muted/50 shadow-md' : 'border-border hover:border-os-accent hover:bg-muted/30'
      }`}
      onClick={onClick}
    >
      <div className="font-medium mb-2 line-clamp-2 break-words">{project.title}</div>
      <div className="flex flex-wrap gap-1 mb-3 min-w-0">
        {project.stack.slice(0, 2).map((tech, i) => (
          <span key={i} className="bg-muted text-xs px-1.5 py-0.5 rounded break-words">
            {tech}
          </span>
        ))}
        {project.stack.length > 2 && (
          <span className="bg-muted text-xs px-1.5 py-0.5 rounded shrink-0">
            +{project.stack.length - 2}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 break-words">
        {project.description}
      </p>
    </div>
  );
};

const ProjectDetail = ({ project }: { project: Project }) => {
  return (
    <div className="p-4 md:p-6 min-w-0 overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-start gap-2 break-words">
        <Code size={20} className="text-os-accent shrink-0 mt-1" />
        <span className="min-w-0">{project.title}</span>
      </h2>
      
      <p className="mb-6 text-muted-foreground break-words">{project.description}</p>
      
      <div className="mb-6">
        <h3 className="text-md md:text-lg font-semibold mb-2 flex items-center gap-1">
          <ChevronRight size={16} className="text-os-accent" />
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech, index) => (
            <span 
              key={index}
              className="bg-muted px-2 py-1 rounded text-sm hover:bg-os-accent hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md md:text-lg font-semibold mb-2 flex items-center gap-1">
          <ChevronRight size={16} className="text-os-accent" />
          Key Features
        </h3>
        <ul className="list-none space-y-2">
          {project.features.map((feature, index) => (
            <li key={index} className="text-sm flex items-start min-w-0">
              <div className="min-w-4 min-h-4 w-4 h-4 mr-2 mt-1 shrink-0 rounded-full bg-os-accent/20 border border-os-accent/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-os-accent"></div>
              </div>
              <span className="min-w-0 break-words">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md md:text-lg font-semibold mb-2 flex items-center gap-1">
          <ChevronRight size={16} className="text-os-accent" />
          Project Preview
        </h3>
        <div className="border border-border rounded-lg p-2 bg-muted/30 overflow-hidden">
          <div className="w-full h-48 sm:h-64 bg-muted flex items-center justify-center rounded group relative overflow-hidden">
            {/* Add image preview with hover effect */}
            <div className="absolute inset-0 bg-os-accent/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-medium">View Project</span>
            </div>
            <span className="text-muted-foreground">Project Screenshot</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {project.github && (
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Github size={16} />
            <span>GitHub Repo</span>
          </a>
        )}
        
        {project.demo && (
          <a 
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-os-accent text-white rounded-lg hover:bg-os-accent-hover transition-colors"
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectsApp = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  const projects: Project[] = [
    {
      id: "khazna",
      title: "Khazna — Treasury Management System (Safka)",
      description:
        "Arabic RTL treasury system for Safka: income/expense tracking, inter-admin transfers, reporting, and read-only integration with Safka merchants, products, and balances.",
      stack: [
        "React",
        "TypeScript",
        "TanStack Query",
        "TanStack Router",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "PM2",
        "Nginx",
      ],
      features: [
        "Role-based treasury with transfers, audit trail, and unified SPA + API deploy",
        "Category engine with parent/child hierarchy and behavior-based validation",
        "Safka MongoDB integration for merchants, products, and balance reconciliation",
        "Multi-merchant payout allocation with server-side validation",
        "Advanced filtering, Cairo timezone reporting, pagination, and CSV export",
        "Production deployment with PM2 and Nginx on a single domain",
      ],
      image: "/placeholder.svg",
    },
    {
      id: "blurr-hr",
      title: "Blurr HR Portal",
      description:
        "Full-stack HR platform with role-based access, payroll, Kanban task management, notifications, and analytics — built as a technical assessment.",
      stack: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Prisma",
        "SQLite",
        "NextAuth.js",
        "Zod",
        "TailwindCSS",
        "shadcn/ui",
      ],
      features: [
        "Admin/Employee RBAC with NextAuth.js and protected Server Actions",
        "Employee CRUD, salary payroll, and monthly payroll generation",
        "Kanban task board with drag-and-drop and task audit history",
        "In-app notifications on task lifecycle events",
        "Role-specific analytics dashboards",
        "Responsive UI with shadcn/ui, Zod validation, and dark mode",
      ],
      demo: "https://drive.google.com/file/d/1d4pskDHbFOsAwFXwllD2eM5DnKAP8tV2/view",
      image: "/placeholder.svg",
    },
    {
      id: "task-manager-rn",
      title: "Task Manager — React Native (Expo)",
      description:
        "Cross-platform task app (iOS, Android, Web) with CRUD, filters, theming, and tests — built for a technical assessment.",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "React Hooks",
        "Jest",
        "React Testing Library",
      ],
      features: [
        "Task CRUD with custom useTasks hook and local state",
        "Reusable component architecture with clear separation of UI, state, and screens",
        "Filters, progress tracking, and dark/light theme with global provider",
        "Cross-platform behavior handling for mobile alerts and web confirmations",
        "Unit tests for core hook logic and UI components",
        "Documented setup and architecture for easy project onboarding",
      ],
      image: "/placeholder.svg",
    },
    {
      id: "admin-panel",
      title: "Admin Panel for Hotel Management",
      description: "Developed an admin panel for managing bookings, cabins, and guest profiles with secure login.",
      stack: ["React", "Supabase", "Styled Components", "React Query"],
      features: [
        "Dynamic tables for cabin management and booking status",
        "Guest check-in and payment processing",
        "Dashboard with key metrics (sales, occupancy, bookings)",
        "Filtering, charts, and customizable app settings",
        "Dark mode for improved user experience"
      ],
      github: "https://github.com/hemdan217/hotel-admin",
      demo: "https://hotel-admin.example.com",
      image: "/placeholder.svg"
    },
    {
      id: "wild-oasis",
      title: "Wild Oasis Hotel Reservation System",
      description: "Full-fledged reservation system allowing guests to view cabin details, check availability, and make bookings.",
      stack: ["Next.js", "Tailwind CSS", "NextAuth", "SSR", "CSR", "Middleware"],
      features: [
        "Secure authentication using NextAuth",
        "Profile management for faster check-ins",
        "Optimized performance with SSR and CSR",
        "Flexible booking management with filtering options",
        "Reservation update and cancellation functionality"
      ],
      github: "https://github.com/hemdan217/wild-oasis",
      demo: "https://wild-oasis.example.com",
      image: "/placeholder.svg"
    },
    {
      id: "mostaql-clone",
      title: "Mostaql Clone Website",
      description: "Feature-rich freelance platform facilitating client registration, project posting, freelancer applications, and contract agreements, with Stripe payment integration.",
      stack: ["Express", "Mongoose", "React", "React Redux", "MUI", "Angular", "MERN", "MEAN"],
      features: [
        "File uploading and real-time chat functionality",
        "Email authentication and localization",
        "Admin dashboard with payment processing",
        "Project management capabilities",
        "Efficient handling of user accounts"
      ],
      github: "https://github.com/hemdan217/mostaql-clone",
      demo: "https://mostaql-clone.example.com",
      image: "/placeholder.svg"
    },
    {
      id: "social-media",
      title: "Social Media App",
      description: "Developed a social media app allowing users to register, login, publish posts, and connect with friends.",
      stack: ["React.js", "React Redux", "Express", "REST API", "Mongoose", "MERN"],
      features: [
        "User registration and authentication",
        "Post creation and interaction",
        "Friend connections and messaging",
        "Optimized performance with best practices",
        "Responsive design for all devices"
      ],
      github: "https://github.com/hemdan217/social-app",
      demo: "https://social-app.example.com",
      image: "/placeholder.svg"
    },
    {
      id: "ecommerce-react",
      title: "E-commerce Website (React)",
      description: "Developed an e-commerce platform with user authentication, cart functionality, and coupon application.",
      stack: ["React.js", "React Redux", "Express", "Mongoose", "MERN"],
      features: [
        "User authentication and profile management",
        "Product catalog with search functionality",
        "Shopping cart and checkout process",
        "Coupon application system",
        "Admin dashboard for product and order management"
      ],
      github: "https://github.com/hemdan217/ecommerce-react",
      demo: "https://ecommerce-react.example.com",
      image: "/placeholder.svg"
    },
    {
      id: "ecommerce-angular",
      title: "E-commerce Website (Angular)",
      description: "Angular version of the e-commerce platform with user authentication, cart functionality, and coupon application.",
      stack: ["Angular", "Guard Route", "Angular Interceptors", "Subject Behavior", "Json Server"],
      features: [
        "User authentication and profile management",
        "Product catalog with search functionality",
        "Shopping cart and checkout process",
        "Coupon application system",
        "Admin dashboard for product and order management"
      ],
      github: "https://github.com/hemdan217/ecommerce-angular",
      demo: "https://ecommerce-angular.example.com",
      image: "/placeholder.svg"
    }
  ];
  
  const selectedProjectData = projects.find(p => p.id === selectedProject) || projects[0];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden -m-4">
      <ResizablePanelGroup 
        direction="horizontal"
        className="flex-1 min-h-0 min-w-0 overflow-hidden rounded-md"
      >
        {/* Project list sidebar */}
        <ResizablePanel 
          defaultSize={28} 
          minSize={22} 
          maxSize={40} 
          className="min-w-0 border-r border-border"
        >
          <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden p-4">
            <div className="mb-4 flex items-center min-w-0">
              <Code size={18} className="mr-2 text-os-accent shrink-0" />
              <h2 className="font-semibold truncate">Projects</h2>
            </div>
            
            <div className="grid gap-3 min-w-0">
              {projects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  isSelected={selectedProject === project.id}
                  onClick={() => setSelectedProject(project.id)}
                />
              ))}
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Project details */}
        <ResizablePanel defaultSize={72} className="min-w-0">
          <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden">
            <ProjectDetail project={selectedProjectData} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProjectsApp;
