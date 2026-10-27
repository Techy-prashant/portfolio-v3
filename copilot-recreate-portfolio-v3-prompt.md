# Copilot Prompt: Build the Adniko PR and Marketing Agency Website

You are GitHub Copilot acting as a senior product engineer. Build a complete, production-ready website for Adniko PR and Marketing Agency from scratch using the instructions below. Treat this document as the only source of truth. Do not ask for extra context. Do not assume access to any previous portfolio code.

## Project Brief

Build a website for an agency whose core promise is professional, contract-based reliability in PR, marketing, digital campaigns, and creative execution.

The digital experience must mirror that promise:

- clean
- high-end
- bold
- confident
- structured
- conversion-focused

The design language should be brutalist-inspired but refined. Use stark contrast, strong typography, disciplined spacing, and a premium editorial feel. The website should feel like an agency product, not a personal portfolio.

## Primary Goal

Deliver a modern agency website that:

- establishes trust quickly
- clearly explains services
- shows credibility through proof and outcomes
- encourages enquiries and consultation bookings
- feels distinct from a generic marketing agency template

## Non-Negotiable Requirements

- Build with the exact stack listed below.
- Keep the same app router architecture.
- Keep the same file structure below.
- Keep the same dependency family below.
- Use TypeScript everywhere.
- Use Tailwind CSS for styling.
- Use Framer Motion for interaction and motion.
- Keep the contact and notify routes.
- Keep a local chatbot widget that reads from `src/data/content.ts`.
- Keep the site responsive and fast.
- Keep content data-driven.
- Do not introduce unnecessary libraries.

## Exact Stack To Use

Use these technologies and packages:

- Next.js 14.2.0
- React 18
- React DOM 18
- TypeScript 5
- Tailwind CSS 3.4
- PostCSS
- Autoprefixer
- Framer Motion
- lucide-react
- resend
- googleapis
- uuid
- Playwright
- @playwright/test

## Required File Structure

Recreate this structure exactly:

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
    api/
      contact/route.ts
      notify/route.ts
      notify/verify/[token]/route.ts
  components/
    layout/
      Navbar.tsx
    sections/
      About.tsx
      Contact.tsx
      Experience.tsx
      Hero.tsx
      Projects.tsx
      Skills.tsx
    ui/
      ChatbotWidget.tsx
      CustomCursor.tsx
      LoadingScreen.tsx
      NotifyModal.tsx
      ProgressBar.tsx
      ProjectCard.tsx
  data/
    content.ts
  lib/
```

You may add small helper files only if they are necessary, but keep them close to the feature they support.

## Site Structure

The homepage should be built from these major sections in this order:

1. Hero
2. About
3. Experience
4. Skills / Services
5. Projects / Case Studies
6. Contact

Keep the structure modular and easy to edit.

## Content Strategy

All visible page content must be driven from `src/data/content.ts`.

Use these data groups:

- `agencyInfo`
- `heroContent`
- `aboutContent`
- `servicesData`
- `experienceData`
- `projectsData`
- `achievementsData`
- `testimonialsData`
- `socialLinks`
- `buttonLinks`

Define the data clearly and make each section consume only the fields it needs.

### Suggested content intent

- `agencyInfo`: brand name, location, contact details, service positioning, core value proposition
- `heroContent`: bold headline, subheadline, primary CTA, secondary CTA
- `aboutContent`: agency story, approach, process, credibility narrative
- `servicesData`: key service pillars such as PR strategy, brand campaigns, content production, social media, performance marketing, media relations
- `experienceData`: previous work, retained clients, major campaigns, leadership experience, collaborations
- `projectsData`: case studies with problem, approach, outcome, and links
- `achievementsData`: awards, milestones, major metrics, recognitions
- `testimonialsData`: short credibility quotes from clients or collaborators
- `socialLinks`: website, email, Instagram, LinkedIn, WhatsApp, etc.
- `buttonLinks`: contact CTA, consultation CTA, portfolio/case study CTA, calendar CTA if needed

## Brand Voice

The writing style should be:

- concise
- confident
- premium
- direct
- agency-like

Avoid casual or overly playful copy. The tone should sound like a serious commercial agency that works with clients on contracts, campaigns, and measurable outcomes.

## Design Direction

Use a clean, high-end brutalist-inspired aesthetic with a refined agency finish.

Design principles:

- strong typography hierarchy
- sharp contrast between light and dark surfaces
- bold section headers
- structured layouts
- generous whitespace where needed
- crisp card edges or purposeful angular accents
- restrained motion
- premium-feeling hover states

Avoid generic marketing-site visuals.

### Visual style guidance

- Use a limited palette with one dominant dark tone, one strong neutral, and one vivid accent.
- Build emphasis through contrast instead of decoration.
- Use oversized headlines and compact body text.
- Prefer intentional asymmetry over overly symmetric templates.
- Keep visuals editorial and sharp.
- Make the mobile version feel designed, not compressed.

## Page-Level Behavior

### Hero

The hero must immediately communicate:

- PR, Marketing ad's and commercial
- the agency works professionally and on contract
- the agency handles brand visibility, campaigns, and communication execution
- the agency is premium and reliable

Include:

- a strong headline
- a supporting subheadline
- 2 clear CTA buttons
- a credibility strip or trust markers
- optional featured metrics or service tags

### About

The about section should explain:

- who Adniko is
- what the agency does
- how it works
- why clients should trust it

This section should feel like a firm, strategic introduction rather than a long paragraph block.

### Services / Skills

Show the agency’s service pillars clearly. Present them in a way that makes the offer easy to scan and easy to contact about.

### Experience

Present past work, agency milestones, or leadership experience as proof of capability. Focus on outcomes and credibility. Like a Tree graph visualising past 3 years of experience.

### Projects / Case Studies

Use project cards or case study blocks that include:

- project name
- challenge
- approach
- result
- tools or channels used
- optional external link

### Contact

The contact section should prioritize lead generation.

Include:

- name
- email
- organization or brand name
- service interest
- message
- CTA to submit

Add clear form feedback and success/error states.

## API Requirements

Keep the existing route surface and implement it cleanly.

### `POST /api/contact`

Handle inbound contact form messages.

Requirements:

- validate required fields
- reject invalid payloads clearly
- send or store the message as appropriate
- return a structured JSON response
- keep behavior dependable

### `POST /api/notify`

Handle newsletter or consultation notification signup.

Requirements:

- accept email and optional metadata
- validate input
- generate or store a verification token if needed
- support a confirmation email flow
- return a structured JSON response

### `GET /api/notify/verify/[token]`

Verify the signup token.

Requirements:

- validate the token
- confirm the signup
- return a clean response state
- handle invalid or expired tokens safely

### Backend quality rules

- Prefer small focused route handlers.
- Use shared helpers in `src/lib/` only if they simplify the routes.
- Improve validation and error handling.
- Keep responses consistent.
- Do not add extra backend systems unless clearly necessary.

## Chatbot Requirements

Keep a lightweight, local chatbot widget.

Rules:

- do not use a remote AI API
- read answers from `src/data/content.ts`
- keep responses short and helpful
- support English, Hindi, and Hinglish if the content schema includes them
- make it feel like a site assistant, not a general chatbot

The chatbot should help visitors with:

- services
- contact information
- agency credibility
- project summaries
- consultation intent

## Layout And Global UI

### `src/app/layout.tsx`

Implement:

- metadata
- open graph tags
- Twitter card metadata
- font setup
- global widgets
- smooth scroll behavior

Mount global UI elements in a sensible order so the page feels polished.

### `src/app/page.tsx`

Assemble the homepage from the defined sections only. Keep it simple and readable.

## Component Expectations

### `components/layout/Navbar.tsx`

- Anchor links to key sections
- Clear active/hover states
- Compact mobile navigation
- Strong visual hierarchy

### `components/sections/Hero.tsx`

- Biggest visual section on the page
- Strong headline treatment
- Clear conversion buttons
- Trust signals
- Motion that supports the brand

### `components/sections/About.tsx`

- Strategic brand introduction
- Clear, premium tone
- Easy-to-scan layout

### `components/sections/Experience.tsx`

- Timeline, cards, or stacked results blocks
- Show credibility through measurable outcomes

### `components/sections/Skills.tsx`

- Present services or capability areas
- Use clear labels and easy scanning
- Avoid clutter

### `components/sections/Projects.tsx`

- Show case studies or selected work
- Emphasize results and service value
- Keep cards visually rich but disciplined

### `components/sections/Contact.tsx`

- High-converting form
- Clear CTA
- Validation and feedback

### `components/ui/LoadingScreen.tsx`

- Keep it short
- Use it only if it improves perceived quality

### `components/ui/CustomCursor.tsx`

- Optional, but only if it supports the premium branded feel
- Must not harm mobile usability

### `components/ui/ProgressBar.tsx`

- Optional subtle scroll indicator
- Keep it minimal and performant

### `components/ui/ProjectCard.tsx`

- Reusable case study card component
- Clear title, summary, tags, and CTA

### `components/ui/NotifyModal.tsx`

- Keep the notification/verification flow elegant and unobtrusive

## Styling Rules

- Use Tailwind CSS utility classes as the main styling method.
- Keep global design tokens in `src/app/globals.css`.
- Use a small, consistent palette.
- Prefer strong layouts over decorative clutter.
- Maintain readability and contrast at all times.
- Make responsive behavior deliberate, especially on narrow screens.

## Motion Rules

- Use Framer Motion for section reveals, hover states, and CTA transitions.
- Keep motion restrained and premium.
- Avoid constant animation noise.
- Motion should reinforce credibility and focus.

## SEO And Metadata

Include strong metadata:

- page title
- description
- canonical URL if available
- Open Graph tags
- Twitter card metadata

Make the preview text and images feel like a real agency brand.

## Acceptance Criteria

The final result should satisfy all of the following:

- The site feels like Adniko PR and Marketing Agency, not a generic template.
- The UI uses a brutalist-inspired premium aesthetic.
- The content is structured for agency conversion and trust.
- The project uses the exact stack listed above.
- The file structure matches the required structure above.
- The contact and notify flows work cleanly.
- The chatbot is local and content-driven.
- The code is clean, modular, and production-oriented.

## Final Instruction

Build the website exactly from this specification. If any detail is ambiguous, make the most professional and product-appropriate choice without asking for clarification.