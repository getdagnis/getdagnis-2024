import './CvPage.css';

export default function CvPage() {
  return (
    <div id="cv">
      <div className="cv-inner">
        <div className="cv-main">
          <h1>Dagnis Skurbe</h1>
          <h2>CURRICULUM VITAE</h2>
          <section className="cv-summary">
            <h3>Technical Product Engineer — React / Next.js / Node.js</h3>
            <p>
              Full-stack developer with strong background in UX (design psychology), product development and creative
              direction.
            </p>

            <div className="cv-contact">
              <p className="text-small-uppercase">
                <strong>Location:</strong> Riga, Latvia (Hybrid / Remote EU)
                <br />
                <strong>Email:</strong> <a href="mailto:dagnis.skurbe@gmail.com">dagnis.skurbe@gmail.com</a>
                <br />
                <strong>Phone:</strong> +371 2862 1357
                <br />
                <strong>Github:</strong>{' '}
                <a href="https://github.com/getdagnis" target="_blank" rel="noreferrer">
                  github.com/getdagnis
                  <br />
                </a>
                <strong>LinkedIn:</strong>{' '}
                <a href="https://linkedin.com/in/getdagnis" target="_blank" rel="noreferrer">
                  linkedin.com/in/getdagnis
                  <br />
                </a>
                <strong>Portfolio:</strong>{' '}
                <a href="https://getdagnis.vercel.app" target="_blank" rel="noreferrer">
                  getdagnis.vercel.app
                </a>
              </p>
            </div>
          </section>
          <section className="cv-section">
            <h3>SUMMARY</h3>
            <div className="cv-job-intro">
              <p>
                Full-stack React / Next.js developer with ~8 years of full-time experience building web applications and
                internal platforms. Strong focus on scalable front-end architecture, component systems and
                product-oriented development.
              </p>
              <p>
                Earlier career in product design, branding and creative direction. Founder experience launching
                international products and working with large local and international brands and creative agencies.
              </p>
            </div>
          </section>
          <section className="cv-section">
            <h3>PROFESSIONAL DEV EXPERIENCE</h3>

            <div className="cv-job">
              <div className="cv-job-header">
                <span className="cv-job-year">2024–2026</span>
                <span className="cv-job-title">Contract Developer</span>
                <span className="cv-job-employer text-small-uppercase">
                  Regional security related contract project (NDA)
                </span>
              </div>
              <p>
                Developed front-end for an international communication platform used by a regional security related NGO.
                Designed UX, front-end architecture, component structure, backend integrations.
              </p>
              <p className="cv-job-stack text-small-uppercase">
                <strong>Stack:</strong> Next.js, React, TypeScript, i18n, Node.js, Sanity CMS, Postgres
              </p>
            </div>

            <div className="cv-job">
              <div className="cv-job-header">
                <span className="cv-job-year">2024 (5 months)</span>
                <span className="cv-job-title">Senior Front-End Developer</span>
                <span className="cv-job-employer text-small-uppercase">Fivereasons.eu (formerly)</span>
              </div>
              <p>
                Led frontend migration of legacy Vue.js frontend to a new Next.js architecture. Defined front-end
                structure, development workflow. Was hired to be in charge of building a small front-end team.
              </p>
              <p className="cv-job-stack text-small-uppercase">
                <strong>Stack:</strong> Next.js, React, TypeScript, Node.js, Zustand, Chakra UI
              </p>
            </div>

            <div className="cv-job">
              <div className="cv-job-header">
                <span className="cv-job-year">2020–2024 (3 years)</span>
                <span className="cv-job-title">Full-Stack React / Node.js Developer</span>
                <span className="cv-job-employer text-small-uppercase">Sapiens Software Solutions</span>
              </div>
              <p>
                Worked on enterprise scale insurance systems, mostly Swedish insurance company{' '}
                <a href="https://www.folksam.se/" target="_blank" rel="noopener noreferrer">
                  Folksam
                </a>{' '}
                (4+ million customers). Worked in a team that builds, upgrades from legacy and maintains their entire
                claim and policy workflows — Sapiens Backend and 3rd-party services heavy schema-driven forms. Used,
                updated and maintained a shared UI components library between us and the customer's web-dev team{' '}
                <strong className="rainbow">(1.5 million monthly&nbsp;users*)</strong>{' '}
                <span className="extra-small">* GPT told me to really emphasise this</span>
              </p>
              <p className="cv-job-stack text-small-uppercase">
                <strong>Stack:</strong> React, TypeScript, Node.js, REST APIs, Material UI, Docker
              </p>
            </div>

            <div className="cv-job">
              <div className="cv-job-header">
                <span className="cv-job-year">2019–2020</span>
                <span className="cv-job-title">Customer Success Engineer</span>
                <span className="cv-job-employer text-small-uppercase">Dynamic Yield</span>
              </div>
              <p>
                Built JavaScript integrations for machine-learning personalization tools used by global e-commerce
                companies including Zara and Urban Outfitters. Implemented experimentation and frontend integration
                features.{' '}
                <a href="https://www.dynamicyield.com/" target="_blank" className="inline-link">
                  More
                </a>
                <p className="cv-job-stack text-small-uppercase">
                  <strong>Stack:</strong> Next.js, React, TypeScript, Node.js, i18n, Storybook, Supabase, REST APIs, AI
                  APIs
                </p>
              </p>
            </div>

            <div className="cv-job">
              <div className="cv-job-header">
                <span className="cv-job-year">2018–2019, 12 months</span>
                <span className="cv-job-title">Contract React.js Developer</span>
                <span className="cv-job-employer text-small-uppercase">Eventify.lv</span>
              </div>
              <p>
                Developed an AirBnb style React.js based B2C platform for renting festival equipment based on Sharetribe
                Flex.&nbsp;
                <a href="https://www.eventify.lv/" target="_blank" className="inline-link">
                  eventify.lv
                </a>
              </p>
            </div>
            <div className="zigzag-divider"></div>
            <div className="cv-job">
              <div className="cv-job-header">
                <span className="cv-job-year">2011–2013, 1.5 years</span>
                <span className="cv-job-title">JavaScript to InDesign developer / designer</span>
                <span className="cv-job-employer text-small-uppercase">Yearbook.com (London, UK)</span>
              </div>
              <p>
                Responsible for creating and maintaining JavaScript automated InDesign templates for now the leading
                British college leavers yearbook company (then an early stage startup) —&nbsp;
                <a href="https://yearbook.com/" target="_blank" className="inline-link">
                  yearbook.com
                </a>
              </p>
            </div>
          </section>
          <section className="cv-section">
            <h3>Parallel Product &amp; Design Experience</h3>

            <div className="cv-job">
              <span className="cv-job-year year-other">2003–2018, I tried to compress</span>

              <p>
                <strong>10+ years: Creative Director & Art Director for agencies in Riga and London</strong>
                <br />
                During my time in advertising I worked on creating such Top 10 locally loved brands in Latvia (created
                logos, identity and brand communication) as Dinamo Riga (reached "most beloved" brand Top 3 in first
                years after launch), Positivus Festival (reached Top 10) and Zelta Zivtiņa (TELE2, brand-refresh under
                DDB Latvia, reached #1 most beloved brand in Latvia after re-fresh) among many others. International
                clients have included Nokia, Coca-Cola, NASDAQ, DnB Nord (all GREY), TELE2, Volkswagen, Swedbank (all
                DDB), Ebay UK and others.
              </p>

              <p>
                <strong>Founder / Game Designer: Mission to Mars 2049 board game</strong>
                <br />
                Created, crowd-funded, pitched to venture capital investors and launched an internationally distributed
                board game published in seven languages (English, German, Portuguese, Czech, Slovak, Polish, Latvian),
                sold through global distributors and Amazon FBA (briefly reached Top 20 best selling toys in Germany,
                before selling out of stock by the end of the day). Partnered with National Geographic in Portugal.
                More:{' '}
                <a href="https://fb.com/mars2049" target="_blank">
                  fb.com/mars2049
                </a>
              </p>

              <p>
                <strong>Lecturer at Riga Stradins University</strong>
                <br />
                In 2017 I was given a chance to teach a 3 month UX and product design lecture course to startup
                entrepreneurship students.
              </p>

              <p>
                <strong>VFX artist for feature film "Defenders of Riga"</strong>
                <br />
                After school I briefly worked in a small team of 3D VFX artists for a 2 million dollar budget feature
                film "Defenders of Riga". Mostly as a texture artist, lighting artist, animator, matte painter.
              </p>

              <p>
                <strong>Satori.lv — a platform for critical thought, literature and philosophy</strong>
                <br />
                Between 2001—2003, while still in highschool, I founded, developed and launched{' '}
                <a href="https://satori.lv" target="_blank">
                  satori.lv
                </a>{' '}
                — then a platform to unite like-minded people interested in world class literature, philosophy and
                critical thought in general. It quickly became known due to lack of such projects at the time, is still
                running 24 years later and is currently the #1 culture related non-publically financed internet media in
                Latvia.
              </p>

              <p>
                <strong>First steps — PC assambler, web development</strong>
                <br />
                My first summer job during school in late 90s was as a PC assambler in a Riga-based IT store
                — assambling of custom built PCs, installing bios, OS, drivers, servicing old ones etc. Around that time
                I also started freelancing as a web developer.
              </p>
            </div>
          </section>
        </div>

        <aside className="cv-sidebar">
          <div className="cv-skills-block">
            <h4>Core Dev Stack</h4>
            <ul>
              <li>React / ~8 years</li>
              <li>Next.js / ~5 years</li>
              <li>TypeScript / 9 years</li>
              <li>Node.js / ~6 years</li>
              <li>JavaScript / ~14-24 years</li>
            </ul>
          </div>

          <div className="cv-skills-block">
            <h4>Frontend</h4>
            <ul>
              <li>React</li>
              <li>Next.js</li>
              <li>FE Architecture</li>
              <li>FE Team Lead</li>
              <li>Large Scale UI Design Systems</li>
              <li>State Management</li>
              <li>Responsive-First UI</li>
              <li>Component Libraries</li>
              <li>Unit Testing</li>
              <li>React Native</li>
              <li>Expo / Electron</li>
            </ul>
          </div>

          <div className="cv-skills-block">
            <h4>Backend / Full-Stack</h4>
            <ul>
              <li>Node.js</li>
              <li>REST APIs</li>
              <li>Supabase</li>
              <li>Sanity</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>PHP / SQL</li>
            </ul>
          </div>

          <div className="cv-skills-block">
            <h4>Cloud / DevOps</h4>
            <ul>
              <li>Vercel / Heroku</li>
              <li>Cloudflare Workers</li>
              <li>Docker, Docker-Toolbox</li>
              <li>Azure / Bitbucket</li>
            </ul>
          </div>

          <div className="cv-skills-block">
            <h4>Tooling</h4>
            <ul>
              <li>Git CLI, GitHub, GitLab</li>
              <li>Jira Planning / Jira API</li>
              <li>Jest, Cypress, Husky</li>
              <li>Shell Scripting</li>
              <li>Unix / Linux CLI</li>
              <li>Automation Scripting</li>
              <li>Figma / Adobe CC</li>
            </ul>
          </div>

          <div className="cv-skills-block">
            <h4>AI Tools</h4>
            <ul>
              <li>OpenRouter / OpenAI API</li>
              <li>AI-Assisted Workflow</li>
              <li>Agent Workflow Planning</li>
              <li>AI API Integrations</li>
            </ul>
          </div>

          <div className="cv-skills-block">
            <h4>Product / Team</h4>
            <ul>
              <li>Experience leading medium and small teams</li>
              <li>Hiring developers, creatives</li>
              <li>UX first product architecture</li>
              <li>UX, design and creative direction background</li>
            </ul>
          </div>

          <div className="cv-skills-block">
            <h4>Languages</h4>
            <ul>
              <li>Latvian — Native</li>
              <li>English — Fluent</li>
              <li>Other — Various</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
