import { useState } from 'react';
import {
  FiSearch,
  FiLinkedin,
  FiTwitter,
  FiGlobe,
  FiBriefcase,
  FiUsers,
  FiAward,
  FiChevronDown,
  FiStar
} from 'react-icons/fi';
import { batch2019 } from '../data/alumni/batch2019';
import { batch2020 } from '../data/alumni/batch2020';
import { batch2021 } from '../data/alumni/batch2021';
import { topAlumni } from '../data/alumni/topAlumni';
import styles from '../styles/Alumni.module.css';

const batchData = {
  '2019': batch2019,
  '2020': batch2020,
  '2021': batch2021
};
const batchBackgrounds = {
  '2019': '/batch/19.jpg',
  '2020': '/batch/20.jpg',
  '2021': '/batch/21.jpg',
};

const batchYears = ['2019', '2020', '2021'];

export default function AlumniPage() {
  const [selectedBatch, setSelectedBatch] = useState(null); // Changed to null initially
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlumni = selectedBatch
    ? batchData[selectedBatch].filter(alumni =>
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Alumni <span>Network</span></h1>
          <p>Connecting excellence across generations</p>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search alumni by name, company, or role..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FiUsers /></div>
          <div>
            <h3>{Object.values(batchData).flat().length}+</h3>
            <p>Global Alumni</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FiGlobe /></div>
          <div>
            <h3>120+</h3>
            <p>Countries</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FiBriefcase /></div>
          <div>
            <h3>85%</h3>
            <p>Placement Rate</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FiAward /></div>
          <div>
            <h3>200+</h3>
            <p>Partner Companies</p>
          </div>
        </div>
      </div>

      {/* Top Alumni Section */}
      <div className={styles.topAlumniSection}>
        <div className={styles.sectionHeader}>
          <FiStar className={styles.sectionIcon} />
          <h2 className={styles.bestalumnih2}>Distinguished <span>Alumni</span></h2>
          <p className={styles.bestalumnip}>Exceptional graduates making significant impacts</p>
        </div>

        <div className={styles.alumniGrid}>
          {topAlumni.map(alumni => (
            <div key={`top-${alumni.id}`} className={`${styles.alumniCard} ${styles.topAlumniCard}`}>
              <div
                className={styles.alumniImage}
                style={{ backgroundImage: `url(${alumni.image})` }}
              >
                <div className={styles.companyLogo}>
                  <img src={alumni.logo} alt={alumni.company} />
                </div>
                <div className={styles.featuredBadge}>
                  <FiStar />
                </div>
              </div>
              <div className={styles.alumniInfo}>
                <h3>{alumni.name}</h3>
                <p className={styles.role}>{alumni.role}</p>
                <div className={styles.companyInfo}>
                  <span>{alumni.company}</span>
                  <span>•</span>
                  <span>Batch {alumni.batch}</span>
                </div>
                {alumni.achievement && (
                  <p className={styles.achievement}>
                    <FiAward className={styles.awardIcon} />
                    {alumni.achievement}
                  </p>
                )}
                <div className={styles.socialLinks}>
                  <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer">
                    <FiLinkedin />
                  </a>
                  <a href={alumni.twitter} target="_blank" rel="noopener noreferrer">
                    <FiTwitter />
                  </a>
                  <a href={alumni.insta} target="_blank" rel="noopener noreferrer">
                    <FiTwitter />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.batchSelectionSection}>
        <div className={styles.sectionHeader}>
          <h2>Explore Alumni <span>by Batch</span></h2>
          <p>Discover and connect with graduates from specific years</p>
        </div>

        <div className={styles.batchSelectorModern}>
          {batchYears.map((year) => (
            <div
              key={year}
              className={`${styles.batchPill} ${selectedBatch === year ? styles.activeBatch : ''
                }`}
              onClick={() => setSelectedBatch(year)}
            >
              <span className={styles.batchYear}>{year}</span>
              <span className={styles.batchCount}>{batchData[year].length}</span>
            </div>
          ))}
        </div>

        {selectedBatch ? (
          <div className={styles.batchAlumniContainer}>
            <div className={styles.batchHeader}>
              <h3>
                Batch <span>{selectedBatch}</span>
                <span className={styles.alumniCount}>
                  {filteredAlumni.length} {filteredAlumni.length === 1 ? 'Alumnus' : 'Alumni'}
                </span>
              </h3>

            </div>

            {filteredAlumni.length > 0 ? (
              <div className={styles.modernAlumniGrid}>
                {filteredAlumni.map((alumni) => (
                  <div key={alumni.id} className={styles.modernAlumniCard}>
                    <div className={styles.cardHeader}>
                      <div
                        className={styles.alumniAvatar}
                        style={{ backgroundImage: `url(${alumni.image})` }}
                      />
                      <div className={styles.companyBadge}>
                        <img src={alumni.logo} alt={alumni.company} />
                      </div>
                    </div>
                    <div className={styles.cardBody}>
                      <h4>{alumni.name}</h4>
                      <p className={styles.role}>{alumni.role}</p>
                      <p className={styles.company}>{alumni.company}</p>

                      {alumni.achievement && (
                        <div className={styles.achievementBadge}>
                          <FiAward /> {alumni.achievement}
                        </div>
                      )}
                    </div>
                    <div className={styles.cardFooter}>
                      <div className={styles.socialLinks}>
                        {alumni.linkedin && (
                          <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer">
                            <FiLinkedin />
                          </a>
                        )}
                        {alumni.twitter && (
                          <a href={alumni.twitter} target="_blank" rel="noopener noreferrer">
                            <FiTwitter />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResultsModern}>
                <FiUsers className={styles.noResultsIcon} />
                <p>No alumni found matching your search</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className={styles.clearButton}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.batchPromptModern}>
            <div className={styles.patternOverlay} />
            <div className={styles.promptContent}>
              <FiUsers className={styles.promptIcon} />
              <h3>Select a batch year to begin exploring</h3>
              <p>Browse through alumni from different graduating classes and connect with your peers</p>
              <div className={styles.batchHighlights}>
                {batchYears.map((year) => (
                  <div
                    key={year}
                    className={styles.highlightCard}
                    style={{
                      backgroundImage: `url(${batchBackgrounds[year]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <span className={styles.highlightYear}>{year}</span>
                      <span className={styles.highlightCount}>{batchData[year].length} Alumni</span>
                      <button
                        onClick={() => setSelectedBatch(year)}
                        className={styles.viewButton}
                      >
                        View Batch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 