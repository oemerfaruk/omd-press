document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    initTheme();

    let articles = []; // Store fetched articles

    // Fetch Configuration
    fetchConfig().then(config => {
        // Update Site Title
        if (config.site_title) {
            document.title = config.site_title;
            document.querySelector('header h1').textContent = config.site_title;
        }
    });

    // Fetch Articles
    fetch(`${BASE_URL}article.json`)
        .then(response => response.json())
        .then(data => {
            articles = data.article;
            renderArticles(articles);
        })
        .catch(error => console.error('Error fetching articles:', error));

    // Layout Switching
    const layoutBtns = document.querySelectorAll('.layout-btn');
    const articleList = document.getElementById('article-list');

    layoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            layoutBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            const layout = btn.getAttribute('data-layout');
            if (layout === 'grid') {
                articleList.classList.add('grid-view');
            } else {
                articleList.classList.remove('grid-view');
            }
        });
    });

    // Sorting
    const sortBtns = document.querySelectorAll('.sort-btn');
    
    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            sortBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            const sortValue = btn.getAttribute('data-sort');
            sortArticles(sortValue);
        });
    });

    function sortArticles(criteria) {
        let sortedArticles = [...articles];
        if (criteria === 'newest') {
            sortedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (criteria === 'oldest') {
            sortedArticles.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        
        // Re-apply search filter if needed
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        if (searchTerm) {
            sortedArticles = sortedArticles.filter(article => article.title.toLowerCase().includes(searchTerm));
        }
        renderArticles(sortedArticles);
    }

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const activeSortBtn = document.querySelector('.sort-btn.active');
            const sortCriteria = activeSortBtn ? activeSortBtn.getAttribute('data-sort') : 'newest';
            
            let filtered = articles.filter(article => article.title.toLowerCase().includes(searchTerm));
            
            if (sortCriteria === 'newest') {
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (sortCriteria === 'oldest') {
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
            
            renderArticles(filtered);
        });
    }

    function renderArticles(articlesToRender) {
        const articleList = document.getElementById('article-list');
        articleList.innerHTML = ''; // Clear current list

        articlesToRender.forEach((article, index) => {
            const card = document.createElement('div');
            card.className = 'article-card';
            card.style.opacity = '0';
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
            
            const thumbnail = document.createElement('img');
            // Check if thumbnail is an absolute URL or relative path
            if (article.thumbnail.startsWith('http')) {
                thumbnail.src = article.thumbnail;
            } else {
                thumbnail.src = `${BASE_URL}${article.thumbnail}`;
            }
            thumbnail.alt = article.title;
            thumbnail.className = 'article-thumbnail';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'article-content';
            
            const title = document.createElement('h2');
            title.className = 'article-title';
            const link = document.createElement('a');
            link.href = `blog.html?id=${article.id}`;
            link.textContent = article.title;
            title.appendChild(link);
            
            const meta = document.createElement('p');
            meta.className = 'article-meta';
            meta.textContent = `${article.date} | ${article.author}`;
            
            const description = document.createElement('p');
            description.className = 'article-description';
            description.textContent = article.description;
            
            contentDiv.appendChild(title);
            contentDiv.appendChild(meta);
            contentDiv.appendChild(description);

            const readMoreBtn = document.createElement('a');
            readMoreBtn.href = `blog.html?id=${article.id}`;
            // Arrow Right Icon
            readMoreBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.setAttribute('aria-label', 'Read Article');
            
            card.appendChild(thumbnail);
            card.appendChild(contentDiv);
            card.appendChild(readMoreBtn);
            
            articleList.appendChild(card);
        });
    }
});
