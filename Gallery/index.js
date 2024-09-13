document.addEventListener('DOMContentLoaded', function() {
    const numberOfImages = 30; // Adjust based on the total number of images available

    // Function to fetch and parse stories from the JSON file
    function fetchStories(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch stories: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Parsed stories:', data); // Debugging line
                return data;
            })
            .catch(error => {
                console.error('Error in fetchStories:', error);
                return {}; // Return an empty object in case of an error
            });
    }

    // Function to create the gallery HTML
    function createGallery(stories) {
        const galleryContainer = document.querySelector('.gallery');
        galleryContainer.innerHTML = ''; // Clear any existing content

        for (let i = 1; i <= numberOfImages; i++) {
            const filename = `image${i}.jpg`;
            const src = `images/${filename}`;
            const caption = `Image ${i}`;
            const story = stories[filename]?.story || 'No story available';

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = src;
            img.alt = caption;

            const figcaption = document.createElement('figcaption');
            figcaption.innerHTML = caption;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            galleryContainer.appendChild(figure);

            // Add click event for image modal
            img.addEventListener('click', function() {
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">×</span>
                        <img src="${src}" alt="Photo">
                    </div>
                `;
                document.body.appendChild(modal);

                const closeBtn = modal.querySelector('.close');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            });

            // Add click event for text modal
            figcaption.addEventListener('click', function() {
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">×</span>
                        <p>${story}</p>
                    </div>
                `;
                document.body.appendChild(modal);

                const closeBtn = modal.querySelector('.close');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            });
        }
    }

    // Load stories and create gallery
    fetchStories('data/stories.json').then(stories => {
        createGallery(stories);
    }).catch(error => {
        console.error('Error loading stories:', error);
    });
});
