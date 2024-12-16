document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                // Here you would typically send the form data to a server
                const formData = new FormData(form);
                console.log('Form submitted:', Object.fromEntries(formData));
                alert('Thank you for your submission! We will be in touch soon.');
                form.reset();
            }
            
            form.classList.add('was-validated');
        });
    });

    // Smooth scrolling for navigation links
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

    // Pre-registration form handling
    const preRegisterForm = document.getElementById('preRegisterForm');
    if (preRegisterForm) {
        preRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(preRegisterForm);
            console.log('Pre-registration submitted:', Object.fromEntries(formData));
            alert('Thank you for pre-registering! We will keep you updated.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            modal.hide();
            preRegisterForm.reset();
        });
    }

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

    // Memory submission functionality
    let memories = [];

    // Handle both "Share Memory" buttons
    document.querySelectorAll('#addMemoryBtn, #addMemoryButton').forEach(button => {
        button.addEventListener('click', function() {
            const memoryModal = document.getElementById('memoryModal');
            const modal = bootstrap.Modal.getInstance(memoryModal);
            if (!modal) {
                bootstrap.Modal.getOrCreateInstance(memoryModal).show();
            } else {
                modal.show();
            }
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
        addMemoryToCarousel(memory);
        
        // Clear form and close modal
        document.getElementById('memoryForm').reset();
        const memoryModal = document.getElementById('memoryModal');
        const modal = bootstrap.Modal.getInstance(memoryModal);
        modal.hide();
    });

    function addMemoryToCarousel(memory) {
        const newMemoryHtml = `
            <div class="carousel-item ${document.querySelectorAll('.carousel-item').length === 0 ? 'active' : ''}">
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
            </div>
        `;

        document.querySelector('.carousel-inner').insertAdjacentHTML('beforeend', newMemoryHtml);
        
        // Initialize carousel if it's the first item
        if (memories.length === 1) {
            new bootstrap.Carousel(document.getElementById('memoriesCarousel'));
        }
    }

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

    // Add sample memories to carousel
    sampleMemories.forEach(memory => {
        memories.push(memory);
        addMemoryToCarousel(memory);
    });

    function getYearLabel(yearValue) {
        const yearLabels = {
            'freshman': 'Freshman Year (2001-2002)',
            'sophomore': 'Sophomore Year (2002-2003)',
            'junior': 'Junior Year (2003-2004)',
            'senior': 'Senior Year (2004-2005)'
        };
        return yearLabels[yearValue] || yearValue;
    }

    function saveMemoryToStorage(memory, imageUrl) {
        const memories = JSON.parse(localStorage.getItem('memories') || '[]');
        memories.push({ ...memory, imageUrl });
        localStorage.setItem('memories', JSON.stringify(memories));
    }

    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1050;';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;

        document.getElementById('toastContainer').appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    // Load existing memories
    const storedMemories = JSON.parse(localStorage.getItem('memories') || '[]');
    storedMemories.forEach(memory => {
        addMemoryToCarousel(memory);
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
});
