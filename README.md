# GitHub Portfolio Website

A modern, responsive portfolio website with an **agentic AI analysis pipeline** to help you decide which repositories to showcase.

## Features

- 🎨 Modern, gradient-based design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 🔗 Direct links to your GitHub repositories
- 📊 **Repository analysis pipeline** to help you decide what to display
- 🎯 Clean, professional layout
- 🏷️ Category filtering for projects

## Repository Analysis Pipeline

The pipeline helps you **analyze and decide** which repositories to feature - it doesn't auto-generate your portfolio, giving you full control.

### Quick Start

1. **Fetch and analyze your repositories**:
   ```bash
   python3 run_pipeline.py --username emms204 --summary
   ```

2. **Review the analysis**:
   - Check `data/repos_summary.md` for a quick overview
   - Review `analysis_report.json` for detailed insights
   - See recommendations for which repos to feature

3. **Manually update your portfolio**:
   - Use the analysis to decide which repos to display
   - Update `index.html` with your selected repositories
   - (Optional) Use `generate_portfolio.py` for HTML snippets

### Pipeline Components

#### 1. Fetch Repositories (`scripts/fetch_github_repos.py`)
Fetches all your GitHub repositories and computes display scores.

**Usage:**
```bash
python3 scripts/fetch_github_repos.py emms204 --include-languages
```

**Outputs:**
- `data/repos.json` - Raw normalized repository data
- `data/repos_ranked.json` - Repositories sorted by display score
- `data/repos_summary.md` - Markdown table of top picks

#### 2. Analyze Repositories (`analyze_repos.py`)
Analyzes repositories and provides insights and recommendations.

**Usage:**
```bash
# Basic analysis
python3 analyze_repos.py --input data/repos_ranked.json --summary

# With AI agent (analyzes repository contents)
python3 analyze_repos.py --input data/repos_ranked.json --summary --use-ai
```

**Outputs:**
- `analysis_report.json` - Detailed analysis with:
  - Category breakdowns
  - Technology stack analysis
  - Activity statistics
  - Recommendations for featured repos
  - Display notes and suggestions
  - **AI analysis** (if `--use-ai` flag used): Intelligent scoring based on actual code content

#### 2b. AI Agent Analysis (`repo_agent.py`)
🤖 **NEW**: AI-powered repository analysis that examines actual code and files!

The AI agent:
- Fetches repository files (README, code samples, etc.)
- Uses OpenAI to analyze code quality, completeness, and portfolio-worthiness
- Provides intelligent scoring (0-10) and recommendations
- Gives detailed summaries and reasoning

**Usage:**
```bash
# Analyze all eligible repos (uses OpenAI API - costs apply)
python3 repo_agent.py --max-repos 10

# Analyze a specific repo
python3 repo_agent.py --repo-name "DevGenie"

# Skip file fetching (faster, less detailed)
python3 repo_agent.py --skip-files
```

**Requirements:**
- Set `OPENAI_API_KEY` in `.env` file
- Install: `pip install openai python-dotenv`

#### 3. Generate HTML Snippets (Optional) (`generate_portfolio.py`)
Optional helper to generate HTML snippets for selected repositories.

**Usage:**
```bash
python3 generate_portfolio.py --use-recommendations
```

**Note:** This is just a helper - you should manually review and customize the output.

### Full Pipeline

Run everything at once:
```bash
# Basic pipeline
python3 run_pipeline.py --username emms204 --include-languages --summary

# With AI analysis (requires OPENAI_API_KEY in .env)
python3 analyze_repos.py --use-ai --summary
```

### Understanding the Analysis

The analysis provides:

- **Display Scores**: Each repo gets a score based on:
  - Stars and forks (popularity)
  - Recent activity (recency)
  - Description and topics (completeness)
  - Homepage availability (polish)
  - Not being archived/forked (originality)

- **Categories**: Repos are automatically categorized (Computer Vision, AI/ML, etc.)

- **Recommendations**: 
  - Suggested featured repositories
  - Top repos per category
  - Display notes (e.g., repos with live demos)

- **Statistics**: 
  - Total stars, forks
  - Activity breakdown (active/stale/dormant)
  - Technology stack analysis

## Deployment to GitHub Pages

### Method 1: Using a Dedicated Repository (Recommended)

1. **Create a new repository** on GitHub:
   - Go to https://github.com/new
   - Repository name: `emms204.github.io` (replace `emms204` with your username)
   - Make it public

2. **Push your files to GitHub**:
   ```bash
   git init
   git add index.html styles.css script.js README.md
   git commit -m "Initial portfolio website"
   git branch -M main
   git remote add origin https://github.com/emms204/emms204.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

4. **Access your site**:
   - Your portfolio will be live at: `https://emms204.github.io`
   - It may take a few minutes to deploy

## Customization

### Update Your Information

1. **Personal Details**: Edit `index.html`:
   - Change the hero title and subtitle
   - Update the about section

2. **Projects**: Based on your analysis, manually add/update project cards:
   ```html
   <div class="project-card">
       <div class="project-icon">
           <i class="fas fa-icon-name"></i>
       </div>
       <h3 class="project-title">Project Name</h3>
       <p class="project-description">Description here.</p>
       <div class="project-tech">
           <span class="tech-tag">Technology</span>
       </div>
       <a href="https://github.com/emms204/repo" target="_blank" class="project-link">
           View on GitHub <i class="fas fa-external-link-alt"></i>
       </a>
   </div>
   ```

3. **Colors**: Modify CSS variables in `styles.css`:
   ```css
   :root {
       --primary-color: #6366f1;
       --secondary-color: #8b5cf6;
       --accent-color: #ec4899;
   }
   ```

## File Structure

```
github portfolio/
├── index.html              # Main HTML file (manually updated)
├── styles.css              # All styling
├── script.js               # JavaScript functionality
├── run_pipeline.py         # Main pipeline runner
├── analyze_repos.py        # Repository analysis tool
├── generate_portfolio.py   # Optional HTML snippet generator
├── scripts/
│   └── fetch_github_repos.py  # Repository fetcher
├── data/                   # Generated data (gitignored)
│   ├── repos.json
│   ├── repos_ranked.json
│   └── repos_summary.md
├── analysis_report.json    # Analysis output (gitignored)
└── README.md               # This file
```

## Requirements

```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install requests openai python-dotenv
```

**For AI Agent (optional):**
- Set `OPENAI_API_KEY` in `.env` file
- The AI agent uses `gpt-4o-mini` by default (cost-effective)
- You can analyze ~10 repos for ~$0.10-0.50 depending on repo size

## Workflow Example

1. **Initial Setup**:
   ```bash
   # Fetch and analyze repositories
   python3 run_pipeline.py --username emms204 --include-languages --summary
   ```

2. **AI-Powered Analysis (Recommended)**:
   ```bash
   # Use AI to analyze repository contents and get intelligent scoring
   python3 analyze_repos.py --use-ai --summary
   # Or analyze specific repos with the agent
   python3 repo_agent.py --max-repos 10
   ```

3. **Review Analysis**:
   ```bash
   # View the summary
   cat data/repos_summary.md
   
   # Or check the detailed report
   cat analysis_report.json
   ```

4. **Decide What to Display**:
   - Review recommendations in `analysis_report.json`
   - Check `data/repos_ranked.json` for all repos sorted by score
   - Select repos that best represent your work

5. **Update Portfolio**:
   - Manually edit `index.html` with your selected repositories
   - Or use `generate_portfolio.py` for snippets (then customize)

6. **Deploy**:
   - Commit and push to GitHub
   - Enable GitHub Pages

## Tips

- **Run the pipeline periodically** to keep your analysis up-to-date
- **Use GitHub token** for higher rate limits: `export GITHUB_TOKEN=your_token`
- **Review activity buckets**: Focus on "active" repos for better impression
- **Check for homepages**: Repos with live demos are great for showcasing
- **Category organization**: Group related projects together

## Technologies Used

- HTML5, CSS3, JavaScript
- Python 3 (for analysis pipeline)
- GitHub API
- Font Awesome (for icons)
- GitHub Pages (for hosting)

## License

Feel free to use this template for your own portfolio!

---

**Happy coding! 🚀**
