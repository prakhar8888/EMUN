EnigmaMUN
=========

EnigmaMUN is a full-stack web platform developed for a real Model United Nations initiative.

The project started with a practical requirement: my brother wanted to build and operate his own MUN initiative and needed a professional digital platform for presenting the organization, its conferences, committees, events, and participant information.

Instead of building only a static website, I decided to develop the project as a complete application with a dedicated frontend, backend API, relational database, authentication, authorization, registration workflows, staff management, validation, security controls, media handling, and a structure that can be extended over time.

The current implementation is focused on the real EnigmaMUN use case. The longer-term direction is to make the underlying architecture reusable enough for other MUN organizers and contributors to adapt it for their own conferences.

Live application:
https://emun-three.vercel.app/

Source code:
https://github.com/prakhar8888/EMUN


Project Background
==================

MUN organizations usually need to manage several different types of information at the same time.

There is public conference information, committee information, event details, delegate registrations, organizational members, staff access, feedback, contact requests, and administrative operations.

These responsibilities are often handled using a mixture of websites, forms, spreadsheets, documents, and communication tools.

EnigmaMUN was built to bring the core application-side workflows into one system.

The project therefore has two related purposes.

The first is practical: provide a working digital platform for an actual MUN initiative.

The second is engineering-focused: build the application using a structure that can be maintained, extended, tested, secured, and eventually reused by other organizations.


What EnigmaMUN Provides
=======================

The current application contains functionality around:

- User authentication
- User account management
- Staff account workflows
- Role-based access control
- Permission-based authorization
- MUN chambers and committees
- Events
- Delegate registrations
- Foundation/team members
- Feedback
- Contact requests
- Password recovery
- Email change workflows
- Public organizational information

The backend exposes these capabilities through a versioned API.

The current API namespace is:

/api/v1

Versioning the API provides a cleaner path for future changes and allows new versions to be introduced without unnecessarily breaking existing clients.


Application Architecture
========================

EnigmaMUN uses a separated full-stack architecture.

The general application flow is:

Frontend
    |
    v
Backend API
    |
    v
Middleware
    |
    v
Controllers
    |
    v
Services
    |
    v
Prisma
    |
    v
PostgreSQL


The frontend is responsible for the user interface, presentation, interaction, and communication with the backend.

The backend is responsible for API behavior, authentication, authorization, validation, business logic, and database operations.

Prisma provides the database access layer.

PostgreSQL provides persistent relational storage.

This separation is intentional. It makes the different parts of the application easier to reason about and reduces the need for business logic to be duplicated between the frontend and backend.


Technology Stack
================

Frontend

Next.js 15
React 19
TypeScript
Tailwind CSS
Framer Motion
Axios
PWA support


Backend

Node.js
Express 5
Prisma
PostgreSQL
JWT
bcryptjs
Joi
Helmet
express-rate-limit
cookie-parser
validator
Cloudinary
Resend


The frontend uses Next.js and React for the application and interface layer.

TypeScript provides static typing.

Tailwind CSS is used for responsive styling.

Framer Motion provides interface animation and interaction effects.

Axios is used for API communication.

The backend is built with Node.js and Express.

Prisma handles communication with PostgreSQL.

JWT is used for authentication.

bcryptjs is used for password hashing.

Joi and other validation utilities are used to validate incoming data.

Helmet and rate limiting provide additional security controls.

Cloudinary is used for media-related functionality, while Resend is used for email delivery.


Repository Structure
====================

The repository is separated into frontend, backend, database, and documentation areas.

EMUN/
|
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


The existing separation is maintained so that frontend concerns, backend concerns, database definitions, and project documentation do not become mixed together.

When adding functionality, the existing structure should be checked first instead of introducing duplicate implementations.


Frontend
========

The frontend is built using Next.js, React, TypeScript, Tailwind CSS and supporting libraries.

The application provides the public-facing experience for EnigmaMUN and communicates with the backend through the centralized API.

The frontend is responsible for:

- Rendering public pages
- Presenting event and committee information
- Providing registration interfaces
- Handling user interaction
- Communicating with protected and public API endpoints
- Displaying application state
- Providing responsive layouts
- Supporting progressive web application functionality

The frontend should not be treated as the security boundary of the application.

Any operation that requires authorization is ultimately enforced by the backend.


Backend
=======

The backend is implemented with Node.js and Express.

The backend contains the application's main business and security logic.

Its responsibilities include:

- API routing
- Authentication
- Authorization
- Request validation
- Business logic
- Database interaction
- Staff management
- Registration workflows
- Error handling
- Security middleware
- External service integration

The backend is organized into routes, controllers, services, middleware, validators, and supporting libraries.

This structure is intended to keep HTTP handling separate from reusable application logic.


Database
========

EnigmaMUN uses PostgreSQL as its relational database and Prisma as its ORM and database access layer.

The primary Prisma schema is located at:

database/prisma/schema.prisma

The database currently models several important concepts used by the application, including users, roles, staff status, events, chambers, registrations, foundation members, feedback, and contact records.

The Prisma schema should remain the main source of truth for the database structure.

Changes to persistent data should be introduced through the normal Prisma migration workflow rather than by maintaining separate or conflicting database definitions.


Users and Roles
===============

The current role model includes:

ADMIN
SECRETARIAT
DELEGATE

The application also uses staff account states:

PENDING
ACTIVE
REVOKED

This allows staff access to be controlled independently of simply having a user account.

A staff member can therefore move through a lifecycle rather than being treated as permanently privileged after account creation.


Permissions
===========

EnigmaMUN also uses more granular permissions for staff functionality.

Examples include permissions for:

- Managing events
- Managing registrations
- Managing committees
- Managing feedback
- Managing contact requests
- Creating staff accounts

This approach avoids making every staff account equally powerful.

A user can be authenticated without necessarily having permission to perform a particular administrative action.


Authentication
==============

Authentication is implemented using JSON Web Tokens.

Protected requests use the standard Bearer token format:

Authorization: Bearer <token>

The authentication middleware verifies the token and establishes the authenticated user context for protected requests.

The application also performs account-state checks where required.

Authentication and authorization are intentionally treated as separate concerns.

Authentication answers:

"Who is this user?"

Authorization answers:

"What is this user allowed to do?"


Authorization Flow
==================

For sensitive operations, the backend considers several pieces of information:

Identity
Role
Permission
Account status

A valid token alone should not be enough to access administrative functionality.

For example, a staff member may be authenticated but lack permission to manage registrations.

Similarly, a revoked staff account should not retain administrative access simply because an authentication token was previously issued.

This server-side authorization model is an important part of the application's security design.


Application Modules
===================

Authentication

The authentication area handles login, current-user access, staff workflows, password recovery, and email-related account operations.

Main API area:

/api/v1/auth


About

Provides organizational and informational content.

Main API area:

/api/v1/about


Chambers

Handles MUN chambers and committee information.

Main API area:

/api/v1/chambers


Events

Handles event-related information and management.

Main API area:

/api/v1/events


Foundation

Handles information about members associated with the organization.

Main API area:

/api/v1/foundation


Feedback

Provides structured feedback functionality.

Main API area:

/api/v1/feedback


Contact

Handles contact and communication requests.

Main API area:

/api/v1/connect


Registrations

Handles delegate registration workflows.

Main API area:

/api/v1/registrations


Registration Status
===================

Registrations currently use the following states:

PENDING
APPROVED
REJECTED

Registration records connect users with chambers and can store information such as portfolio, experience, motivation, status, and timestamps.


Events
======

Events are represented as structured application data rather than being permanently hard-coded into individual frontend pages.

Event information can include:

- Title
- Slug
- Description
- Location
- Date information
- Banner
- Highlight information
- Publication state

This makes event information easier to manage and extend as the application develops.


Chambers
========

Chambers represent the committees used within an MUN conference.

A chamber can contain information such as:

- Name
- Slug
- Agenda
- Description
- Icon
- Background guide
- Publication state

The intention is to keep committee information structured so it can be reused by the public interface and registration system.


Foundation
==========

The foundation section represents members associated with the organization.

Profiles can contain information such as:

- Name
- Role
- Image
- Biography
- Email
- LinkedIn
- Website

The structure is designed to allow the organization's public-facing team information to be managed as application data.


Feedback and Contact
====================

The feedback module provides a structured way to collect participant responses.

Feedback records can include:

- Rating
- Message
- Optional identity information
- Status
- Timestamps

The contact module provides a structured way for users to submit communication requests.

Contact records can include:

- Name
- Email
- Phone
- Designation
- Subject
- Message
- Timestamp


Security
========

Security is treated as an application requirement rather than only a deployment concern.

The current backend includes several security-related controls:

- JWT-based authentication
- Role-based authorization
- Permission-based authorization
- Password hashing
- Request validation
- Helmet security middleware
- Rate limiting
- Environment-based secrets
- Protected administrative routes
- Controlled API errors
- Protected account recovery workflows
- Protected staff-management operations

The frontend is not considered a security boundary.

Administrative permissions are enforced by the backend so that hiding an interface element does not become the only protection for a sensitive operation.


Input Validation
================

User-controlled input should be treated as untrusted.

The backend uses validation libraries and middleware to validate incoming requests before they reach application logic or database operations.

Validation is particularly important for:

- Authentication
- Registration
- Staff management
- Feedback
- Contact forms
- Account recovery
- Email changes
- Administrative operations

The intention is to reject malformed or unexpected input at the application boundary instead of allowing it to propagate deeper into the system.


Secrets and Environment Configuration
=====================================

Sensitive configuration should never be committed to source control.

The backend uses environment variables for configuration such as:

DATABASE_URL
JWT_SECRET
PORT
NODE_ENV

Additional variables may be required for services such as email delivery and media storage.

A local environment file can be created inside the backend directory.

Example:

backend/.env

Production credentials, database passwords, API keys, JWT secrets, email credentials, and cloud-service credentials must remain outside the repository.


Local Development
=================

Requirements

The project requires:

- Node.js
- npm
- PostgreSQL
- Git


Clone the repository:

git clone https://github.com/prakhar8888/EMUN.git

cd EMUN


Frontend

cd frontend

npm install

npm run dev


Production frontend build:

npm run build

npm start


Backend

Open a separate terminal:

cd backend

npm install

npm run dev


Production backend:

npm start


Prisma
======

Generate Prisma Client:

npm run generate


Run development migrations:

npm run migrate


Open Prisma Studio:

npm run studio


These commands should be executed from the backend directory where the Prisma-related project configuration is available.


Development Principles
======================

The project follows several practical engineering principles.

Keep responsibilities separated.

Frontend presentation should not become the location for backend business rules.

Reuse existing services and middleware when possible.

Avoid implementing the same business rule in multiple places.

Validate user input at the application boundary.

Keep database changes explicit.

Keep secrets outside source control.

Protect sensitive operations at the backend.

Prefer small, understandable changes over unnecessary architectural rewrites.

Document decisions that would otherwise be difficult for future contributors to understand.


AI-Assisted Development
=======================

AI coding tools are used as development assistants during the development of EnigmaMUN.

They can help with activities such as:

- Exploring unfamiliar code
- Debugging
- Drafting implementations
- Refactoring
- Documentation
- Test generation
- Identifying possible edge cases

AI-generated code is still reviewed before being treated as part of the application.

An AI coding assistant working on the repository should first inspect the existing implementation and understand:

- Frontend structure
- Backend structure
- API routes
- Middleware
- Services
- Validators
- Prisma schema
- Authentication
- Authorization
- Existing data relationships

Before creating new code, it should check whether an existing implementation can be extended.

The preferred approach is to work with the existing architecture rather than creating duplicate routes, models, services, or business logic.

Security-sensitive changes should receive additional review and testing.


Testing
=======

Automated testing is an area of ongoing development.

The highest-priority areas include authentication, authorization, registrations, staff management, account recovery, validation, database constraints, and API error handling.

Important authentication tests include:

- Successful login
- Invalid credentials
- Invalid tokens
- Expired tokens
- Protected route access

Authorization tests include:

- Unauthorized roles
- Missing permissions
- Revoked staff accounts
- Administrative operations

Registration tests include:

- Valid registration
- Invalid registration data
- Duplicate registration cases
- Status changes

Staff tests include:

- Staff creation
- Approval
- Revocation
- Permission enforcement

Account recovery tests include:

- Password reset
- OTP verification
- Invalid OTP
- Expired OTP
- Email change

The longer-term testing structure is expected to include unit tests, service tests, API/integration tests, authentication tests, authorization tests, and end-to-end tests.


Deployment
==========

The frontend is currently deployed publicly.

Live application:

https://emun-three.vercel.app/

The backend is designed to operate as a separate Node.js and Express application connected to PostgreSQL.

Production environments should keep the following concerns separated:

Frontend
Backend
Database
Secrets
External Services

Production credentials should never be reused from local development configuration.


Open Source Direction
=====================

EnigmaMUN began as a real-world project for a specific MUN initiative.

The longer-term direction is to make the underlying application useful beyond that original use case.

For that to happen, the repository needs to become easier for other developers to understand, run, modify, test, secure, and contribute to.

Planned improvements include:

- Formal licensing
- Contributor documentation
- Security documentation
- Architecture documentation
- API documentation
- Automated testing
- Continuous integration
- Dependency scanning
- Security scanning
- Issue templates
- Pull request templates
- Developer onboarding
- Reusable configuration
- Stable release practices


Contribution Workflow
=====================

The intended contribution process is:

Issue or Feature Discussion
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

Suggested branch names include:

feature/<name>
fix/<name>
security/<name>
docs/<name>
refactor/<name>
test/<name>

Example commit messages:

feat: add committee management endpoint

fix: handle invalid registration payload

security: tighten staff authorization

test: add authentication integration tests

docs: document local development setup

refactor: centralize API error handling


Security Reporting
==================

Security issues should be handled responsibly.

Sensitive vulnerability information, credentials, tokens, private keys, database passwords, or other secrets should not be posted publicly.

A formal SECURITY.md and private vulnerability-reporting workflow are part of the project's ongoing open-source development.


Roadmap
=======

Application

- Complete the administrative dashboard
- Improve role management
- Improve permission management
- Improve registration management
- Add analytics
- Improve notification workflows
- Improve administrative auditability


Engineering

- Increase automated test coverage
- Add continuous integration
- Improve API documentation
- Improve error handling
- Add dependency scanning
- Add security scanning
- Improve production hardening
- Improve logging and observability


Open Source

- Add formal license documentation
- Improve contributor documentation
- Add SECURITY.md
- Add issue templates
- Add pull request templates
- Document the architecture
- Document API behavior
- Improve contributor onboarding
- Establish release and versioning practices
- Encourage genuine external contributions


Reusability
===========

Although EnigmaMUN was initially built for one MUN initiative, the main application concepts are not limited to a single conference.

The underlying model contains concepts that are common across many MUN organizations:

- Users
- Delegates
- Staff
- Committees
- Events
- Registrations
- Organizational members
- Feedback
- Contact requests

The long-term goal is to make more of these elements configurable so that adapting the application for another organization does not require rewriting the entire system.

This is one of the reasons the project is being developed as a structured application rather than as a collection of static pages.


Current Status
==============

EnigmaMUN is an actively developed full-stack application with a public repository and a live deployment.

The project should currently be considered an early-stage application that is being progressively improved.

The current development focus is on strengthening the engineering foundation, improving documentation, increasing test coverage, hardening security, completing administrative functionality, and making the repository easier for future contributors to understand.

The intended progression is:

Real-world application
    |
    v
Better documentation
    |
    v
Stronger testing
    |
    v
Stronger security
    |
    v
Better contributor experience
    |
    v
Reusable open-source platform


Known Limitations
=================

The project is still evolving.

Areas that require further work include:

- Automated test coverage
- Administrative functionality
- CI/CD automation
- Security hardening
- API documentation
- Observability
- Contributor documentation
- Open-source contribution workflows
- Reusable configuration

These limitations are documented intentionally.

The project is not presented as a mature or widely adopted platform. The purpose of this repository is to document the actual engineering work, provide a working foundation, and continue improving the application through future development and contributions.


Maintainer
==========

Prakhar Gupta

GitHub:
https://github.com/prakhar8888

Repository:
https://github.com/prakhar8888/EMUN


License
=======

The project is intended to use the MIT License.

The appropriate LICENSE file should be present in the repository before the project is represented as formally licensed under MIT.


Acknowledgements
================

EnigmaMUN was created around a real Model United Nations initiative and developed as both a practical platform and an opportunity to build and maintain a complete full-stack application.

The project focuses on practical engineering, maintainable architecture, security-conscious development, clear documentation, and responsible use of AI-assisted development.

The long-term objective is to move the project from a single real-world implementation toward a reusable platform that MUN organizers and developers can understand, adapt, improve, and contribute to.