# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Employers hiring across tech: engineering, software, cloud and cybersecurity. They are recruiters and hiring managers deciding, usually in a few minutes, whether Adeeb is worth an interview. Their job is to judge real capability from the evidence on the site, then reach the resume or a contact channel.

Secondary audience: peers and learners who come to the blog for its technical explainers and lab walkthroughs.

## Product Purpose

A personal portfolio and technical blog for Adeeb Nizar. It shows hands-on work across engineering (solar and powerline design), electronics, cybersecurity, AI, software and cloud/DevOps through documented projects, lab writeups and interactive explainers.

Success: a hiring visitor leaves convinced that Adeeb builds and documents real things across disciplines, and acts on it by downloading the resume or connecting via LinkedIn or GitHub.

## Positioning

Generalist by design. The breadth is the pitch, not a detour. What sets the site apart is that the learning is *shown*: working terminal simulations of real lab sessions, animated explainers built from first principles, and completed lab projects documented end to end, backed by a professional engineering background in utility and renewable-energy design.

## Operating Context

- Visitors arrive from a resume, LinkedIn or job application, on desktop or mobile, and skim before they read.
- Projects are evaluated by their writeups: tools used, environment, method, findings and screenshots.
- Blog content is organized into series (Virtualization Lab, NIST, Network Security, Electronics, AI & Technology).

## Capabilities and Constraints

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Existing codebase; no stack decision pending.
- Routes: home (`app/page.tsx`), projects index and detail pages (`app/projects/`), blog index, series and articles (`app/blog/`).
- Interactive explainers and simulations are a core differentiator and must be preserved: `components/labs/InteractiveTerminal.tsx` (terminal replays, profiles in `app/projects/reconnaissance-lab/terminalProfiles.ts`) and `components/visualizations/TransistorAnimation.tsx`.
- Every offensive-security activity is framed as authorized work inside a controlled, isolated lab (VMware/VirtualBox, Kali, Metasploitable). Future copy must keep that framing.
- Project statuses in use: Featured, Interactive, Active, Growing, In Progress, Coming Soon, Completed. Git Learning Hub and Cloud & DevOps have no pages yet (`href: "#"`).

## Brand Commitments

- Name: Adeeb Nizar. Self-description in use: "Engineer & Technology Enthusiast".
- Voice: first person, plain, technical and factual. It describes what was built and learned without overclaiming expertise.
- Assets: portrait cutout `public/adeeb-cutout.png`, signature component on the homepage.

## Evidence on Hand

- Completed project writeups: Reconnaissance Lab, Cybersecurity Lab Environment & Linux Foundations, Flow-Based Intrusion Detection Lab, Digital Forensics Investigation & Evidence Analysis, Encrypted Network Communication & Traffic Analysis.
- Lab screenshots: `public/projects/` and `public/projects/reconnaissance-lab/`.
- Articles: VMware security lab setup series (Windows 10, Windows Server 2022, Kali, Metasploitable), NIST CSF 2.0 GOVERN, Introduction to Information & Network Security, How Transistors Work (with photos page).
- Resume: `public/resume.pdf`. LinkedIn: linkedin.com/in/adeebnizar. The GitHub link in the contact section is still a placeholder (`YOUR-GITHUB-USERNAME`).
- None of these exist and none may be invented: testimonials, employer or client names, certifications, metrics or job titles beyond what the resume states.

## Product Principles

1. **Show, don't claim.** Every capability on the site should point to a project, article or interactive piece that demonstrates it.
2. **Breadth with a through-line.** Present the disciplines as one way of thinking about systems, not as a scattered list of interests.
3. **Respect the skim.** Hiring visitors decide fast, so the evidence and the route to the resume or contact must be reachable without digging.
4. **Honest about stage.** Mark work as in progress or coming soon where it is; never inflate seniority or results.
5. **Ethical by default.** Security work is always presented as authorized, controlled-lab practice.
