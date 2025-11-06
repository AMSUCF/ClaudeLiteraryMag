# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClaudeLiteraryMag is a traditional literary magazine website built with vanilla HTML, CSS, and JavaScript. The site publishes fiction, poetry, and creative nonfiction with a focus on exceptional craft and authentic human voice.

## Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **No frameworks or build tools** - This is intentionally a simple, static site
- **Form handling:** FormSubmit.co (free service for email forwarding)
- **Hosting:** Can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Project Structure

```
ClaudeLiteraryMag/
├── index.html              # Homepage with current issue preview
├── issue-01-halloween.html # Full Halloween issue with all literary works
├── submissions.html        # Submission portal with form
├── about.html             # About page with peer review & AI policy
├── archive.html           # Archive of past issues
├── css/
│   └── main.css           # All styles (traditional literary magazine aesthetic)
├── js/
│   ├── main.js            # Navigation, mobile menu, accessibility
│   └── submissions.js     # Form validation, character counting
├── images/                # Directory for images (currently using CSS gradients)
└── CLAUDE.md             # This file

```

## Development Commands

Since this is a static site with no build process, development is straightforward:

### Local Development

1. **Start a local server:**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Python 2
   python -m SimpleHTTPServer 8000

   # Using Node.js (if http-server is installed)
   npx http-server -p 8000

   # Using PHP
   php -S localhost:8000
   ```

2. **Open in browser:**
   Navigate to `http://localhost:8000`

### Testing

- **Cross-browser testing:** Test in Chrome, Firefox, Safari, Edge
- **Mobile testing:** Use browser DevTools responsive mode or test on actual devices
- **Accessibility testing:** Use browser DevTools accessibility inspector
- **Form testing:** Test submission form with various inputs
- **Navigation testing:** Verify all internal links work, smooth scrolling functions

### Validation

- **HTML validation:** https://validator.w3.org/
- **CSS validation:** https://jigsaw.w3.org/css-validator/
- **Accessibility:** Use WAVE tool or Lighthouse in Chrome DevTools

## Architecture & Design Decisions

### Design Philosophy

The site uses a **traditional literary magazine aesthetic**:
- Classic serif typography (Georgia as primary font)
- Generous whitespace and readable line lengths
- Print-inspired layout with clear hierarchy
- Muted, elegant color palette
- Halloween issue uses subtle seasonal colors without being cartoonish

### CSS Architecture

**Variables-based system** in `css/main.css`:
- CSS custom properties for colors, spacing, typography
- Mobile-first responsive design with breakpoints at 768px and 480px
- Print styles included for printer-friendly versions
- BEM-inspired naming for utility classes

Key CSS sections:
1. Variables and reset
2. Typography system
3. Layout components (container, content-container)
4. Header and navigation (with sticky header)
5. Literary work formatting (drop caps, pull quotes, poetry spacing)
6. Form styling
7. Responsive media queries

### JavaScript Architecture

**Vanilla JS with IIFE pattern** to avoid global namespace pollution:

**main.js:**
- Mobile menu toggle with keyboard navigation (Escape key)
- Smooth scrolling for anchor links
- Active navigation highlighting
- Accessibility enhancements (skip-to-main link)
- Lazy loading support (for future images)

**submissions.js:**
- Real-time character/word counting
- Client-side form validation
- Category-specific word count limits
- Auto-save drafts to localStorage
- Form submission handling

### Form Handling

Uses **FormSubmit.co** free service:
- Action: `https://formsubmit.co/editor@claudelitmag.fake`
- No backend required
- Email forwarding to specified address
- Form includes honeypot and CAPTCHA options via hidden fields

### Content Strategy

**Issue 01: The Hallowed & The Haunted** (Halloween theme):
- 3 short fiction pieces (Gothic, horror, contemporary)
- 4 poems (various forms and styles)
- 2 creative nonfiction essays (memoir and personal essay)
- Each piece includes author bio

All content is original, written specifically for this inaugural issue.

## Key Features

1. **Responsive Design:** Works on all device sizes
2. **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation, skip links
3. **Progressive Enhancement:** Works without JavaScript
4. **Mobile Menu:** Hamburger menu for small screens
5. **Form Validation:** Client-side validation with helpful error messages
6. **Character Counters:** Real-time feedback on form fields
7. **Draft Auto-save:** Saves submission drafts to localStorage
8. **Smooth Scrolling:** Enhanced anchor link navigation
9. **Print-Friendly:** Optimized print styles

## Content Guidelines

### Adding New Issues

1. Create a new HTML file: `issue-XX-theme.html`
2. Copy structure from `issue-01-halloween.html`
3. Update table of contents with new works
4. Add literary works following the same format
5. Update `index.html` to feature the new issue
6. Add issue to `archive.html`

### Literary Work Formatting

**Fiction:**
- Use `<article class="literary-work">` wrapper
- Include work header with category, title, author
- Use `class="drop-cap"` for opening paragraph
- Text-justified paragraphs with 2em indent
- Author bio at end

**Poetry:**
- Add `class="poetry"` to article wrapper
- Use `<div class="stanza">` for stanza breaks
- No text indent on poems
- Line breaks within `<p>` tags

**Pull Quotes:**
- Use `<blockquote class="pull-quote">` for featured quotes

### Color Scheme

Defined in CSS variables:
- Cream backgrounds: `--color-cream`, `--color-off-white`
- Text: `--color-text-primary`, `--color-text-secondary`
- Accent: `--color-accent` (brown), `--color-accent-light`
- Halloween theme: orange, purple, green variants

## Important Policies

### AI Policy

The site has a comprehensive AI policy (see `about.html#ai-policy`):
- Only human-authored work accepted
- Clear distinction between tool use (acceptable) and content generation (not acceptable)
- Required attestation on submission form
- Retraction policy for violations

When adding content, ensure all literary works are genuinely human-authored.

### Peer Review Process

Documented in `about.html#peer-review`:
- Blind peer review (anonymized submissions)
- Multiple editorial readers
- 8-12 week response time
- Four response types: acceptance, revise & resubmit, personal rejection, standard rejection

## Deployment

This is a static site that can be deployed to:

1. **GitHub Pages:**
   - Push to repository
   - Enable GitHub Pages in Settings
   - Site will be live at `username.github.io/ClaudeLiteraryMag`

2. **Netlify:**
   - Connect repository
   - Build command: (none needed)
   - Publish directory: `/`

3. **Vercel:**
   - Import repository
   - Framework preset: Other
   - No build configuration needed

4. **Traditional hosting:**
   - Upload all files via FTP
   - Ensure server serves `.html` files

### Email Configuration

Update FormSubmit email address in `submissions.html`:
- Current: `editor@claudelitmag.fake`
- Change to real email address before deployment
- FormSubmit will send confirmation email on first use

## Browser Support

Targets modern browsers (last 2 versions):
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

Uses progressive enhancement, so older browsers get basic functionality.

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Skip-to-main-content link
- Sufficient color contrast (WCAG AA compliant)
- Responsive text sizing
- Form labels and helpful error messages
- Focus visible styles

## Future Enhancements

Potential additions (not yet implemented):
- RSS feed for new issues
- Search functionality
- Author index
- Tag/category filtering
- Email newsletter signup
- Social media sharing buttons
- Image optimization and lazy loading
- Dark mode toggle
- Multi-language support

## File Naming Conventions

- HTML files: lowercase with hyphens (`issue-01-halloween.html`)
- CSS/JS files: lowercase (`main.css`, `submissions.js`)
- Image files (if added): descriptive names (`issue-01-cover.jpg`)
- IDs: kebab-case (`#the-last-visitor`, `#ai-policy`)
- CSS classes: kebab-case (`.work-title`, `.author-bio`)

## Notes for Future Development

- Keep the site simple and focused on content
- Maintain the traditional literary aesthetic
- Ensure all new pages follow the same structure
- Test form functionality before each new issue launch
- Update archive page when adding new issues
- Preserve accessibility in all additions
- Consider performance impact of any new features
