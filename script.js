document.addEventListener('DOMContentLoaded', function() {
    let memories = [];

    // Memory submission functionality
    function addMemoryToWall(memory) {
        const photoHtml = memory.photo ? `<img src="${memory.photo}" alt="Memory photo" class="memory-photo">` : '';
        const newMemoryHtml = `
            <div class="memory-card">
                <div class="card-front">
                    <h3>${memory.title}</h3>
                    <p class="memory-year">${memory.year}</p>
                </div>
                <div class="card-content">
                    ${photoHtml}
                    <p>${memory.description}</p>
                    <div class="memory-footer">
                        <small class="text-muted">Shared by ${memory.author} on ${memory.date}</small>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.memories-wall').insertAdjacentHTML('beforeend', newMemoryHtml);
    }

    // Handle both "Share Memory" buttons
    document.querySelectorAll('#addMemoryBtn, #addMemoryButton').forEach(button => {
        button.addEventListener('click', function() {
            const memoryModal = document.getElementById('memoryModal');
            const modal = new bootstrap.Modal(memoryModal);
            modal.show();
        });
    });

    // Handle memory form submission
    document.getElementById('submitMemory').addEventListener('click', function() {
        const title = document.getElementById('memoryTitle').value;
        const description = document.getElementById('memoryDescription').value;
        const year = document.getElementById('memoryYear').value;
        const author = document.getElementById('memoryAuthor').value;
        const photoInput = document.getElementById('memoryPhoto');

        if (!title || !description || !year || !author) {
            alert('Please fill in all required fields');
            return;
        }

        // Handle photo upload
        const handlePhotoUpload = () => {
            return new Promise((resolve) => {
                if (photoInput.files && photoInput.files[0]) {
                    const file = photoInput.files[0];
                    if (file.size > 5 * 1024 * 1024) { // 5MB limit
                        alert('Photo size must be less than 5MB');
                        resolve(null);
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = () => resolve(null);
                    reader.readAsDataURL(file);
                } else {
                    resolve(null);
                }
            });
        };

        handlePhotoUpload().then(photoData => {
            const memory = {
                title: title,
                description: description,
                year: year,
                author: author,
                photo: photoData,
                date: new Date().toLocaleDateString()
            };

            memories.push(memory);
            addMemoryToWall(memory);
            
            // Clear form and close modal
            document.getElementById('memoryForm').reset();
            const memoryModal = document.getElementById('memoryModal');
            const modal = bootstrap.Modal.getInstance(memoryModal);
            modal.hide();

            // Save to localStorage
            localStorage.setItem('memories', JSON.stringify(memories));
        });
    });

    // Load existing memories from localStorage
    const storedMemories = JSON.parse(localStorage.getItem('memories') || '[]');
    storedMemories.forEach(memory => {
        memories.push(memory);
        addMemoryToWall(memory);
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'var(--primary-green)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
            navbar.style.boxShadow = 'none';
        }
    });
});
