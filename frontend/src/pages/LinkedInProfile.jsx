import '../css/LinkedInProfile.css'; // Import the CSS file

export default function LinkedInProfile() {
    const profile = {
        name: 'Deepak Saini',
        headline: 'Full Stack Developer | Laravel, React, MongoDB',
        location: 'India',
        about: 'Passionate full-stack developer with hands-on experience in PHP, MERN stack and building real-time projects.',
        skills: ['PHP', 'Laravel', 'React.js', 'Node.js', 'MongoDB'],
        experience: [
            {
                company: 'GeeksIT Data Solutions',
                role: 'Laravel Developer',
                duration: 'Aug 2021 - Oct 2022'
            }
        ],
        education: [
            {
                degree: 'MCA',
                college: 'CMR Institute of Technology, Bangalore'
            },
            {
                degree: 'BCA',
                college: 'Seth G.B. Podar College, Nawalgarh'
            }
        ],
        linkedin: 'https://www.linkedin.com/in/deepak-saini-435095230/',
        image: '/img_profile/profile-image.jpg' // Image path
    };

    return (
        <div className="linkedin-profile">
            <div className="profile-header">
                <img src={profile.image} alt="Profile" className="profile-image" />
                <h2>{profile.name}</h2>
            </div>
            <p><strong>Headline:</strong> {profile.headline}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>About:</strong> {profile.about}</p>
            <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>

            <h4>Experience:</h4>
            {profile.experience.map((exp, index) => (
                <div key={index}>
                    <p>{exp.role} at {exp.company} ({exp.duration})</p>
                </div>
            ))}

            <h4>Education:</h4>
            {profile.education.map((edu, index) => (
                <div key={index}>
                    <p>{edu.degree} - {edu.college}</p>
                </div>
            ))}

            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                View LinkedIn Profile 🔗
            </a>
        </div>
    );
}
