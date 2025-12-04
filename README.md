# omd-press (open markdown press)

> **Version**: beta 1.0  
> **License**: MIT

![the-it-crowd-chris-odowd](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWVram9meWxoNGJxaDd5bmlmMWU0N2lvNjg2aHZhZXJvY3ozdW10eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1C8bHHJturSx2/giphy.gif)

**omd-press** is a lightweight, open-source blogging platform powered by Markdown and JavaScript. It allows you to publish articles easily without the need for a complex backend or database.

## 🚀 Features

- **Markdown Support**: Write your articles in simple Markdown.
- **No Database Required**: Uses JSON/Markdown files for content storage.
- **Customizable Themes**: Easily switch or create new themes.
- **Plugin System**: Extend functionality with plugins.
- **Fast & Lightweight**: Pure JavaScript implementation.

## 🛠 Usage

### Prerequisites
- A modern web browser.
- A local web server (e.g., VS Code Live Server, Python `http.server`, or Node.js `http-server`) is recommended for testing to avoid CORS issues with local file fetching.

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/oemerfaruk/omd-press
    ```
2.  Navigate to the project directory:
    ```bash
    cd omd-press
    ```
3.  Open `index.html` in your browser (via a local server).

### Adding Content
1.  Add your article content (Markdown or HTML) to the `db/` folder (or configured content directory).
2.  Update the `db/article.json` (or equivalent index file) to include metadata for your new post (title, date, slug, etc.).

## 💻 Development

### Project Structure
- `index.html`: The main entry point (Homepage).
- `blog.html`: The article view template.
- `js/`: Core JavaScript logic (`utils.js`, `home.js`, `article.js`).
- `theme/`: CSS and theme-related assets.
- `plugins/`: Optional plugins to extend functionality.
- `db/`: Data storage (JSON/Markdown).

### Customization
- **Themes**: Modify files in `theme/` to change the look and feel.
- **Logic**: Edit `js/` files to change core behavior.

## 📦 Publishing

To publish your blog, you can host it on any static site hosting provider:

1.  **GitHub Pages**:
    - Push your code to a GitHub repository.
    - Go to Settings > Pages and select the `main` branch as the source.
2.  **Netlify / Vercel**:
    - Connect your repository and deploy. No build command is usually needed if it's purely static.
3.  **FTP/SFTP**:
    - Upload all files to your web server's public directory.

## 📄 License

This project is licensed under the **MIT License**.

---
*Created with ❤️ by the omd-press team.*
