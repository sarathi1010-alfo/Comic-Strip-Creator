# WEEKLY CONTENT STRATEGY: COMICFLOW EDITION

This document outlines the repeatable, high-scale content engine for ComicFlow (https://comicflow.alfo.online/). It is designed to build massive semantic surface area, capture Answer Engine Optimization (AEO) features, and fill existing content gaps.

---

## 1. THE REPEATABLE WEEKLY TEMPLATE SYSTEM

All templates are optimized for **Answer Engine Optimization (AEO)**. Every page must include:
- **AI Snapshot**: A 30-40 word concise answer (classed `.ai-snapshot`) at the top.
- **FAQ Schema**: Minimum 3-5 questions.
- **Table of Contents**: For long-form content.
- **Semantic HTML**: `<article>`, `<address>`, `<time>`.

### Template A: Cluster Article (700-1000 words)
*Target: Educational depth for long-tail keywords.*
- **Data Source**: `src/data/seo-blog.json`
- **H1**: `[PRIMARY_KEYWORD]`: Complete Guide for `[TARGET_AUDIENCE]` in 2026
- **AI Snapshot**: `[PRIMARY_KEYWORD]` is `[DEFINITION]`. It is essential for `[BENEFIT]`.
- **H2**: Why `[PRIMARY_KEYWORD]` Matters for `[AUDIENCE/USE_CASE]`
- **H2**: How to `[ACTION]` with `[PRIMARY_KEYWORD]` (Step-by-Step)
- **H2**: Top `[NUMBER]` `[STRATEGIES/TOOLS]` for `[PRIMARY_KEYWORD]`
- **H3**: Detailed breakdown of each (with real comic examples)
- **H2**: Common Mistakes to Avoid (with Comparison Table)
- **AEO Box**: 5 Key Takeaways (Bullet points)
- **Schema**: `Article`, `FAQPage`, `Speakable`

### Template B: Programmatic Comparison Page (500-700 words)
*Target: High-intent "vs" keywords.*
- **Data Source**: `src/data/seo-vs.json`
- **H1**: `[ENTITY_A]` vs `[ENTITY_B]`: Which Comic Creator is Better for `[USE_CASE]`?
- **AI Snapshot**: Comparison Verdict: `[ENTITY_A]` is best for `[SCENARIO A]`, while `[ENTITY_B]` excels at `[SCENARIO B]`.
- **Comparison Table**: Features | `[ENTITY_A]` | `[ENTITY_B]` | Winner
- **Deep Dive**: Pros and Cons of each.
- **AEO Box**: "Best Pick for [Scenario]" (Bold summary)
- **Schema**: `Product` (for comparison entities), `FAQPage`

### Template C: Micro-Answer Page (300-500 words)
*Target: Featured snippets and Voice Search.*
- **Data Source**: `src/data/seo-blog.json` (categorized as Micro)
- **H1**: What is `[COMIC_TERM]`?
- **AI Snapshot**: `[COMIC_TERM]` is `[40-60 word precise definition]`.
- **H2**: How Does `[TERM]` Work?
- **H2**: Real-World Example of `[TERM]` in `[GENRE]`
- **H2**: Why is `[TERM]` Important?
- **H2**: `[TERM]` vs `[RELATED_TERM]` (Comparison table)
- **Schema**: `FAQPage`, `Speakable` (targeting H1 and snapshot)

### Template D: Pillar Page (3000+ words)
*Target: Category authority.*
- **Data Source**: Custom landing pages in `src/app/(marketing)/`
- **H1**: The Ultimate 2026 Guide to `[BROAD_TOPIC]`
- **Executive Summary**: 200-word AI Overview primer.
- **Chapters**: History, Technical Foundation, Top 10 Strategies, Future Trends.
- **AEO Box**: Statistical Data Table.
- **Schema**: `Article`, `FAQPage` (10+ questions), `BreadcrumbList`

### Template E: Genre/Technique Deep-Dive (600-800 words)
*Target: Creative intent and asset discovery.*
- **Data Source**: `src/data/seo-genres.json` or `src/data/seo-styles.json`
- **H1**: The Complete Guide to Creating `[GENRE]` Comic Strips
- **AI Snapshot**: To create `[GENRE]` comics, use `[TECHNIQUE A]` and `[TECHNIQUE B]`. ComicFlow provides `[ASSET]` to help.
- **H2**: Defining `[GENRE]` Visual and Narrative Techniques
- **H2**: 3 Professional Examples (Panel breakdowns)
- **H2**: Subverting Common `[GENRE]` Tropes
- **AEO Box**: Quick Reference Table (Genre -> Techniques -> Tools)
- **Schema**: `Article`, `FAQPage`

### Template F: Use-Case/Feature Guide (600-800 words)
*Target: Commercial and Educational intent.*
- **Data Source**: `src/data/seo-use-cases.json`
- **H1**: How to Use ComicFlow for `[USE_CASE]`: Step-by-Step
- **AI Snapshot**: Using ComicFlow for `[USE_CASE]` involves `[STEP 1]`, `[STEP 2]`, and `[STEP 3]`.
- **H2**: Why `[USE_CASE]` Benefits from Sequential Art
- **H2**: Step-by-Step Feature Walkthrough
- **AEO Box**: Use Case -> Key Features -> Tips -> Outcome
- **Schema**: `HowTo`, `FAQPage`

---

## 2. THE REPEATABLE WEEKLY CALENDAR

| Day | Theme | Deliverables |
| :--- | :--- | :--- |
| **Monday** | **Fundamentals & Structure** | 1 Pillar Chapter, 3 Cluster Articles |
| **Tuesday** | **Comparisons** | 2 Programmatic Comparison Pages (Template B) |
| **Wednesday** | **Genre Deep-Dives** | 2 Genre Pages (Template E), 5 Micro-Answers |
| **Thursday** | **Techniques & Craft** | 2 Technique Pages (Template E), 5 Micro-Answers |
| **Friday** | **Use-Cases & Publishing** | 2 Use-Case Guides (Template F), 3 Daily Clusters |
| **Saturday** | **Interlinking & Audit** | Retroactive internal link mapping, Sitemap submission |
| **Sunday** | **AI & Refresh** | Refresh 5 old posts, Update `updatedAt`, Add 2 AI-specific guides |

---

## 3. PROGRAMMATIC CSV MAPPING

Use these headers for bulk generation scripts or CSV-to-JSON mappers.

### Comparison Mapping (Template B)
`slug`, `entity_a`, `entity_b`, `use_case`, `features_list`, `a_pros`, `a_cons`, `b_pros`, `b_cons`, `verdict`, `internal_links`

### Genre/Technique Mapping (Template E)
`slug`, `genre_name`, `key_techniques`, `visual_style`, `common_tropes`, `recommended_tools`, `example_panels_desc`

### Use-Case Mapping (Template F)
`slug`, `use_case`, `target_audience`, `key_features`, `step_1`, `step_2`, `step_3`, `tips`, `outcome_desc`

---

## 4. THE ETERNAL WEEKLY RHYTHM

- **Pillar Pages**: 1 per week (Hub creation).
- **Deep-Dives (Genre/Use-Case)**: 5 per week.
- **Comparisons**: 2 per week.
- **Micro-Answers**: 10 per week (Snippet capturing).
- **Cluster Articles**: 10 per week.
- **Weekly Indexing Target**: 50–100 new/updated URLs.

---

## 5. PRIORITY TOPIC QUEUE (FIRST 4 WEEKS)

### Week 1: Authority Engine - Fundamentals
- **Pillar**: The Ultimate Guide to Comic Strip Creation in 2026
- **Comparisons**: ComicFlow vs Canva, ComicFlow vs Pixton
- **Genres**: Romance Comic Guide, Mystery Comic Guide
- **Techniques**: Panel Layouts Explained, Pacing Your Comic
- **Micro**: "What is a Comic Strip?", "What is a Panel in Comics?"

### Week 2: Character & Visual Development
- **Pillar**: The Complete Guide to Character Design for Comics
- **Comparisons**: ComicFlow vs ToonDoo, ComicFlow vs MakeBeliefsComix
- **Genres**: Slice of Life Deep-Dive, Adventure Comic Guide
- **Techniques**: Character Expressions, Color Theory for Comics
- **Micro**: "What is a Speech Bubble?", "What is a Caption Box?"

### Week 3: Advanced Techniques & AI
- **Pillar**: The Ultimate Guide to AI Comic Creation
- **Comparisons**: ComicFlow vs StripGenerator, ComicFlow vs Comic Life
- **Genres**: Western Comic Guide, Noir Comic Guide
- **Techniques**: Background Design, Lettering & Sound Effects
- **Micro**: "What is AI Comic Generation?", "What are Sound Effects in Comics?"

### Week 4: Publishing & Professional Development
- **Pillar**: The Complete Guide to Publishing Your Webcomic
- **Comparisons**: ComicFlow vs MediBang Paint, ComicFlow vs Clip Studio Paint
- **Genres**: Manga-Style Guide, Webtoon-Style Guide
- **Techniques**: Digital Coloring, Shading & Lighting
- **Micro**: "What is a Webcomic?", "How to Monetize a Webcomic?"

---

## 6. GENRE DEEP-DIVE QUEUE
1. Romance, Mystery
2. Slice of Life, Adventure
3. Western, Noir
4. Manga-Style, Webtoon-Style
5. Comedy, Action (Retro-refresh)
6. Fantasy, Sci-Fi (Retro-refresh)

## 7. TECHNIQUE DEEP-DIVE QUEUE
1. Panel Layouts, Pacing
2. Character Expressions, Color Theory
3. Background Design, Lettering
4. Digital Coloring, Shading & Lighting
5. Perspective, Composition
6. Inking, Rendering

## 8. USE-CASE GUIDES QUEUE
1. Comic Strips for Education
2. Comic Strips for Social Media
3. Comic Strips for Presentations
4. Comic Strips for Storyboarding
5. Comic Strips for Branding
6. Comic Strips for Therapy/Wellness

## 9. MICRO-ANSWER TOPIC QUEUE
- **Week 1**: What is a comic strip?, What is a panel?, What is a speech bubble?, What is a caption box?, What is a gutter?
- **Week 2**: What is a splash page?, What is a webcomic?, What is a graphic novel?, What is a comic book?, Strip vs Book.
- **Week 3**: What is AI comic generation?, What are sound effects?, What is lettering?, What is inking?, What is coloring?
- **Week 4**: What is a webtoon?, What is a manga?, What is a zine?, What is a mini-comic?, How to monetize?

## 10. COMPARISON TARGETS
- **Primary**: Canva, Pixton, ToonDoo, Storyboard That (Update)
- **Secondary**: MakeBeliefsComix, StripGenerator, Comic Life, MediBang Paint, Clip Studio Paint
