document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    initTheme();

    // Fetch Configuration (Optional for now, but good for future)
    fetchConfig().then(config => {
        // Could update site title or logo here if needed
    });

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));

    if (!articleId) {
        document.getElementById('article-content').innerHTML = '<p>Article not found.</p>';
        return;
    }

    fetch(`${BASE_URL}article.json`)
        .then(response => response.json())
        .then(data => {
            const article = data.article.find(a => a.id === articleId);
            
            if (article) {
                document.title = article.title;
                
                const articleUrl = `${BASE_URL}articles/${article.link}`;

                fetch(articleUrl)
                    .then(response => {
                        if (!response.ok) throw new Error('Markdown file not found');
                        return response.text();
                    })
                    .then(markdown => {
                        const contentDiv = document.getElementById('article-content');
                        
                        let thumbnailSrc = article.thumbnail;
                        if (!thumbnailSrc.startsWith('http')) {
                            thumbnailSrc = `${BASE_URL}${thumbnailSrc}`;
                        }

                        // Create header
                        const header = `
                            <h1>${article.title}</h1>
                            <p class="article-date"><em>By ${article.author} on ${new Date(article.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
                            <img src="${thumbnailSrc}" alt="${article.title}">
                            <hr>
                        `;
                        
                        // Configure marked to handle image URLs
                        const renderer = new marked.Renderer();
                        const originalImage = renderer.image;
                        
                        renderer.image = function(href, title, text) {
                            // If it's an absolute URL (http/https), leave it alone
                            if (href.startsWith('http')) {
                                return originalImage.call(this, href, title, text);
                            }
                            
                            // Otherwise, prepend the BASE_URL
                            let cleanHref = href;
                            if (cleanHref.startsWith('/')) {
                                cleanHref = cleanHref.substring(1);
                            }
                            
                            const newUrl = `${BASE_URL}${cleanHref}`;
                            return originalImage.call(this, newUrl, title, text);
                        };

                        marked.use({ renderer: renderer });

                        // Parse markdown
                        contentDiv.innerHTML = header + marked.parse(markdown);

                        // Initialize Share Plugin
                        if (typeof initShare === 'function') {
                            initShare(article);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching markdown:', error);
                        document.getElementById('article-content').innerHTML = '<p>Error loading article content. Please try again later.</p>';
                    });
            } else {
                document.getElementById('article-content').innerHTML = '<p>Article not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching article data:', error));

    // Reading Progress Bar
    window.addEventListener('scroll', () => {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }
    });
});
