import React, { useMemo, useState } from 'react';
import { translations } from '../data/translations';
import { getMLRecommendations } from '../utils/mlEngine';
import { mockInternships } from '../data/mockData';

// Simple, self-contained UI to unblock rendering and demonstrate recommendations
export default function InternshipRecommendationSystem() {
	const t = translations.en;

	const [skillsInput, setSkillsInput] = useState('React, JavaScript');
	const [location, setLocation] = useState('Any');
	const [sector, setSector] = useState('Any');
	const [results, setResults] = useState([]);

	const candidateProfile = useMemo(() => ({
		education: 'Undergraduate',
		skills: skillsInput
			.split(',')
			.map(s => s.trim())
			.filter(Boolean),
		location,
		sector
	}), [skillsInput, location, sector]);

	const onFind = () => {
		const recs = getMLRecommendations(candidateProfile, mockInternships);
		setResults(recs);
	};

	return (
		<div style={{ maxWidth: 900, margin: '40px auto', padding: 16, textAlign: 'left' }}>
			<h1 style={{ marginBottom: 8 }}>{t.title}</h1>
			<p style={{ color: '#555', marginBottom: 24 }}>{t.subtitle}</p>

			<div className="card-shadow" style={{ padding: 16, borderRadius: 8, background: '#fff', marginBottom: 16 }}>
				<h2 style={{ marginBottom: 12 }}>{t.step2Title}</h2>
				<label style={{ display: 'block', fontSize: 14, color: '#444', marginBottom: 6 }}>{t.selectSkill}</label>
				<input
					type="text"
					value={skillsInput}
					onChange={e => setSkillsInput(e.target.value)}
					placeholder="e.g. React, JavaScript, SQL"
					style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
				/>
			</div>

			<div className="card-shadow" style={{ padding: 16, borderRadius: 8, background: '#fff', marginBottom: 16 }}>
				<h2 style={{ marginBottom: 12 }}>{t.step3Title}</h2>
				<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
					<div style={{ flex: 1, minWidth: 220 }}>
						<label style={{ display: 'block', fontSize: 14, color: '#444', marginBottom: 6 }}>{t.preferredLocation}</label>
						<select
							value={location}
							onChange={e => setLocation(e.target.value)}
							style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
						>
							<option>Any</option>
							<option>Mumbai</option>
							<option>Bangalore</option>
							<option>Delhi</option>
							<option>Hyderabad</option>
							<option>Remote</option>
						</select>
					</div>
					<div style={{ flex: 1, minWidth: 220 }}>
						<label style={{ display: 'block', fontSize: 14, color: '#444', marginBottom: 6 }}>{t.preferredSector}</label>
						<select
							value={sector}
							onChange={e => setSector(e.target.value)}
							style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
						>
							<option>Any</option>
							<option>Technology</option>
							<option>Marketing</option>
							<option>Finance</option>
							<option>Analytics</option>
							<option>Design</option>
						</select>
					</div>
				</div>
			</div>

			<div style={{ textAlign: 'right', marginBottom: 24 }}>
				<button onClick={onFind} className="transition-smooth"
					style={{ padding: '10px 16px', border: 'none', borderRadius: 6, background: '#4f46e5', color: 'white', cursor: 'pointer' }}>
					{t.findInternships}
				</button>
			</div>

			<div>
				<h2 style={{ marginBottom: 12 }}>{t.recommendations}</h2>
				{results.length === 0 ? (
					<div style={{ color: '#666' }}>{t.noResults}</div>
				) : (
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
						{results.map(intern => (
							<div key={intern.id} className="card-shadow" style={{ padding: 16, borderRadius: 8, background: '#fff' }}>
								<div style={{ fontWeight: 600, marginBottom: 4 }}>{intern.title}</div>
								<div style={{ color: '#555', marginBottom: 8 }}>{intern.company} • {intern.location}</div>
								<div style={{ fontSize: 14, color: '#444', marginBottom: 8 }}>
									{t.semanticMatch}: {intern.semanticMatch}% • {t.mlConfidence}: {intern.confidence}%
								</div>
								<div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>Sector: {intern.sector}</div>
								<a
									href={intern.applyUrl || '#'}
									target="_blank"
									rel="noreferrer"
									style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}
								>
									{t.applyNow}
								</a>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}