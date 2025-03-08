# ShanghaiWalk Website

A bilingual (Chinese and English) website dedicated to showcasing and promoting the local culture of Shanghai.

## Project Overview

ShanghaiWalk is a comprehensive cultural website that introduces visitors to Shanghai's rich history, language, opera, and cultural experiences. The website features:

- **Multilingual Support**: Toggle between Chinese and English with user preferences stored using `localStorage`.
- **Responsive Design**: Adaptive layouts for various devices using CSS media queries.
- **Timeline Display**: Interactive historical timeline utilizing JavaScript and the Intersection Observer API.
- **Cultural Introduction**: Detailed sections on Shanghai's culture, including dialects, opera, and lane culture.
- **Team Introduction**: Team member profiles displayed in a card format.
- **Events and Activities**: Listings of city walk events with comprehensive details.
- **Social Media and Contact Information**: QR codes for social media platforms and contact details.

## Project Structure

```
ShanghaiWalk Website/
├── index.html              # Homepage
├── about.html              # About Us page
├── contact.html            # Contact information page
├── shanghai-walk.html      # City walks and timeline page
├── shanghainese.html       # Shanghai dialect page
├── shanghai-opera.html     # Shanghai Opera page
├── style.css               # Main stylesheet
├── main.js                 # Main JavaScript functionality
├── timeline.js             # Timeline functionality
├── timeline-animation.js   # Timeline animation effects
└── images/                 # Image assets directory
    ├── timeline picture/   # Timeline images
    └── ...                 # Other images
```

## Features

### Multilingual Support

The website supports both Chinese and English languages. Users can switch between languages using the language toggle buttons in the header or floating navigation. Language preferences are saved using `localStorage` for a consistent experience across visits.

### Responsive Design

The website is fully responsive and adapts to different screen sizes:
- Desktop: Full layout with horizontal navigation
- Mobile: Compact layout with dropdown navigation and optimized content display

### Timeline Display

The Shanghai historical timeline provides an interactive journey through the city's development from the late 19th century to the present day. Features include:

- Era-based organization
- Interactive timeline items that expand on click
- Automatic image matching based on year
- Smooth animations using Intersection Observer

### Cultural Content

The website offers rich cultural content across multiple pages:
- Shanghai dialect introduction and basic phrases
- Shanghai Opera art features and classic plays
- Lane (Longtang) culture and architectural heritage
- City walk events with detailed information

## Development

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- A modern web browser
- A code editor (VS Code, Sublime Text, etc.)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shanghaiwalk-website.git
```

2. Open the project folder in your code editor

3. Launch the website by opening `index.html` in your browser

### Deployment

The website can be deployed to any standard web hosting service or GitHub Pages:

1. For GitHub Pages:
   - Push the repository to GitHub
   - Enable GitHub Pages in the repository settings
   - Select the branch to deploy (usually `main` or `master`)

2. For traditional web hosting:
   - Upload all files to your web server via FTP
   - Ensure the file structure is maintained

## Accessibility

The website follows accessibility best practices:
- Semantic HTML structure
- ARIA roles and attributes
- Keyboard navigation support
- Sufficient color contrast
- Alternative text for images

## Browser Compatibility

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

Contributions to improve the website are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All team members who contributed to the project
- Shanghai cultural experts who provided content guidance
- Open source libraries and tools used in development

---

© 2024 ShanghaiWalk. All rights reserved.