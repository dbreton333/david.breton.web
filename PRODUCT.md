# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is professional: recruiters, hiring managers, colleagues, and industry contacts who land here from a resume, LinkedIn, or a personal introduction — most importantly, people at Bombardier and other engineering employers evaluating David as a candidate/colleague. Secondary audience is personal network (friends, competition teammates) checking in on his work.

## Product Purpose

A personal portfolio site for David Breton, a Computer Engineer (McGill) moving into a role at Bombardier. It exists to present him as a credible, senior-minded engineer — background, work experience, competition record, and side projects — in a way that reads as professional and mature rather than as a "coding bootcamp portfolio." Success is a visitor coming away with a confident, polished impression appropriate for an engineer at a major aerospace/transportation company.

## Positioning

Not a generic corporate resume site and not a flashy "look what I can code" demo site. The differentiator is the person behind it: someone energized by ambiguous problems, direct communicator, builder who rallies people and skills to ship results — proven by co-founding a startup (Smartess) and shipping production software at Autodesk. The site should carry that voice through restrained, confident design rather than through gamified/neon dev-portfolio visual tropes.

## Operating Context

Built with Next.js (App Router) + TypeScript + CSS Modules, deployed as a personal site (no CMS/backend). Content is authored directly in components/JSON data files (`experienceData.json`, `skillsData.json`) and edited by David himself.

## Capabilities and Constraints

- Existing pages: Home (`/`), About (`/about`, currently a placeholder), Awards (`/awards`), Portfolio (`/portfolio`, currently hardcodes a single project: the Colosseum Survival Game, a full turn-based board game built with React).
- Portfolio must become an extensible, data-driven list of project entries (reusable component/data structure), not a single hardcoded project — new projects should be addable without duplicating layout code.
- Real evidence assets already exist and must be preserved/reused, not replaced with placeholders: his headshot (`my_image_new.png`), four real competition photos (`victory1-4.png`), and company logos for Autodesk, Smartess, Inovestor, BodyCad, BRP.
- Experience and Skills sections are already data-driven from JSON; that pattern should be kept/extended, not discarded.
- Colosseum Survival Game is a real, working game (not a demo) and must keep functioning; only its visual chrome/styling is in scope for restyling to match the new system.

## Brand Commitments

- Real name, real photo, real project/award content — no invented case studies, testimonials, or metrics.
- Explicit visual reference: adopt the design language of dennissnellenberg.com/work (monochrome editorial system, confident oversized display type, list/index-style content rows instead of card grids, restrained single accent color, dense/content-rich footer) as the new visual world for the whole site, translated to David's content — not copied verbatim.
- Target tone: professional, refined, modern, confident, "appropriate for an engineer at a major company," while keeping personality — explicitly not generic corporate, not a typical "software developer portfolio" look (moving away from particle backgrounds, neon-blue-on-navy, typewriter effects, gamified stat counters).

## Evidence on Hand

- Headshot: `public/images/my_image_new.png`.
- Competition photos: `public/images/victory1.png` … `victory4.png` (real event photos, already paired with real write-ups on the Awards page).
- Company logos (existing, quality/consistency not yet reviewed with David): `public/images/{autodesk,smartess,inovestor,bodycad,brp}.png`.
- Real work history (`experienceData.json`): Autodesk, Smartess, Inovestor, BodyCad, BRP — with real dates, roles, and descriptions.
- Real education history: McGill, Collège Jean-de-Brébeuf, Lighthouse Labs, Stanstead College.
- Real awards: 5 competition podiums / 3 first places (McGill Engineering Competition, Computer Science Games, Canadian Engineering Competition, Quebec Engineering Competition, Engineering Games).
- No additional inspiration images provided yet beyond the Dennis Snellenberg reference (David mentioned attaching more; not yet received).
- Absence: no company/client testimonials, no case-study metrics beyond what's stated above — must not be fabricated.

## Product Principles

1. One person's voice over generic corporate polish — confident and direct, not stiff.
2. Content already on hand (real photos, real work history, real awards) is the evidence; design should showcase it, never invent placeholders where real assets exist.
3. Portfolio is architected for growth: adding a new project must be a data addition, not a new page layout.
4. Visual system must be cohesive across every section — one typographic and color language, not per-section reinvention.
5. Professional-first, personality-second: refinement and restraint over gamification or novelty effects.
