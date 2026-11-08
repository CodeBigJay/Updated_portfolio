CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Development',
  repo_url TEXT NOT NULL DEFAULT '',
  live_url TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  gallery TEXT NOT NULL DEFAULT '[]',
  documents TEXT NOT NULL DEFAULT '[]',
  tech_stack TEXT NOT NULL DEFAULT '[]',
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_projects_public_order ON projects(published, featured, created_at);

INSERT OR IGNORE INTO projects (
  id, title, description, category, repo_url, tech_stack, featured, published
) VALUES (
  'portfolio-site',
  'Personal Portfolio',
  'A responsive portfolio built with React and TypeScript, designed to present selected work, technical skills and experience in one place.',
  'Web development',
  'https://github.com/CodeBigJay/Updated_portfolio',
  '["React","TypeScript","Vite","Cloudflare"]',
  1,
  1
);
