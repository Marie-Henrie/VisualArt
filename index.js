document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            const src = img.getAttribute('src');
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
    });

    const links = document.querySelectorAll('.open-text-modal');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const textModal = document.getElementById('textModal');
            textModal.style.display = 'flex';

            const closeBtn = textModal.querySelector('.close');
            closeBtn.addEventListener('click', function() {
                textModal.style.display = 'none';
            });
        });
    });
});