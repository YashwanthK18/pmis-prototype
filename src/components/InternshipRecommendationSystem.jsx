import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Clock, DollarSign, Star, Filter, User, Briefcase, 
  ChevronRight, ChevronLeft, GraduationCap, Code, MapPinIcon,
  CheckCircle, Globe, Smartphone, Computer, Brain, TrendingUp, Users,
  Target, Zap, Database
} from 'lucide-react';

// Inline data to avoid import issues
const translations = {
  en: {
    title: "PM Internship Finder",
    subtitle: "AI-powered recommendations using machine learning",
    step1Title: "Education Level",
    step1Subtitle: "What's your current education status?",
    step2Title: "Your Skills",
    step2Subtitle: "Select skills you have or want to develop",
    step3Title: "Preferences",
    step3Subtitle: "Where would you like to work?",
    next: "Next",
    back: "Back",
    findInternships: "Find My Internships",
    addSkill: "Add Skill",
    selectSkill: "Select a skill",
    preferredSector: "Preferred Sector",
    preferredLocation: "Preferred Location",
    anySector: "Any Sector",
    anyLocation: "Any Location",
    recommendations: "AI-Powered Recommendations",
    modifyProfile: "Modify Profile",
    whySuggested: "ML Insights",
    skillsMatch: "skills similarity",
    semanticMatch: "semantic match",
    sectorMatch: "sector preference",
    locationMatch: "location preference",
    mlConfidence: "AI confidence",
    clickProbability: "Predicted interest",
    applyNow: "Apply Now",
    interested: "I'm Interested",
    notInterested: "Not for me",
    noResults: "No matching internships found. Try adjusting your preferences.",
    loading: "Training AI models and finding perfect matches...",
    analyzingProfile: "Analyzing your profile with ML algorithms...",
    month: "month",
    months: "months",
    step: "Step",
    of: "of",
    mlPowered: "ML-Powered",
    aiInsights: "AI Insights",
    predictionAccuracy: "Prediction Accuracy",
    userFeedback: "Thanks for your feedback! Our ML models are learning from your preferences."
  }
};

const mockInternships = [
  {
    id: 1,
    title: "Software Development Intern",
    company: "TechCorp India",
    sector: "Technology",
    location: "Bangalore",
    duration: "3 months",
    stipend: "₹15,000/month",
    requiredSkills: ["JavaScript", "React", "Python", "Git"],
    description: "Build scalable web applications using modern frameworks and cloud technologies",
    minEducation: "Undergraduate",
    icon: "💻",
    color: "bg-blue-500",
    popularityScore: 0.85,
    historicalClickRate: 0.72,
    avgRating: 4.2
  },
  {
    id: 2,
    title: "Digital Marketing Intern",
    company: "MarketPro Solutions",
    sector: "Marketing",
    location: "Mumbai",
    duration: "4 months",
    stipend: "₹12,000/month",
    requiredSkills: ["Social Media", "Content Writing", "Analytics", "SEO"],
    description: "Create and execute digital marketing campaigns across multiple channels",
    minEducation: "12th Pass",
    icon: "📱",
    color: "bg-green-500",
    popularityScore: 0.68,
    historicalClickRate: 0.61,
    avgRating: 3.9
  },
  {
    id: 3,
    title: "Data Analysis Intern",
    company: "DataInsights Ltd",
    sector: "Analytics",
    location: "Delhi",
    duration: "6 months",
    stipend: "₹18,000/month",
    requiredSkills: ["Python", "Excel", "SQL", "Statistics"],
    description: "Analyze large datasets to extract actionable business insights using statistical methods",
    minEducation: "Undergraduate",
    icon: "📊",
    color: "bg-purple-500",
    popularityScore: 0.79,
    historicalClickRate: 0.58,
    avgRating: 4.1
  }
];

const skillsDatabase = [
  "JavaScript", "Python", "React", "Node.js", "SQL", "Git",
  "Excel", "PowerPoint", "Communication", "Leadership",
  "Social Media", "Content Writing", "SEO", "Analytics",
  "Photoshop", "Illustrator", "UI/UX", "Creative Thinking",
  "Financial Modeling", "Accounting", "Statistics", "Research"
];

const sectorsDatabase = [
  "Technology", "Finance", "Marketing", "Healthcare", "Education",
  "Media", "Design", "Analytics", "Manufacturing", "Retail"
];

const locationsDatabase = [
  "Bangalore", "Mumbai", "Delhi", "Pune", "Chennai", "Hyderabad",
  "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"
];

const educationLevels = [
  { value: "12th Pass", label: "12th Pass", icon: "🎓" },
  { value: "Undergraduate", label: "Undergraduate", icon: "📚" },
  { value: "Graduate", label: "Graduate", icon: "🎖️" },
  { value: "Postgraduate", label: "Postgraduate", icon: "👨‍🎓" }
];

// ML Engine functions
const calculateSemanticSimilarity = (candidateSkills, internshipSkills) => {
  const skillsOverlap = candidateSkills.filter(skill => 
    internshipSkills.some(reqSkill => 
      skill.toLowerCase().includes(reqSkill.toLowerCase()) || 
      reqSkill.toLowerCase().includes(skill.toLowerCase())
    )
  ).length;
  
  return skillsOverlap / Math.max(candidateSkills.length, internshipSkills.length, 1);
};

const getMLRecommendations = (candidateProfile) => {
  let scoredInternships = mockInternships.map(internship => {
    const semanticSimilarity = calculateSemanticSimilarity(
      candidateProfile.skills, 
      internship.requiredSkills
    );
    
    const locationMatch = candidateProfile.location === internship.location || candidateProfile.location === 'Any' ? 1 : 0.2;
    const sectorMatch = candidateProfile.sector === internship.sector || candidateProfile.sector === 'Any' ? 1 : 0.1;
    
    const mlScore = (semanticSimilarity * 0.5 + locationMatch * 0.25 + sectorMatch * 0.25) * 100;
    const clickProbability = Math.min(mlScore * 0.8, 95);
    const confidence = Math.min(mlScore + 10, 100);
    
    return {
      ...internship,
      mlScore: Math.round(mlScore),
      clickProbability: Math.round(clickProbability),
      confidence: Math.round(confidence),
      semanticMatch: Math.round(semanticSimilarity * 100),
      reasoningFactors: {
        semanticSimilarity,
        locationMatch,
        sectorMatch,
        popularityBoost: internship.popularityScore > 0.7,
        highRating: internship.avgRating > 4.0
      }
    };
  });
  
  return scoredInternships.sort((a, b) => b.mlScore - a.mlScore).slice(0, 3);
};

// Components
const MLInsightsPanel = ({ internship, lang }) => {
  const t = translations[lang];
  
  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-yellow-500" />
        <span className="font-semibold text-sm text-gray-700">{t.aiInsights}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-bold">{internship.semanticMatch}%</span>
          </div>
          <div className="text-xs text-gray-600">{t.semanticMatch}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-sm font-bold">{internship.clickProbability}%</span>
          </div>
          <div className="text-xs text-gray-600">{t.clickProbability}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-bold">{internship.confidence}%</span>
          </div>
          <div className="text-xs text-gray-600">{t.mlConfidence}</div>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ currentStep, totalSteps, lang }) => {
  const t = translations[lang];
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-indigo-600">{t.step} {currentStep} {t.of} {totalSteps}</span>
        <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const LoadingScreen = ({ lang }) => {
  const t = translations[lang];
  const [loadingText, setLoadingText] = useState(t.loading);
  
  useEffect(() => {
    const messages = [
      t.loading,
      t.analyzingProfile,
      "Processing with neural networks...",
      "Calculating semantic similarities..."
    ];
    
    let messageIndex = 0;
    const interval = setInterval(() => {
      setLoadingText(messages[messageIndex % messages.length]);
      messageIndex++;
    }, 2000);
    
    return () => clearInterval(interval);
  }, [lang, t.loading, t.analyzingProfile]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="relative mb-6">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
        <Brain className="w-8 h-8 text-indigo-600 absolute top-4 left-4 animate-pulse" />
      </div>
      <p className="text-lg text-gray-600 text-center mb-4">{loadingText}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Database className="w-4 h-4" />
        <span>Processing internship records...</span>
      </div>
    </div>
  );
};

const InternshipCard = ({ internship, candidateProfile, lang, index, onFeedback }) => {
  const t = translations[lang];
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = (interested) => {
    setFeedbackGiven(true);
    onFeedback(internship.id, interested);
    setTimeout(() => setFeedbackGiven(false), 3000);
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${internship.color} rounded-xl flex items-center justify-center text-2xl`}>
              {internship.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{internship.title}</h3>
              <p className="text-gray-600 font-medium">{internship.company}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Brain className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-indigo-600 text-lg">{internship.mlScore}%</span>
            </div>
            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-medium">
              #{index + 1} {t.mlPowered}
            </span>
          </div>
        </div>

        <MLInsightsPanel internship={internship} lang={lang} />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">{internship.location}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">{internship.duration}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">{internship.stipend}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">{Math.round(internship.popularityScore * 100)}% popular</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {internship.requiredSkills.map(skill => {
              const isMatched = candidateProfile.skills.includes(skill);
              
              return (
                <span
                  key={skill}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isMatched 
                      ? 'bg-green-100 text-green-800 border border-green-200 shadow-sm' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  {skill} {isMatched && <CheckCircle className="w-3 h-3 inline ml-1" />}
                </span>
              );
            })}
          </div>
        </div>

        {!feedbackGiven ? (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => handleFeedback(true)}
              className="flex-1 py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
            >
              👍 {t.interested}
            </button>
            <button
              onClick={() => handleFeedback(false)}
              className="flex-1 py-2 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              👎 {t.notInterested}
            </button>
          </div>
        ) : (
          <div className="mb-4 p-2 bg-blue-50 text-blue-700 text-sm text-center rounded-lg">
            {t.userFeedback}
          </div>
        )}

        <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-200">
          {t.applyNow}
        </button>
      </div>
    </article>
  );
};

// Main Component
const InternshipRecommendationSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState('en');
  const [candidateProfile, setCandidateProfile] = useState({
    education: '',
    skills: [],
    sector: 'Any',
    location: 'Any'
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [userFeedback, setUserFeedback] = useState({});

  const t = translations[language];
  const totalSteps = 3;

  const addSkill = () => {
    if (selectedSkill && !candidateProfile.skills.includes(selectedSkill)) {
      setCandidateProfile(prev => ({
        ...prev,
        skills: [...prev.skills, selectedSkill]
      }));
      setSelectedSkill('');
    }
  };

  const removeSkill = (skill) => {
    setCandidateProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGetRecommendations();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      const results = getMLRecommendations(candidateProfile);
      setRecommendations(results);
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };

  const handleFeedback = (internshipId, interested) => {
    setUserFeedback(prev => ({
      ...prev,
      [internshipId]: interested
    }));
    console.log(`User ${interested ? 'liked' : 'disliked'} internship ${internshipId}`);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return candidateProfile.education !== '';
      case 2:
        return candidateProfile.skills.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (showResults) {
    if (isLoading) {
      return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
          <LoadingScreen lang={language} />
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-600" />
              {t.recommendations}
            </h2>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Powered by advanced machine learning algorithms
            </p>
          </div>
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentStep(1);
            }}
            className="px-6 py-3 text-indigo-600 border-2 border-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-semibold"
          >
            {t.modifyProfile}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {recommendations.map((internship, index) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              candidateProfile={candidateProfile}
              lang={language}
              index={index}
              onFeedback={handleFeedback}
            />
          ))}
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <GraduationCap className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.step1Title}</h2>
              <p className="text-gray-600">{t.step1Subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setCandidateProfile(prev => ({ ...prev, education: level.value }))}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    candidateProfile.education === level.value
                      ? 'border-indigo-600 bg-indigo-50 shadow-lg ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-3">{level.icon}</div>
                  <div className="font-semibold text-gray-900">{level.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Code className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.step2Title}</h2>
              <p className="text-gray-600">{t.step2Subtitle}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-lg"
                >
                  <option value="">{t.selectSkill}</option>
                  {skillsDatabase
                    .filter(skill => !candidateProfile.skills.includes(skill))
                    .map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                <button
                  onClick={addSkill}
                  disabled={!selectedSkill}
                  className="px-6 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.addSkill}
                </button>
              </div>
              
              {candidateProfile.skills.length > 0 && (
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-indigo-800">Selected Skills ({candidateProfile.skills.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {candidateProfile.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-white text-indigo-800 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm border border-indigo-200"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-indigo-600 hover:text-indigo-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPinIcon className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.step3Title}</h2>
              <p className="text-gray-600">{t.step3Subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-700">
                  {t.preferredSector}
                </label>
                <select
                  value={candidateProfile.sector}
                  onChange={(e) => setCandidateProfile(prev => ({ ...prev, sector: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-lg"
                >
                  <option value="Any">{t.anySector}</option>
                  {sectorsDatabase.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-700">
                  {t.preferredLocation}
                </label>
                <select
                  value={candidateProfile.location}
                  onChange={(e) => setCandidateProfile(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-lg"
                >
                  <option value="Any">{t.anyLocation}</option>
                  {locationsDatabase.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-12 h-12 text-purple-600" />
          <h1 className="text-4xl font-bold text-indigo-900">{t.title}</h1>
        </div>
        <p className="text-indigo-700 text-lg mb-4">{t.subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} lang={language} />
        
        {renderStep()}

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            {t.back}
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {currentStep === totalSteps ? (
              <>
                <Brain className="w-5 h-5" />
                {t.findInternships}
              </>
            ) : (
              <>
                {t.next}
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipRecommendationSystem;