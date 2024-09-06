import React from 'react';
import './Modal.css'
const Modal = ({ isOpen, onClose, project }) => {
  // if (!isOpen || !project) return null;
  // if (!isVisible) return null;
  console.log("Modal is open and rendering"); // Debug line
  const {
    seo,
    visibility,
    projectBanner,
    progress,
    budget,
    name,
    description,
    summary,
    objectives,
    features,
    deployed,
    milestones,
    technologies,
    tags,
    teamMembers,
    startDate,
    endDate,
    githubLink,
    projectLink,
    createdAt,
    updatedAt
  } = project;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{name}</h2>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Summary:</strong> {summary}</p>

        <div>
          <h3>SEO</h3>
          <p><strong>Meta Title:</strong> {seo.metaTitle}</p>
          <p><strong>Meta Description:</strong> {seo.metaDescription}</p>
          <p><strong>Keywords:</strong> {seo.keywords.join(', ')}</p>
        </div>

        <div>
          <h3>Visibility</h3>
          <p><strong>Show on Homepage:</strong> {visibility.showOnHomepage ? 'Yes' : 'No'}</p>
          <p><strong>Show on Portfolio:</strong> {visibility.showOnPortfolio ? 'Yes' : 'No'}</p>
          <p><strong>Show on Company Site:</strong> {visibility.showOnCompanySite ? 'Yes' : 'No'}</p>
        </div>

        <div>
          <h3>Project Banner</h3>
          <p><strong>Type:</strong> {projectBanner.type}</p>
          <img src={projectBanner.url} alt="Project Banner" style={{ width: '100%', height: 'auto' }} />
        </div>

        <div>
          <h3>Progress</h3>
          <p><strong>Percentage:</strong> {progress.percentage}%</p>
          <p><strong>Status:</strong> {progress.status}</p>
        </div>

        <div>
          <h3>Budget</h3>
          <p><strong>Initial:</strong> ${budget.initial}</p>
          <p><strong>Spent:</strong> ${budget.spent}</p>
        </div>

        <div>
          <h3>Objectives</h3>
          <ul>
            {objectives.map((objective, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: objective }} />
            ))}
          </ul>
        </div>

        <div>
          <h3>Features</h3>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Technologies</h3>
          <ul>
            {technologies.map((tech, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: tech }} />
            ))}
          </ul>
        </div>

        <div>
          <h3>Tags</h3>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Team Members</h3>
          <ul>
            {teamMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Links</h3>
          <p><strong>GitHub:</strong> <a href={githubLink} target="_blank" rel="noopener noreferrer">{githubLink}</a></p>
          <p><strong>Project:</strong> <a href={projectLink} target="_blank" rel="noopener noreferrer">{projectLink}</a></p>
        </div>

        <div>
          <h3>Dates</h3>
          <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
          <p><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
          <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleDateString()}</p>
        </div>

        {deployed && (
          <div>
            <h3>Status</h3>
            <p>The project is deployed.</p>
          </div>
        )}

        {milestones.length > 0 && (
          <div>
            <h3>Milestones</h3>
            <ul>
              {milestones.map((milestone, index) => (
                <li key={index}>{milestone}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
