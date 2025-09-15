# PM Internship Finder - AI-Powered Recommendation System

An intelligent internship recommendation platform that uses machine learning algorithms to match candidates with the most suitable internship opportunities.

## Features

- **AI-Powered Matching**: Advanced machine learning algorithms analyze candidate profiles and internship requirements to provide personalized recommendations
- **Multi-language Support**: Available in English and Hindi
- **Interactive Onboarding**: Step-by-step profile building process
- **Real-time ML Insights**: Shows prediction confidence, semantic similarity, and match scores
- **User Feedback Integration**: Collects user preferences to improve future recommendations
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React 18, Tailwind CSS
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Create React App

## ML Features

The system simulates advanced machine learning capabilities including:

- Semantic similarity analysis using skill matching
- Collaborative filtering based on user behavior patterns
- Click-through rate predictions
- Confidence scoring for recommendations
- Multi-factor ranking algorithms

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/internship-finder.git
cd internship-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Project Structure

```
internship-finder/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── InternshipRecommendationSystem.jsx
│   ├── data/
│   │   ├── translations.js
│   │   └── mockData.js
│   ├── utils/
│   │   └── mlEngine.js
│   ├── styles/
│   │   └── index.css
│   ├── App.js
│   ├── index.js
│   └── App.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Key Components

### InternshipRecommendationSystem
The main component that handles the entire user journey from profile creation to recommendation display.

### ML Engine (`src/utils/mlEngine.js`)
Contains the machine learning simulation logic:
- `calculateSemanticSimilarity()`: Analyzes skill overlap and context matching
- `getMLRecommendations()`: Main recommendation algorithm with multi-factor scoring

### Data Layer (`src/data/`)
- `translations.js`: Multi-language support
- `mockData.js`: Sample internship data and configuration

## ML Algorithm Details

The recommendation system uses a multi-factor approach:

1. **Semantic Similarity (35% weight)**: Analyzes skill overlap using Jaccard similarity and contextual matching
2. **Location Preference (15% weight)**: Matches user location preferences
3. **Sector Preference (20% weight)**: Aligns with preferred industry sectors
4. **Historical Performance (18% weight)**: Considers popularity, click rates, and ratings
5. **Other Factors (12% weight)**: Stipend appeal, time-based features, engagement prediction

### Scoring Formula
```
ML Score = Σ(feature_value × weight)
Click Probability = sigmoid(ML_Score × 8 - 4)
Confidence = min(ML_Score + popularity_boost, 1)
```

## Customization

### Adding New Languages
1. Add translations to `src/data/translations.js`
2. Update the language selector in the main component

### Adding New Internships
Update the `mockInternships` array in `src/data/mockData.js`

### Modifying ML Weights
Adjust the weights object in `src/utils/mlEngine.js` to change recommendation priorities

## API Integration

To integrate with a real backend:

1. Replace mock data with API calls in the ML engine
2. Add authentication endpoints
3. Implement user feedback collection
4. Add real-time model updates

## Performance Considerations

- Components use React.memo for optimization where appropriate
- Tailwind CSS classes are purged in production builds
- Images and icons are optimized for web delivery

## Accessibility Features

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color schemes
- Semantic HTML structure
- Focus indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Real ML model integration with TensorFlow.js
- User authentication and profile persistence
- Advanced filtering and sorting options
- Company and internship reviews system
- Mobile app development
- Real-time chat with recruiters
- Video interview scheduling
- Skills assessment integration

## Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**Note**: This is a demonstration project showcasing ML-powered recommendation systems. The machine learning features are simulated for educational purposes.