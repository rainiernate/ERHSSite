document.addEventListener('DOMContentLoaded', function() {
    let memories = [];

    // Memory submission functionality
    function addMemoryToWall(memory) {
        const newMemoryHtml = `
            <div class="memory-card">
                <div class="card-front">
                    <h3>${memory.title}</h3>
                    <p class="memory-year">${memory.year}</p>
                </div>
                <div class="card-content">
                    <p>${memory.description}</p>
                    <small class="text-muted">Shared on ${memory.date}</small>
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

        if (!title || !description || !year) {
            alert('Please fill in all fields');
            return;
        }

        const memory = {
            title: title,
            description: description,
            year: year,
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

    // Add some sample memories
    const sampleMemories = [
        {
            title: "First Day at ERHS",
            description: "Test!",
            year: "2001",
            date: "2024-01-15"
        },
        {
            title: "Cafeteria",
            description: "Food!",
            year: "2005",
            date: "2024-01-15"
        }
    ];

    // Add sample memories to wall
    sampleMemories.forEach(memory => {
        memories.push(memory);
        addMemoryToWall(memory);
    });

    // Load existing memories from localStorage
    const storedMemories = JSON.parse(localStorage.getItem('memories') || '[]');
    storedMemories.forEach(memory => {
        memories.push(memory);
        addMemoryToWall(memory);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
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
