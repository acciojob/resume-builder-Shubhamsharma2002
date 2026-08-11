import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state);

  const { profile, education, skills, projects, socials } = resumeData;

  // --- Handlers ---
  const handleProfileChange = (e) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { [e.target.name]: e.target.value }
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    dispatch({ type: 'UPDATE_EDUCATION', payload: updated });
  };

  const handleSkillChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    dispatch({ type: 'UPDATE_SKILLS', payload: updated });
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    dispatch({ type: 'UPDATE_PROJECTS', payload: updated });
  };

  const handleSocialChange = (index, value) => {
    const updated = [...socials];
    updated[index] = value;
    dispatch({ type: 'UPDATE_SOCIALS', payload: updated });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Resume Builder</h1>

      {/* --- PAGE 1: PROFILE --- */}
      {step === 1 && (
        <section id="profile-section">
          <h2>Profile Details</h2>
          <div>
            <label>First Name: </label>
            <input name="fname" value={profile.fname} onChange={handleProfileChange} />
          </div>
          <div>
            <label>Last Name: </label>
            <input name="lname" value={profile.lname} onChange={handleProfileChange} />
          </div>
          <div>
            <label>Phone: </label>
            <input name="phone" value={profile.phone} onChange={handleProfileChange} />
          </div>
          <div>
            <label>Address: </label>
            <input name="address" value={profile.address} onChange={handleProfileChange} />
          </div>
          <div>
            <label>Image/Portfolio URL: </label>
            <input name="url" value={profile.url} onChange={handleProfileChange} />
          </div>
        </section>
      )}

      {/* --- PAGE 2: EDUCATION --- */}
      {step === 2 && (
        <section id="education-section">
          <h2>Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <input
                name="courseName"
                placeholder="Course Name"
                value={edu.courseName}
                onChange={(e) => handleEducationChange(idx, 'courseName', e.target.value)}
              />
              <input
                name="completionYear"
                placeholder="Completion Year"
                value={edu.completionYear}
                onChange={(e) => handleEducationChange(idx, 'completionYear', e.target.value)}
              />
              <input
                name="college"
                placeholder="College/University"
                value={edu.college}
                onChange={(e) => handleEducationChange(idx, 'college', e.target.value)}
              />
              <input
                name="percentage"
                placeholder="Percentage/CGPA"
                value={edu.percentage}
                onChange={(e) => handleEducationChange(idx, 'percentage', e.target.value)}
              />
              {education.length > 1 && (
                <button id="delete" onClick={() => dispatch({ type: 'DELETE_EDUCATION', payload: idx })}>
                  Delete Education
                </button>
              )}
            </div>
          ))}
          <button id="add_education" onClick={() => dispatch({ type: 'ADD_EDUCATION' })}>
            Add Education
          </button>
        </section>
      )}

      {/* --- PAGE 3: SKILLS --- */}
      {step === 3 && (
        <section id="skills-section">
          <h2>Skills</h2>
          {skills.map((skill, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <input
                name="skill"
                placeholder="Enter skill"
                value={skill}
                onChange={(e) => handleSkillChange(idx, e.target.value)}
              />
              {skills.length > 1 && (
                <button id="delete_skill" onClick={() => dispatch({ type: 'DELETE_SKILL', payload: idx })}>
                  Delete Skill
                </button>
              )}
            </div>
          ))}
          <button id="add_skill" onClick={() => dispatch({ type: 'ADD_SKILL' })}>
            Add Skill
          </button>
        </section>
      )}

      {/* --- PAGE 4: PROJECTS --- */}
      {step === 4 && (
        <section id="projects-section">
          <h2>Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <input
                name="projectName"
                placeholder="Project Name"
                value={proj.projectName}
                onChange={(e) => handleProjectChange(idx, 'projectName', e.target.value)}
              />
              <input
                name="techStack"
                placeholder="Tech Stack"
                value={proj.techStack}
                onChange={(e) => handleProjectChange(idx, 'techStack', e.target.value)}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={proj.description}
                onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
              />
              {projects.length > 1 && (
                <button id="delete_project" onClick={() => dispatch({ type: 'DELETE_PROJECT', payload: idx })}>
                  Delete Project
                </button>
              )}
            </div>
          ))}
          <button id="add_project" onClick={() => dispatch({ type: 'ADD_PROJECT' })}>
            Add Project
          </button>
        </section>
      )}

      {/* --- PAGE 5: SOCIAL MEDIA --- */}
      {step === 5 && (
        <section id="social-section">
          <h2>Social Media Links</h2>
          {socials.map((social, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <input
                name="Social"
                placeholder="Social Profile URL"
                value={social}
                onChange={(e) => handleSocialChange(idx, e.target.value)}
              />
            </div>
          ))}
          <button id="add_social" onClick={() => dispatch({ type: 'ADD_SOCIAL' })}>
            Add Social
          </button>
        </section>
      )}

      {/* --- PAGE 6: FINAL RESUME OUTPUT --- */}
      {step === 6 && (
        <section id="final-resume" style={{ border: '1px solid #000', padding: '20px', marginTop: '20px' }}>
          <h2>{profile.fname} {profile.lname}</h2>
          <p>Phone: {profile.phone} | Address: {profile.address}</p>
          {profile.url && <p>Portfolio: {profile.url}</p>}
          <hr />

          <h3>Education</h3>
          {education.map((edu, i) => (
            <div key={i}>
              <p><strong>{edu.courseName}</strong> - {edu.college} ({edu.completionYear}) | {edu.percentage}%</p>
            </div>
          ))}
          <hr />

          <h3>Skills</h3>
          <p>{skills.join(', ')}</p>
          <hr />

          <h3>Projects</h3>
          {projects.map((proj, i) => (
            <div key={i}>
              <h4>{proj.projectName}</h4>
              <p><em>Tech Stack: {proj.techStack}</em></p>
              <p>{proj.description}</p>
            </div>
          ))}
          <hr />

          <h3>Social Media</h3>
          <ul>
            {socials.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* --- NAVIGATION CONTROLS --- */}
      <div style={{ marginTop: '20px' }}>
        {step > 1 && (
          <button id="back" onClick={() => setStep((s) => s - 1)}>
            Back
          </button>
        )}

        {step < 5 && (
          <button id="next" onClick={() => setStep((s) => s + 1)} style={{ marginLeft: '10px' }}>
            Next
          </button>
        )}

        {step === 5 && (
          <button id="save_continue" onClick={() => setStep(6)} style={{ marginLeft: '10px' }}>
            Save & Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default App;