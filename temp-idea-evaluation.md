# Context Keeper - Work Context Preservation Tool

## Initial Concept

**Problem:** Developers and knowledge workers lose 15-30 minutes every time they switch between projects or resume work, trying to remember what they were doing, finding the right files, tabs, and mental state.

**Solution:** A desktop application that automatically captures and restores your complete work context - open applications, browser tabs, code editor state, terminal sessions, and even mental notes - with a single click.

**Target Users:**
- Software developers juggling multiple projects
- Freelancers switching between client work
- Students managing multiple research topics
- Anyone doing deep work across multiple contexts

## Key Features (MVP)
1. **Auto-capture:** Automatically snapshots your workspace every time you close your laptop or on manual trigger
2. **Smart restore:** One-click restoration of all windows, tabs, files in the exact positions
3. **Context notes:** Quick voice/text notes attached to each context for memory refresh
4. **Timeline view:** Visual timeline of your work sessions with previews
5. **Privacy-first:** All data stored locally, encrypted

## Differentiation
- Unlike browser tab managers: Captures ENTIRE workspace (not just browser)
- Unlike session managers: Includes mental context (notes, last thoughts)
- Unlike time trackers: Focuses on context switching, not surveillance
- Cross-platform (Windows, Mac, Linux)

## Monetization
- Free tier: 3 saved contexts, manual save only
- Pro ($9/month): Unlimited contexts, auto-save, cloud backup
- Team ($29/user/month): Shared project contexts, handoff notes

---

## PDCA Evaluation - Iteration 1

### Plan: Idea Variants

1. **Context Keeper** (chosen): Full workspace preservation
2. **Project Switcher**: Simpler, just file/folder bookmarks with notes
3. **Deep Work Companion**: Combines context saving with focus tracking
4. **Meeting Context**: Specialized for pre/post meeting context preservation
5. **Research Assistant**: Specialized for academic/research workflows

### Do: Score Evaluation

| Axis | Score | Reasoning |
|------|-------|-----------|
| **PUGEF** | 7.5 | **P**otential users: ~50M knowledge workers globally; **U**sage frequency: 3-10x daily; **G**rowth: Remote work increasing; **E**ase: Desktop app, moderate complexity; **F**requency: Daily habit-forming tool |
| **ICE** | 7.0 | **I**mpact: Saves 1-2 hours/day; **C**onfidence: 70% - core tech exists (window management APIs); **E**ase: Moderate - needs OS-specific implementations |
| **Market** | 6.5 | Market size: $5B+ productivity tools; Growth: 15%+ YoY; Entry barrier: Medium - desktop apps harder than web |
| **Advantage** | 8.0 | Tech advantage: Can leverage existing tools (tmux, browser APIs); Unique angle: Mental context + physical state; Feasible: Yes, 2-3 week MVP |

**Average Score: 7.25** - Close to target, needs refinement

### Check: Gap Analysis

**Weaknesses:**
1. Market score (6.5) - Need clearer differentiation from existing tools
2. ICE confidence (7.0) - OS integration complexity might be underestimated
3. PUGEF could be higher - Need stronger habit-forming mechanism

**Improvement Priorities:**
1. Add killer feature that existing tools don't have
2. Simplify MVP to increase ease of implementation
3. Add viral/sharing mechanism to boost growth

### Act: Improvements

**Enhanced Features:**
1. **AI Context Summary:** When resuming, get an AI-generated "where you left off" summary from your files/tabs
2. **Smart Suggestions:** "You usually work on project X around this time"
3. **Collaboration:** Share context snapshots with teammates for better handoffs
4. **Integration Hub:** Works with VSCode, JetBrains, Obsidian, Notion via APIs
5. **Focus Mode:** Auto-closes distracting apps when entering a context

**Simplified MVP Path:**
- Phase 1: Browser extension + VSCode plugin (easier than full desktop app)
- Phase 2: Add terminal/app support
- Phase 3: Full desktop integration

**Growth Mechanism:**
- Free tier users can share 1 public context template
- Context templates marketplace (e.g., "React Dev Setup", "Writing Flow")

---

## PDCA Evaluation - Iteration 2

### Do: Re-score with improvements

| Axis | Score | Reasoning |
|------|-------|-----------|
| **PUGEF** | 8.0 | Same user base, but AI summary + smart suggestions increase stickiness; Templates marketplace adds viral growth; Habit formation stronger |
| **ICE** | 8.0 | **I**mpact: Same; **C**onfidence: 85% - browser+VSCode is proven tech; **E**ase: Higher - phased approach, extension first |
| **Market** | 7.5 | Template marketplace creates network effects; Clear differentiation (AI + mental context); Easier entry (web first) |
| **Advantage** | 8.5 | AI context summary is unique; Extension model proven; Can integrate with existing tools; 1-week MVP possible |

**Average Score: 8.0** ✅ **Target Achieved!**

### Check: Final Validation

**Strengths:**
- Clear pain point with measurable impact
- Phased approach reduces risk
- AI integration adds unique value
- Network effects through templates
- Fast MVP timeline

**Risks:**
- Browser extensions have limited permissions
- Competitors could copy quickly
- Privacy concerns need strong messaging

**Mitigation:**
- Open-source core, charge for AI features
- Build community early
- Privacy-first marketing, local-first architecture

---

## Final Proposal

### Product: Context Keeper

**Tagline:** "Pick up exactly where you left off. Every time."

**Core Value:** Save 90 minutes per day lost to context switching

**MVP Scope (Week 1):**
- Chrome extension capturing tabs + notes
- VSCode extension capturing workspace + files
- Simple web dashboard showing context timeline
- One-click restore for browser + editor

**Tech Stack:**
- Chrome Extension (Manifest V3)
- VSCode Extension API
- Web app: Next.js + Tailwind
- Storage: IndexedDB (local) + optional Supabase (cloud)
- AI: OpenAI API for summaries

**Launch Strategy:**
1. ProductHunt launch with free tier
2. Target developer communities (Reddit r/webdev, HackerNews)
3. Create 10 template contexts (showcase value)
4. Partner with productivity YouTubers

**Success Metrics:**
- Week 1: 1000 installs
- Month 1: 10% activation (actually save a context)
- Month 3: 5% conversion to paid

### Final Scores

| Axis | Score |
|------|-------|
| PUGEF | 8.0 |
| ICE | 8.0 |
| Market | 7.5 |
| Advantage | 8.5 |
| **Total** | **8.0/10.0** |

**Iterations:** 2
**Status:** Ready for prototype ✅
