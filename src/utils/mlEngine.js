// Advanced ML-based similarity scoring
export const calculateSemanticSimilarity = (candidateSkills, internshipSkills, candidateProfile, internshipData) => {
  // Simulate advanced semantic similarity using multiple factors
  const skillsOverlap = candidateSkills.filter(skill => 
    internshipSkills.some(reqSkill => 
      skill.toLowerCase().includes(reqSkill.toLowerCase()) || 
      reqSkill.toLowerCase().includes(skill.toLowerCase())
    )
  ).length;
  
  const skillsJaccard = skillsOverlap / (candidateSkills.length + internshipSkills.length - skillsOverlap);
  
  // Semantic context scoring (simulated)
  const contextWords = {
    'Technology': ['javascript', 'python', 'react', 'git', 'sql'],
    'Marketing': ['social media', 'seo', 'content', 'analytics'],
    'Finance': ['excel', 'financial', 'accounting', 'modeling'],
    'Analytics': ['python', 'sql', 'statistics', 'excel'],
    'Design': ['photoshop', 'illustrator', 'ui/ux', 'creative']
  };
  
  const sectorContext = contextWords[internshipData.sector] || [];
  const contextMatch = candidateSkills.filter(skill =>
    sectorContext.some(context => skill.toLowerCase().includes(context))
  ).length / Math.max(candidateSkills.length, 1);
  
  return skillsJaccard * 0.6 + contextMatch * 0.4;
};

// ML-powered recommendation engine
export const getMLRecommendations = (candidateProfile, mockInternships) => {
  let scoredInternships = mockInternships.map(internship => {
    // Feature extraction (simulating real ML features)
    const features = {
      // 1. Semantic similarity
      semanticSimilarity: calculateSemanticSimilarity(
        candidateProfile.skills, 
        internship.requiredSkills,
        candidateProfile,
        internship
      ),
      
      // 2. Location preference
      locationMatch: candidateProfile.location === internship.location || candidateProfile.location === 'Any' ? 1 : 0,
      locationPreference: candidateProfile.location === 'Any' ? 0.5 : 
                          candidateProfile.location === internship.location ? 1 : 0.2,
      
      // 3. Sector preference  
      sectorMatch: candidateProfile.sector === internship.sector || candidateProfile.sector === 'Any' ? 1 : 0,
      sectorPreference: candidateProfile.sector === 'Any' ? 0.5 :
                       candidateProfile.sector === internship.sector ? 1 : 0.1,
      
      // 4. Education compatibility
      educationCompatible: 1, // Simplified for demo
      
      // 5. Historical performance features
      popularityScore: internship.popularityScore,
      clickRate: internship.historicalClickRate,
      avgRating: internship.avgRating / 5,
      
      // 6. Stipend appeal (normalized)
      stipendAppeal: Math.min(parseInt(internship.stipend.replace(/[^\d]/g, '')) / 20000, 1),
      
      // 7. Time-based features (simulated)
      timeScore: 0.8 + Math.random() * 0.2, // Simulating time-of-day effects
      
      // 8. User behavior simulation
      userEngagementPrediction: Math.random() * 0.3 + 0.4
    };
    
    // ML Model Simulation (Random Forest-like scoring)
    const weights = {
      semanticSimilarity: 0.35,
      locationPreference: 0.15,
      sectorPreference: 0.20,
      popularityScore: 0.10,
      clickRate: 0.08,
      avgRating: 0.07,
      stipendAppeal: 0.03,
      timeScore: 0.02
    };
    
    // Calculate ML score
    const mlScore = Object.entries(weights).reduce((score, [feature, weight]) => {
      return score + (features[feature] || 0) * weight;
    }, 0);
    
    // Click probability prediction (Logistic Regression simulation)
    const clickProbability = Math.min(
      1 / (1 + Math.exp(-(mlScore * 8 - 4))), // Sigmoid function
      0.95
    );
    
    // Confidence interval
    const confidence = Math.min(mlScore + features.popularityScore * 0.1, 1);
    
    return {
      ...internship,
      features,
      mlScore: Math.round(mlScore * 100),
      clickProbability: Math.round(clickProbability * 100),
      confidence: Math.round(confidence * 100),
      semanticMatch: Math.round(features.semanticSimilarity * 100),
      reasoningFactors: {
        semanticSimilarity: features.semanticSimilarity,
        locationMatch: features.locationPreference,
        sectorMatch: features.sectorPreference,
        popularityBoost: features.popularityScore > 0.7,
        highRating: features.avgRating > 0.8
      }
    };
  });
  
  // Apply filters
  if (candidateProfile.location && candidateProfile.location !== 'Any') {
    scoredInternships = scoredInternships.filter(
      internship => internship.location === candidateProfile.location
    );
  }
  
  if (candidateProfile.sector && candidateProfile.sector !== 'Any') {
    scoredInternships = scoredInternships.filter(
      internship => internship.sector === candidateProfile.sector
    );
  }
  
  // Sort by ML score and return top 5
  return scoredInternships
    .sort((a, b) => b.mlScore - a.mlScore)
    .slice(0, 5);
};