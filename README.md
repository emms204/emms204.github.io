# GitHub Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript, designed to showcase your GitHub projects and achievements.

## Features

- 🎨 Modern, gradient-based design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 🔗 Direct links to your GitHub repositories
- 📊 Dynamic GitHub stats integration
- 🎯 Clean, professional layout

## Deployment to GitHub Pages

### Method 1: Using a Dedicated Repository (Recommended)

1. **Create a new repository** on GitHub:
   - Go to https://github.com/new
   - Repository name: `emms204.github.io` (replace `emms204` with your username)
   - Make it public
   - Don't initialize with README (you already have files)

2. **Push your files to GitHub**:
   ```bash
   cd "/home/emms/Downloads/github portfolio"
   git init
   git add .
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

### Method 2: Using a Project Repository

If you want to keep the portfolio in this repository:

1. **Push to your existing repository**:
   ```bash
   cd "/home/emms/Downloads/github portfolio"
   git init
   git add .
   git commit -m "Add portfolio website"
   git branch -M main
   git remote add origin https://github.com/emms204/your-repo-name.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**, Folder: **/ (root)**
   - Your site will be at: `https://emms204.github.io/your-repo-name/`

## Customization

### Update Your Information

1. **Personal Details**: Edit `index.html`:
   - Change the hero title and subtitle
   - Update the about section
   - Modify project descriptions

2. **Projects**: Update the project cards in the Projects section:
   - Change project titles, descriptions
   - Update GitHub repository links
   - Modify technology tags

3. **Skills**: Edit the skills section to match your expertise

4. **Colors**: Modify CSS variables in `styles.css`:
   ```css
   :root {
       --primary-color: #6366f1;
       --secondary-color: #8b5cf6;
       --accent-color: #ec4899;
   }
   ```

### Add More Projects

To add more projects, copy a project card in `index.html`:

```html
<div class="project-card">
    <div class="project-icon">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3 class="project-title">Project Name</h3>
    <p class="project-description">Project description here.</p>
    <div class="project-tech">
        <span class="tech-tag">Technology</span>
    </div>
    <a href="https://github.com/emms204/repo-name" target="_blank" class="project-link">
        View on GitHub <i class="fas fa-external-link-alt"></i>
    </a>
</div>
```

## File Structure

```
github portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Font Awesome (for icons)
- GitHub Pages (for hosting)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips

- **Custom Domain**: You can add a custom domain in GitHub Pages settings
- **GitHub API**: The site includes optional GitHub API integration for live stats
- **SEO**: Add meta tags in the `<head>` section for better SEO
- **Analytics**: Consider adding Google Analytics or similar for visitor tracking

## License

Feel free to use this template for your own portfolio!

## Support

If you encounter any issues:
1. Check GitHub Pages documentation: https://docs.github.com/en/pages
2. Verify your repository settings
3. Ensure all file paths are correct

---

**Happy coding! 🚀**

