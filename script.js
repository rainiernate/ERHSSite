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
            navbar.style.backgroundColor = 'rgba(26, 35, 126, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-color)';
        }
    });
});
