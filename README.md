# ERHS Class of 2025 Reunion Website

A modern, responsive website for the Emerald Ridge High School Class of 2025 reunion.

## Features

- Responsive design that works on all devices
- Pre-registration system
- Updates signup form
- Contact information
- Modern UI with animations
- Bootstrap 5 framework
- Docker container ready

## Local Development

1. Clone this repository
2. Open `index.html` in your browser to view the site locally

## Docker Deployment

To build and run the Docker container:

```bash
# Build the Docker image
docker build -t erhs-reunion .

# Run the container
docker run -d -p 8080:80 erhs-reunion
```

The website will be available at `http://localhost:8080`

## GoDaddy Deployment

To deploy to GoDaddy:

1. Log in to your GoDaddy hosting account
2. Upload all files to the public_html directory
3. Update the contact email in index.html to your actual email address
4. Update the Font Awesome kit code in index.html with your actual kit code

## Directory Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
├── Dockerfile      # Docker configuration
└── README.md       # This file
```

## Customization

- Update the colors in `styles.css` by modifying the CSS variables in the `:root` selector
- Add your school's background image to the `images` directory and update the path in `styles.css`
- Modify the content in `index.html` to match your specific event details

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a private project for ERHS Class of 2025. Please contact the administrator for any changes or suggestions.

## License

All rights reserved. This project is private and confidential.
