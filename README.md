EnigmaMUN
========

A full-stack web platform built for a real Model United Nations initiative, designed to manage conference information, user accounts, registrations, committees, organizational members, feedback, and contact workflows through a structured web application.

Live Application
----------------

https://emun-three.vercel.app/

Repository
----------

https://github.com/prakhar8888/EMUN

Project Overview
----------------

EnigmaMUN is a full-stack web platform created for a real MUN initiative.

The project began as a platform for a specific MUN organization and is being developed toward a reusable and maintainable foundation that can support common workflows used by Model United Nations organizations.

The application separates frontend presentation, backend API logic, authentication, authorization, validation, database access, and project documentation into dedicated areas.

The current implementation focuses on establishing a reliable engineering foundation while continuing development of administrative functionality, testing, documentation, security hardening, and contributor workflows.

Current Functionality
---------------------

The platform currently includes functionality for:

- User authentication and account management
- Staff account management
- Role-based access control
- Permission-based authorization
- Public conference information
- MUN events
- MUN chambers and committees
- Delegate registrations
- Foundation and organizational members
- Feedback collection
- Contact requests
- Password reset workflows
- Email change workflows
- Protected administrative operations
- Media handling
- Email delivery
- REST API endpoints under `/api/v1`

The application is designed so that public-facing functionality and protected organizational operations can be handled through the same backend architecture.

Technology Stack
----------------

Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- Progressive Web App support

Backend

- Node.js
- Express 5
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcryptjs
- Joi validation
- Helmet
- express-rate-limit
- cookie-parser
- validator

External Services

- Cloudinary for media-related functionality
- Resend for transactional email delivery

Architecture
------------

The application follows a layered full-stack architecture:

```text
User
  |
  v
Next.js / React Frontend
  |
  v
REST API
  |
  v
Express Middleware
  |
  +--> Authentication
  |
  +--> Authorization
  |
  +--> Validation
  |
  +--> Rate Limiting
  |
  v
Controllers
  |
  v
Services
  |
  v
Prisma ORM
  |
  v
PostgreSQL
```

The separation allows application concerns to remain isolated instead of placing authentication, business logic, database access, and HTTP handling inside the same modules.

Repository Structure
--------------------

The repository is organized into separate frontend, backend, database, and documentation areas.

```text
EMUN/
│
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   └── ...
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── middleware/
│       ├── validators/
│       ├── lib/
│       └── server.js
│
├── database/
│   └── prisma/
│       └── schema.prisma
│
├── docs/
│
├── .gitignore
└── README.md
```

The existing separation is intentional. Frontend concerns, backend concerns, database definitions, and project documentation are kept independent so that changes in one area do not unnecessarily mix with another.

API Structure
-------------

The backend exposes versioned REST API routes under:

```text
/api/v1
```

Current API areas include:

```text
/api/v1/auth
/api/v1/about
/api/v1/chambers
/api/v1/events
/api/v1/foundation
/api/v1/feedback
/api/v1/connect
/api/v1/registrations
```

Authentication and Authorization
--------------------------------

Authentication and authorization are separated into multiple layers.

The application uses:

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Permission-based authorization
- Protected administrative routes
- Staff account status management
- Request validation
- Controlled authentication and account recovery workflows

Current application roles include:

```text
ADMIN
SECRETARIAT
DELEGATE
```

Staff accounts can also have operational states:

```text
PENDING
ACTIVE
REVOKED
```

Permissions are used to control access to specific organizational operations instead of relying only on broad role checks.

Examples include permissions for:

- Managing events
- Managing registrations
- Managing committees
- Managing feedback
- Managing contact requests
- Creating staff accounts

Database Model
--------------

PostgreSQL is used as the primary relational database and Prisma is used as the ORM.

The database schema contains entities covering areas such as:

- Users
- Roles
- Staff status
- Events
- Chambers
- Registrations
- Foundation members
- Feedback
- Contact records

The schema is maintained through Prisma.

The main schema definition is located at:

```text
database/prisma/schema.prisma
```

Events
------

Events can contain information such as:

- Title
- Slug
- Description
- Location
- Event dates
- Banner media
- Highlight information
- Publication state

The event structure is intended to support both public conference information and future administrative management.

Chambers and Committees
-----------------------

MUN chambers can contain:

- Name
- Slug
- Agenda
- Description
- Icon
- Background guide
- Publication state

The structure is intended to support different committees and conference configurations without requiring the frontend to hard-code individual conference data.

Registrations
-------------

Delegate registration functionality is integrated into the application and connected to the backend data model.

Registration workflows include statuses such as:

```text
PENDING
APPROVED
REJECTED
```

This allows registration records to move through a controlled administrative workflow rather than remaining as simple unstructured submissions.

Foundation and Organizational Members
--------------------------------------

Foundation members can include:

- Name
- Role
- Image
- Biography
- Email
- LinkedIn
- Website

This provides a structured way to represent the people responsible for the organization.

Feedback
--------

The feedback system supports:

- Optional user identity
- Ratings
- Messages
- Status
- Timestamps

Feedback is stored through the backend and can be managed through protected organizational functionality.

Contact Requests
----------------

The contact system supports structured requests containing information such as:

- Name
- Email
- Phone
- Designation
- Subject
- Message
- Timestamp

This provides a central workflow for handling requests submitted through the public application.

Security
--------

Security is treated as an important part of the application architecture.

Current security-related controls include:

- JWT authentication
- Password hashing
- Role-based access control
- Permission-based authorization
- Request validation
- Helmet security headers
- API rate limiting
- Environment-based secret management
- Protected administrative routes
- Controlled API error responses
- Protected account recovery workflows
- Protected staff management operations
- Database constraints through Prisma and PostgreSQL

Sensitive credentials and environment variables are not intended to be committed to the repository.

Environment variables should be configured through local environment files or the deployment platform's secret management system.

AI-Assisted Development
-----------------------

AI coding tools are used during development as development assistants.

Generated suggestions are reviewed and adapted before being incorporated into the project. Security-sensitive areas such as authentication, authorization, validation, account recovery, database operations, and API behavior require particular review rather than blindly accepting generated code.

AI assistance is treated as part of the development workflow, not as a replacement for engineering review or project ownership.

Development Setup
-----------------

Prerequisites

Install the following before starting development:

- Node.js
- npm
- PostgreSQL
- Git

Clone the repository:

```bash
git clone https://github.com/prakhar8888/EMUN.git
cd EMUN
```

Frontend

Move into the frontend directory:

```bash
cd frontend
npm install
```

Configure the required frontend environment variables according to the application's configuration.

Start the development server:

```bash
npm run dev
```

Backend

Move into the backend directory:

```bash
cd backend
npm install
```

Configure the required backend environment variables, including the database connection and required service credentials.

Start the backend:

```bash
npm run dev
```

Database

The project uses PostgreSQL through Prisma.

After configuring the database connection, Prisma can be used for database operations and schema management according to the project's development workflow.

Production Deployment
---------------------

The frontend is currently deployed through Vercel.

Live application:

https://emun-three.vercel.app/

The backend is deployed separately as a Node.js/Express service and connects to the PostgreSQL database.

The deployment architecture therefore separates the frontend application from the backend API and database layer.

Development and Deployment Principles
--------------------------------------

The project follows several principles:

- Keep frontend and backend responsibilities separate.
- Keep database access behind a dedicated ORM layer.
- Validate incoming API data.
- Protect administrative functionality.
- Keep secrets outside the repository.
- Prefer reusable application components over hard-coded conference data.
- Document architectural decisions and project behavior.
- Review security-sensitive changes carefully.
- Keep the repository structure understandable for future contributors.

Testing
-------

Automated testing is an ongoing area of development.

Testing priorities include:

- Authentication
- Authorization
- Registration workflows
- Staff management
- Account recovery
- Request validation
- Database constraints
- API error handling
- Permission enforcement
- Security-sensitive endpoints

The project is being developed toward broader automated test coverage as additional functionality becomes stable.

Contribution Workflow
---------------------

The intended contribution workflow is:

```text
Issue / Feature Discussion
          |
          v
       Fork
          |
          v
   Feature Branch
          |
          v
   Implementation
          |
          v
      Testing
          |
          v
   Pull Request
          |
          v
       Review
          |
          v
        Merge
```

Suggested branch naming:

```text
feature/<name>
fix/<name>
security/<name>
docs/<name>
refactor/<name>
test/<name>
```

Example commit messages:

```text
feat: add committee management workflow
fix: validate registration payload
security: restrict staff management endpoint
docs: improve API documentation
test: add authentication coverage
```

Open Source Direction
---------------------

EnigmaMUN is being developed with the intention of becoming a maintainable open-source project rather than remaining only a one-off application.

Future open-source improvements include:

- Formal contributor documentation
- Security documentation
- Architecture documentation
- API documentation
- Automated testing
- Continuous integration
- Dependency and security scanning
- Issue templates
- Pull request templates
- Contributor onboarding
- Reusable configuration
- Stable release practices
- Improved observability
- Better production hardening
- Clear project governance

The long-term goal is to make the codebase understandable and useful to contributors who did not originally build the application.

Reusability
-----------

Although the project originated from a specific MUN initiative, many of its concepts are reusable across other conference organizations.

Examples include:

- Users
- Delegates
- Staff
- Committees
- Events
- Registrations
- Organizational members
- Feedback
- Contact requests
- Role-based administration

The application therefore provides a foundation that can potentially be adapted to different MUN organizations without rebuilding the entire platform from scratch.

Roadmap
-------

The project is actively evolving.

Planned and ongoing areas include:

- Administrative dashboard
- Improved role and permission management
- Registration management improvements
- Analytics
- Email notifications
- Auditability
- Expanded automated tests
- Continuous integration
- API documentation
- Improved API error handling
- Dependency and security scanning
- Production hardening
- Logging and observability
- Formal contributor documentation
- Issue templates
- Pull request templates
- Architecture documentation
- Contributor onboarding
- Release and versioning practices

The roadmap may change as real project requirements and contributor feedback develop.

Known Limitations
-----------------

EnigmaMUN is an actively developed project and should not be considered a finished enterprise platform.

Some areas are still being improved, including:

- Automated test coverage
- Administrative tooling
- Documentation depth
- Observability
- CI automation
- Security hardening
- Contributor workflows
- Production operational tooling

These limitations are intentionally documented rather than presented as completed functionality.

Project Status
--------------

EnigmaMUN is an early-stage, actively developed full-stack application with:

- A public GitHub repository
- A deployed frontend
- A structured backend API
- A PostgreSQL data layer
- Authentication and authorization
- MUN-specific application workflows
- Security controls
- Ongoing documentation
- An open-source development direction

The current focus is on strengthening the engineering foundation, expanding administrative functionality, improving testing and security, and making the project easier for future contributors to understand and extend.

Maintainer
----------

Prakhar Gupta

GitHub:

https://github.com/prakhar8888

License
-------

The project is intended to use the MIT License.

The repository should contain the formal `LICENSE` file before the project is represented as officially licensed under MIT.

Security Reporting
------------------

Security vulnerabilities, credentials, tokens, or other sensitive information should not be disclosed publicly through normal GitHub issues or pull requests.

A formal `SECURITY.md` policy and private vulnerability reporting workflow are planned as part of the project's open-source hardening.

Acknowledgements
----------------

EnigmaMUN was developed as a real-world MUN platform and as a practical full-stack engineering project.

The project focuses on:

- Real application requirements
- Maintainable architecture
- Security-conscious development
- Structured backend design
- Clear documentation
- Responsible use of AI-assisted development
- Future contributor accessibility