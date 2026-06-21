import { FileText, ChevronRight, Download } from "lucide-react";

const ResumeApp = () => {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-8 h-8 mr-3 text-os-accent" />
            <h1 className="text-2xl font-bold">Hemdan Khalifa - Resume</h1>
          </div>
          <a
            href="/Hemdan_Khalifa_2026.pdf"
            download="Hemdan_Khalifa_2026.pdf"
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Download size={14} />
            Download PDF
          </a>
        </div>

        {/* Profile Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-border pb-2 mb-4 text-os-accent">
            Profile
          </h2>
          <p className="mb-4">
            Experienced JavaScript Developer with a strong track record in
            designing and implementing applications. Skilled in React, Angular,
            Node.js, modern frameworks, backend services, and scalable
            solutions. Seeking a role where I can build high-performance
            applications and contribute to innovative projects.
          </p>
        </section>

        {/* Experience Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-border pb-2 mb-4 text-os-accent">
            Experience
          </h2>

          {/* Nexventures with nested projects */}
          <div className="mb-8 border border-border rounded-lg p-5 hover:bg-muted/10 transition-colors">
            <div>
              <h3 className="font-semibold text-lg text-os-accent">
                Nexventures SA
              </h3>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Front-End Developer</span>
                <span className="text-muted-foreground">
                  Sep 2023 - Jun 2026
                </span>
              </div>
              <p className="text-sm mb-3 text-muted-foreground">Switzerland</p>
            </div>

            <div className="mt-4 border-t border-border/40 pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Projects:
              </p>

              <div className="pl-4 mb-6 ml-2 border-l-2 border-os-accent/70">
                <div className="flex items-center mb-1">
                  <ChevronRight className="w-4 h-4 text-os-accent mr-1" />
                  <h4 className="font-medium text-sm">Tapgo (Angular)</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2 ml-5">
                  Restaurant POS System
                </p>
                <ul className="ml-5 space-y-1 text-xs list-disc list-outside">
                  <li>
                    Contributed to upgrades and maintenance of POS software for
                    restaurants
                  </li>
                  <li>
                    Enhanced online ordering, QR solutions, and Kiosk systems
                  </li>
                  <li>
                    Played a key role in bug fixing and optimizing the admin
                    portal
                  </li>
                </ul>
              </div>

              <div className="pl-4 ml-2 border-l-2 border-os-accent/70">
                <div className="flex items-center mb-1">
                  <ChevronRight className="w-4 h-4 text-os-accent mr-1" />
                  <h4 className="font-medium text-sm">Propyz (React)</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2 ml-5">
                  Real Estate ERP System
                </p>
                <ul className="ml-5 space-y-1 text-xs list-disc list-outside">
                  <li>
                    Contributed to developing an ERP system for real estate
                    management
                  </li>
                  <li>
                    Played a key role in system architecture and tech-stack
                    decisions
                  </li>
                  <li>
                    Developed real-time chat, ticketing, and voting modules
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6 border border-border rounded-lg p-5 hover:bg-muted/10 transition-colors">
            <h3 className="font-semibold text-os-accent">Safka</h3>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Full-Stack Developer</span>
              <span className="text-muted-foreground">Mar 2023 - Mar 2026</span>
            </div>
            <p className="text-sm mb-2 text-muted-foreground">
              Part Time, Remote, Egypt
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Built and maintained an affiliate and e-commerce operations
                platform serving admins, marketers, and merchants
              </li>
              <li>
                Designed a multi-line WhatsApp platform integrating EasyConfirm
                and Meta WhatsApp API with unified inboxes and encrypted
                credentials
              </li>
              <li>
                Developed a Public API for third-party integrations using API-key
                authentication
              </li>
              <li>
                Built analytics and reporting systems covering marketer
                performance, conversion rates, inventory, and financial KPIs
              </li>
              <li>
                Engineered inventory and supplier management modules with stock
                automation, supplier ledgers, and low-stock alerts
              </li>
              <li>
                Implemented RBAC, audit logging, employee activity tracking, and
                secure integration management
              </li>
              <li>
                Delivered integrations with Shopify, EasyOrders, LightFunnels,
                and shipping providers through webhook-driven architectures
              </li>
            </ul>
          </div>

          <div className="mb-6 border border-border rounded-lg p-5 hover:bg-muted/10 transition-colors">
            <h3 className="font-semibold text-os-accent">
              Software Engineer (Freelance)
            </h3>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Various Clients</span>
              <span className="text-muted-foreground">Jan 2021 - May 2025</span>
            </div>
            <p className="text-sm mb-2 text-muted-foreground">Remote</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Delivered 50+ projects with 98% Job Success Score</li>
              <li>
                Specialized in web development, data science, and web scraping
              </li>
              <li>Managed end-to-end project execution across platforms</li>
              <li>Built long-term client relationships through quality work</li>
            </ul>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-border pb-2 mb-4 text-os-accent">
            Projects
          </h2>

          <div className="mb-4 border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
            <h3 className="font-semibold text-os-accent mb-2">
              Khazna — Treasury Management System (Safka Integration)
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Built role-based treasury system for income, expenses,
                transfers, and audit tracking
              </li>
              <li>
                Designed category-driven financial engine with parent-child
                hierarchy and behavior-based rules
              </li>
              <li>
                Integrated Safka production MongoDB for merchants, products, and
                balance reconciliation
              </li>
              <li>
                Implemented multi-merchant payout splitting with server-side
                validation
              </li>
              <li>
                Developed reporting with advanced filtering, pagination, and
                Cairo timezone aggregates
              </li>
            </ul>
          </div>

          <div className="mb-4 border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
            <h3 className="font-semibold text-os-accent mb-2">
              Blurr HR Portal
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Full-stack HR platform with RBAC, payroll, Kanban tasks, and
              analytics (technical assessment)
            </p>
          </div>

          <div className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
            <h3 className="font-semibold text-os-accent mb-2">
              Task Manager — React Native (Expo)
            </h3>
            <p className="text-sm text-muted-foreground">
              Cross-platform task app with CRUD, filters, theming, and tests
              (technical assessment)
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-border pb-2 mb-4 text-os-accent">
            Education
          </h2>

          <div className="mb-4 border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
            <h3 className="font-semibold text-os-accent">
              ITI 3-Months Intensive MEARN Stack Bootcamp
            </h3>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">
                Information Technology Institute
              </span>
              <span className="text-muted-foreground">Mar 2023 - Jul 2023</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Gained hands-on experience with MongoDB, Express, Angular, React,
              and Node.js. Developed proficiency in building robust and scalable
              web applications.
            </p>
          </div>

          <div className="mb-4 border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
            <h3 className="font-semibold text-os-accent">
              Bachelor's Degree in Computer Engineering
            </h3>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">
                Kafr El-Sheikh University, Faculty of Engineering
              </span>
              <span className="text-muted-foreground">Sep 2016 - Jul 2021</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Proficient in programming languages including C++, JavaScript, and
              Python, with strong foundation in algorithms, data structures,
              computer networks, and software engineering.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-border pb-2 mb-4 text-os-accent">
            Skills
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
              <h3 className="font-semibold mb-2 text-os-accent">
                Frontend Development
              </h3>
              <p className="text-sm mb-3">
                Proficient in front-end development technologies such as HTML,
                CSS, Bootstrap, Sass, JavaScript, jQuery, Angular and React with
                experience building responsive and user-friendly web
                applications.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
              <h3 className="font-semibold mb-2 text-os-accent">
                Backend Development
              </h3>
              <p className="text-sm mb-3">
                Experienced in back-end technologies including Node.js,
                Express.js, REST API, SQL & PostgreSQL, MongoDB & Mongoose, and
                authentication & security.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
              <h3 className="font-semibold mb-2 text-os-accent">
                Other Skills
              </h3>
              <p className="text-sm">
                Skilled in using TypeScript and Jasmine Unit Testing, with a
                strong focus on developing high-quality and scalable web
                applications. Interested in Next.js, Nest.js, GraphQL, and AWS.
                Extensive experience in Python programming and machine learning,
                with a focus on developing and implementing deep learning
                models.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications & Courses Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-border pb-2 mb-4 text-os-accent">
            Certifications & Courses
          </h2>

          <div className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
            <ul className="list-disc list-inside space-y-2">
              <li className="text-sm">
                Full Stack JavaScript Developer Nanodegree - Udacity
              </li>
              <li className="text-sm">
                The Complete JavaScript Course: From Zero to Expert - Udemy
              </li>
              <li className="text-sm">
                The Complete Web Development Bootcamp - Udemy
              </li>
              <li className="text-sm">
                React - The Complete Guide (incl Hooks, React Router, Redux) -
                Udemy
              </li>
              <li className="text-sm">
                Node.js, Express, MongoDB & More: The Complete Bootcamp - Udemy
              </li>
            </ul>
          </div>
        </section>

        {/* Contact Information Section */}
        <section>
          <h2 className="text-xl font-semibold border-b border-border pb-2 mb-4 text-os-accent">
            Contact Information
          </h2>

          <div className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors space-y-2 text-sm">
            <p>Email: hemdan219@gmail.com</p>
            <p>Phone: +201090188616</p>
            <p>GitHub: hemdan217</p>
            <p>LinkedIn: hemdan-khalifa</p>
            <p>Location: Kafr El-Sheikh, Egypt</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeApp;
