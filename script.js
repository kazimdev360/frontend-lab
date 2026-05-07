const main = document.getElementById('main');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('themeToggle');

let allData = null;

// ── Theme ──────────────────────────────────────────────
if (localStorage.getItem('theme') === 'dark') applyDark();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function applyDark() {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

// ── Inlined Data ───────────────────────────────────────
const CONCEPTS = {
  categories: [
    {
      id: 'html', title: 'HTML',
      description: 'Semantics, forms, media, accessibility, and document structure.',
      lessons: [
        {
          id: 'semantic-html', title: 'Semantic HTML', level: 'Beginner', estimatedTime: '20 min',
          summary: 'Learn why semantic tags improve accessibility, SEO, and maintainability.',
          sections: [
            { heading: 'Why semantics matter', content: 'Semantic HTML uses meaningful tags like header, nav, main, article, section, footer instead of generic divs. This helps screen readers, search engines, and developers understand the page structure.' },
            { heading: 'Common semantic tags', content: 'Use header for introductory content, nav for navigation, main for primary content, section for thematic grouping, article for self-contained composition, and footer for closing information.' },
            { heading: 'Accessibility checklist', content: 'Prefer headings in order, label form controls, ensure interactive elements are keyboard accessible, and avoid using only color to convey meaning.' }
          ],
          resources: [
            { title: 'MDN - HTML reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
            { title: 'MDN - Accessibility', url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility' }
          ]
        },
        {
          id: 'forms-and-validation', title: 'Forms & Validation', level: 'Beginner', estimatedTime: '25 min',
          summary: 'Build forms that are usable: labels, input types, constraints, and error states.',
          sections: [
            { heading: 'Always label inputs', content: 'Use label with a for attribute to connect labels with inputs. This improves usability and screen reader experience.' },
            { heading: 'Use native validation', content: 'Leverage HTML attributes like required, min/max, pattern, type, and inputmode. Provide helpful error messages.' },
            { heading: 'Progressive enhancement', content: 'Rely on HTML validation and basic behavior first. Add richer UX with JavaScript without breaking core functionality.' }
          ],
          resources: [{ title: 'MDN - Forms', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms' }]
        },
        {
          id: 'html-media', title: 'Images & Media', level: 'Beginner', estimatedTime: '20 min',
          summary: 'Embed images, video, and audio correctly with accessibility in mind.',
          sections: [
            { heading: 'Responsive images', content: 'Use the srcset and sizes attributes on img to serve different image sizes based on screen resolution and viewport width. This reduces bandwidth on mobile devices.' },
            { heading: 'Alt text', content: 'Every meaningful image needs descriptive alt text. Decorative images should have an empty alt attribute so screen readers skip them.' },
            { heading: 'Video and audio', content: 'Use the video and audio elements with controls. Always provide captions or transcripts for accessibility compliance.' }
          ],
          codeSamples: [
            { lang: 'html', title: 'Responsive image', code: '<img\n  src="photo-800.jpg"\n  srcset="photo-400.jpg 400w, photo-800.jpg 800w"\n  sizes="(max-width: 600px) 400px, 800px"\n  alt="A scenic mountain view">' }
          ],
          resources: [{ title: 'MDN - Responsive images', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images' }]
        },
        {
          id: 'html-meta-seo', title: 'Meta Tags & SEO', level: 'Beginner', estimatedTime: '15 min',
          summary: 'Use meta tags to control how browsers and search engines read your page.',
          sections: [
            { heading: 'Essential meta tags', content: 'Always include charset, viewport, and description meta tags. The viewport tag is critical for responsive design on mobile devices.' },
            { heading: 'Open Graph tags', content: 'og:title, og:description, and og:image control how your page appears when shared on social media platforms like Twitter and Facebook.' },
            { heading: 'Title element', content: 'The title element is the most important on-page SEO factor. Keep it under 60 characters and make it descriptive and unique per page.' }
          ],
          codeSamples: [
            { lang: 'html', title: 'Essential head tags', code: '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Page description here">\n<title>Page Title</title>' }
          ],
          resources: [{ title: 'MDN - Meta element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta' }]
        }
      ]
    },
    {
      id: 'css', title: 'CSS',
      description: 'Selectors, layout, responsiveness, animations, and maintainable styling.',
      lessons: [
        {
          id: 'box-model', title: 'The CSS Box Model', level: 'Beginner', estimatedTime: '20 min',
          summary: 'Understand content, padding, borders, margins, and sizing behaviors.',
          sections: [
            { heading: 'Components', content: "Every element's rendered size is determined by content box, padding, border, and margin. With box-sizing: border-box, width includes border and padding." },
            { heading: 'Margin collapsing', content: "Vertical margins can collapse between block elements in specific situations. This affects layout spacing unexpectedly if you're not aware." },
            { heading: 'Practical guidance', content: 'Prefer consistent box-sizing (commonly border-box) and use spacing utilities to avoid magic numbers.' }
          ],
          codeSamples: [{ lang: 'css', title: 'Common box-sizing reset', code: '* { box-sizing: border-box; }' }],
          resources: [{ title: 'MDN - CSS box model', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model' }]
        },
        {
          id: 'flexbox', title: 'Flexbox Fundamentals', level: 'Beginner', estimatedTime: '30 min',
          summary: 'Learn flex containers, main/cross axes, and how to align items.',
          sections: [
            { heading: 'Container vs items', content: 'Set display: flex on the container. Flex children become flex items. Properties on the container control the axes and wrapping.' },
            { heading: 'Key properties', content: 'justify-content aligns along the main axis. align-items aligns along the cross axis. gap controls spacing between items.' },
            { heading: 'When to use flex', content: 'Flexbox is great for one-dimensional layouts (row OR column). For two-dimensional layouts, consider CSS Grid.' }
          ],
          codeSamples: [{ lang: 'css', title: 'Simple centered row', code: '.row {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n}' }],
          resources: [{ title: 'MDN - Flexbox guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox' }]
        },
        {
          id: 'css-grid', title: 'CSS Grid Layout', level: 'Intermediate', estimatedTime: '35 min',
          summary: 'Build two-dimensional layouts with rows and columns using CSS Grid.',
          sections: [
            { heading: 'Defining a grid', content: 'Use display: grid on a container, then define columns with grid-template-columns and rows with grid-template-rows. The fr unit distributes available space proportionally.' },
            { heading: 'Placing items', content: 'Items auto-place by default. Use grid-column and grid-row to explicitly position or span items across multiple tracks.' },
            { heading: 'Grid vs Flexbox', content: 'Use Grid for two-dimensional layouts (rows AND columns together). Use Flexbox for one-dimensional alignment within a row or column.' }
          ],
          codeSamples: [{ lang: 'css', title: '3-column responsive grid', code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 16px;\n}' }],
          resources: [{ title: 'MDN - CSS Grid', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids' }]
        },
        {
          id: 'css-variables', title: 'CSS Custom Properties', level: 'Beginner', estimatedTime: '20 min',
          summary: 'Use CSS variables to build themeable, maintainable stylesheets.',
          sections: [
            { heading: 'Declaring variables', content: 'Define custom properties on :root (or any element) using the -- prefix. They cascade and inherit like regular CSS properties.' },
            { heading: 'Using variables', content: 'Reference a variable with var(--name). You can provide a fallback: var(--color, #333) uses #333 if --color is not defined.' },
            { heading: 'Theming with variables', content: 'Swap an entire theme by redefining variables inside a .dark class or a media query. No need to override individual properties.' }
          ],
          codeSamples: [{ lang: 'css', title: 'Theme variables', code: ':root {\n  --bg: #ffffff;\n  --text: #1a1a1a;\n  --accent: #667eea;\n}\n\nbody.dark {\n  --bg: #121212;\n  --text: #e8e8e8;\n}' }],
          resources: [{ title: 'MDN - CSS custom properties', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties' }]
        }
      ]
    },
    {
      id: 'javascript', title: 'JavaScript',
      description: 'Core language concepts and modern async patterns.',
      lessons: [
        {
          id: 'scope-and-closures', title: 'Scope & Closures', level: 'Intermediate', estimatedTime: '35 min',
          summary: 'Closures are functions that remember variables from their lexical scope.',
          sections: [
            { heading: 'Lexical scope', content: "A variable's scope is determined by where it's declared in the source code. Inner functions can access outer variables." },
            { heading: 'What is a closure?', content: "When an inner function uses variables from an outer function, it closes over those variables. That's the closure." },
            { heading: 'Why it matters', content: 'Closures enable patterns like data encapsulation, callbacks, and function factories.' }
          ],
          codeSamples: [{ lang: 'js', title: 'Closure example', code: 'function makeCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  }\n}\n\nconst counter = makeCounter();\ncounter(); // 1\ncounter(); // 2' }],
          resources: [{ title: 'MDN - Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' }]
        },
        {
          id: 'async-await', title: 'Async/Await Basics', level: 'Intermediate', estimatedTime: '30 min',
          summary: 'Write asynchronous code that looks synchronous using async/await.',
          sections: [
            { heading: 'async functions', content: 'An async function always returns a Promise. Use await to pause within the async function until the Promise resolves.' },
            { heading: 'Error handling', content: 'Use try/catch around await calls. Rejections are caught like thrown errors.' }
          ],
          codeSamples: [{ lang: 'js', title: 'Fetch with async/await', code: 'async function getUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error(\'Request failed\');\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n    return null;\n  }\n}' }],
          resources: [{ title: 'MDN - Async functions', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous' }]
        },
        {
          id: 'dom-manipulation', title: 'DOM Manipulation', level: 'Beginner', estimatedTime: '30 min',
          summary: 'Select, create, modify, and remove elements using the DOM API.',
          sections: [
            { heading: 'Selecting elements', content: 'Use querySelector for a single element and querySelectorAll for a NodeList. These accept any valid CSS selector.' },
            { heading: 'Modifying elements', content: 'Change content with textContent or innerHTML. Update styles via element.style or classList.add/remove/toggle.' },
            { heading: 'Creating and removing', content: 'Use createElement to build new nodes, appendChild or append to insert them, and remove() to delete them from the DOM.' }
          ],
          codeSamples: [{ lang: 'js', title: 'Create and append element', code: "const li = document.createElement('li');\nli.textContent = 'New item';\nli.classList.add('list-item');\ndocument.querySelector('ul').appendChild(li);" }],
          resources: [{ title: 'MDN - DOM', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model' }]
        },
        {
          id: 'es6-features', title: 'ES6+ Essential Features', level: 'Beginner', estimatedTime: '25 min',
          summary: 'Master the modern JavaScript syntax used in every codebase today.',
          sections: [
            { heading: 'Destructuring', content: 'Extract values from arrays or objects into variables in one line. Works for function parameters too, making APIs cleaner.' },
            { heading: 'Spread and rest', content: 'The spread operator (...) expands iterables. Rest collects remaining arguments into an array. Both simplify array and object operations.' },
            { heading: 'Template literals', content: 'Use backticks for multi-line strings and embed expressions with ${expression}. Much cleaner than string concatenation.' }
          ],
          codeSamples: [{ lang: 'js', title: 'Destructuring + spread', code: 'const { name, age } = user;\nconst updated = { ...user, age: age + 1 };\n\nconst [first, ...rest] = [1, 2, 3, 4];' }],
          resources: [{ title: 'MDN - ES6 features', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }]
        }
      ]
    },
    {
      id: 'resources', title: 'Frontend Resources',
      description: 'Learning references and tooling knowledge.',
      lessons: [
        {
          id: 'mdn-and-web-platform', title: 'MDN & the Web Platform', level: 'Beginner', estimatedTime: '15 min',
          summary: 'How to use MDN effectively as your primary frontend reference.',
          sections: [
            { heading: 'Use Learn for concepts', content: 'MDN has curated guides (Learn) that teach topics step-by-step.' },
            { heading: 'Use reference pages for specifics', content: 'For exact syntax, browser support, and examples, use the Reference documentation.' }
          ],
          resources: [{ title: 'MDN', url: 'https://developer.mozilla.org/en-US/' }]
        },
        {
          id: 'dev-tools', title: 'Browser DevTools', level: 'Beginner', estimatedTime: '20 min',
          summary: 'Use browser DevTools to inspect, debug, and profile your web pages.',
          sections: [
            { heading: 'Elements panel', content: 'Inspect and live-edit HTML and CSS. Hover over elements to see their box model, computed styles, and applied rules.' },
            { heading: 'Console', content: 'Run JavaScript, view errors and warnings, and log values with console.log, console.table, and console.error.' },
            { heading: 'Network panel', content: 'Monitor all network requests, check response payloads, measure load times, and simulate slow connections.' }
          ],
          resources: [{ title: 'Chrome DevTools docs', url: 'https://developer.chrome.com/docs/devtools/' }]
        },
        {
          id: 'git-basics', title: 'Git Basics for Frontend', level: 'Beginner', estimatedTime: '25 min',
          summary: 'Track changes, collaborate, and manage your code history with Git.',
          sections: [
            { heading: 'Core workflow', content: 'The basic Git workflow is: make changes, stage with git add, commit with git commit, and push with git push.' },
            { heading: 'Branching', content: 'Create a branch with git checkout -b feature-name. Work in isolation, then merge back to main when ready.' },
            { heading: '.gitignore', content: 'List files and folders to exclude from version control in a .gitignore file. Common entries: node_modules/, .env, dist/.' }
          ],
          codeSamples: [{ lang: 'sh', title: 'Basic Git workflow', code: 'git init\ngit add .\ngit commit -m "initial commit"\ngit push origin main' }],
          resources: [{ title: 'Git documentation', url: 'https://git-scm.com/doc' }]
        },
        {
          id: 'vs-code-tips', title: 'VS Code Tips', level: 'Beginner', estimatedTime: '15 min',
          summary: 'Boost your productivity with essential VS Code shortcuts and extensions.',
          sections: [
            { heading: 'Must-know shortcuts', content: 'Ctrl+P opens file search. Ctrl+Shift+P opens the command palette. Alt+Click adds multiple cursors. Ctrl+D selects the next matching word.' },
            { heading: 'Useful extensions', content: 'Prettier for formatting, ESLint for linting, Live Server for instant preview, and GitLens for Git history inside the editor.' },
            { heading: 'Emmet', content: 'VS Code has Emmet built in. Type div.card>h2+p and press Tab to expand it into full HTML structure instantly.' }
          ],
          resources: [{ title: 'VS Code docs', url: 'https://code.visualstudio.com/docs' }]
        }
      ]
    }
  ]
};

// ── Init ───────────────────────────────────────────────
allData = CONCEPTS;
window.addEventListener('hashchange', route);
route();

// ── Routing ────────────────────────────────────────────
function route() {
  const hash = location.hash;
  const match = hash.match(/^#\/concepts\/([^/]+)\/([^/]+)$/);
  if (match) {
    renderLesson(match[1], match[2]);
  } else {
    renderList(searchInput.value.trim().toLowerCase());
  }
}

// ── Search ─────────────────────────────────────────────
searchInput.addEventListener('input', () => {
  if (!location.hash.startsWith('#/concepts/')) {
    renderList(searchInput.value.trim().toLowerCase());
  }
});

// ── List view ──────────────────────────────────────────
function renderList(query = '') {
  main.innerHTML = '';
  let hasResults = false;

  allData.categories.forEach(cat => {
    const lessons = cat.lessons.filter(l =>
      !query ||
      l.title.toLowerCase().includes(query) ||
      l.summary.toLowerCase().includes(query) ||
      cat.title.toLowerCase().includes(query)
    );
    if (!lessons.length) return;
    hasResults = true;

    const section = document.createElement('section');
    section.innerHTML = `
      <h2 class="category-title">${cat.title}</h2>
      <p class="category-desc">${cat.description}</p>
      <div class="cards-grid"></div>
    `;
    main.appendChild(section);

    const grid = section.querySelector('.cards-grid');
    lessons.forEach(lesson => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-title">${lesson.title}</div>
        <div class="card-summary">${lesson.summary}</div>
        <div class="card-meta">
          <span class="badge accent">${lesson.level}</span>
          <span class="badge">⏱ ${lesson.estimatedTime}</span>
        </div>
      `;
      card.addEventListener('click', () => {
        location.hash = `#/concepts/${cat.id}/${lesson.id}`;
      });
      grid.appendChild(card);
    });
  });

  if (!hasResults) {
    main.innerHTML = `<p class="no-results">No concepts found for "<strong>${query}</strong>".</p>`;
  }
}

// ── Lesson view ────────────────────────────────────────
function renderLesson(catId, lessonId) {
  const cat = allData.categories.find(c => c.id === catId);
  const lesson = cat?.lessons.find(l => l.id === lessonId);
  if (!lesson) { location.hash = ''; return; }

  const sectionsHTML = lesson.sections.map(s => `
    <div class="lesson-section">
      <h2>${s.heading}</h2>
      <p>${s.content}</p>
    </div>
  `).join('');

  const codeHTML = (lesson.codeSamples || []).map(s => `
    <div class="code-block">
      <div class="code-block-title">${s.title}</div>
      <pre><code>${escapeHTML(s.code)}</code></pre>
    </div>
  `).join('');

  const resourcesHTML = lesson.resources?.length ? `
    <div class="resources">
      <h3>Resources</h3>
      ${lesson.resources.map(r => `<a href="${r.url}" target="_blank" rel="noopener">${r.title} ↗</a>`).join('')}
    </div>
  ` : '';

  main.innerHTML = `
    <button class="lesson-back">← Back</button>
    <div class="lesson-header">
      <h1>${lesson.title}</h1>
      <p>${lesson.summary}</p>
      <div class="card-meta" style="margin-top:10px">
        <span class="badge accent">${lesson.level}</span>
        <span class="badge">⏱ ${lesson.estimatedTime}</span>
        <span class="badge">${cat.title}</span>
      </div>
    </div>
    ${sectionsHTML}
    ${codeHTML}
    ${resourcesHTML}
  `;

  main.querySelector('.lesson-back').addEventListener('click', () => {
    location.hash = '';
  });
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
