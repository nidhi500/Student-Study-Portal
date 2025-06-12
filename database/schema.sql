-- Student Companion Platform Database Schema
-- This schema integrates with your existing User table and supports all platform features

-- =====================================================
-- CORE USER & PROFILE TABLES
-- =====================================================

-- Your existing users table (already created)
-- users (id, name, email, password)

-- Extended user profile information
CREATE TABLE user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    college_name VARCHAR(255),
    branch VARCHAR(100),
    current_semester INTEGER CHECK (current_semester >= 1 AND current_semester <= 8),
    graduation_year INTEGER,
    phone_number VARCHAR(15),
    bio TEXT,
    profile_picture_url VARCHAR(500),
    date_of_birth DATE,
    location VARCHAR(100),
    linkedin_url VARCHAR(300),
    github_url VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- =====================================================
-- ACADEMIC STRUCTURE TABLES
-- =====================================================

-- Branches/Streams (CSE, ECE, ME, etc.)
CREATE TABLE branches (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects for each semester and branch
CREATE TABLE subjects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(20) NOT NULL,
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    semester INTEGER NOT NULL CHECK (semester >= 1 AND semester <= 8),
    credits INTEGER DEFAULT 3,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(code, branch_id, semester)
);

-- =====================================================
-- RESOURCE MANAGEMENT TABLES
-- =====================================================

-- Resource types (Video, Notes, PYQ, Books, etc.)
CREATE TABLE resource_types (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100) -- For frontend icons
);

-- Resources for subjects
CREATE TABLE subject_resources (
    id BIGSERIAL PRIMARY KEY,
    subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    resource_type_id BIGINT NOT NULL REFERENCES resource_types(id),
    title VARCHAR(300) NOT NULL,
    description TEXT,
    url VARCHAR(1000),
    file_path VARCHAR(500), -- For uploaded files
    is_external BOOLEAN DEFAULT true, -- true for YouTube links, false for uploaded files
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
    tags TEXT[], -- PostgreSQL array for tags
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    contributed_by BIGINT REFERENCES users(id),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CAREER & PLACEMENT TABLES
-- =====================================================

-- Career paths (Placement, GATE, GRE, CAT, etc.)
CREATE TABLE career_paths (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- 'placement', 'competitive_exam', 'higher_studies'
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies for placement preparation
CREATE TABLE companies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    website_url VARCHAR(300),
    logo_url VARCHAR(300),
    industry VARCHAR(100),
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('Easy', 'Medium', 'Hard')),
    package_range VARCHAR(100), -- e.g., "10-15 LPA"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Question categories (DSA, Aptitude, Technical, HR, etc.)
CREATE TABLE question_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    parent_category_id BIGINT REFERENCES question_categories(id),
    description TEXT,
    career_path_id BIGINT REFERENCES career_paths(id)
);

-- Questions for OA, interviews, competitive exams
CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- 'coding', 'mcq', 'subjective', 'aptitude'
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('Easy', 'Medium', 'Hard')),
    category_id BIGINT NOT NULL REFERENCES question_categories(id),
    company_id BIGINT REFERENCES companies(id), -- NULL for general questions
    career_path_id BIGINT REFERENCES career_paths(id),
    tags TEXT[],
    solution TEXT,
    hints TEXT[],
    time_limit INTEGER, -- in minutes
    memory_limit INTEGER, -- in MB
    sample_input TEXT,
    sample_output TEXT,
    explanation TEXT,
    contributed_by BIGINT REFERENCES users(id),
    is_verified BOOLEAN DEFAULT false,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coding sheets (like Striver's A2Z DSA Sheet)
CREATE TABLE coding_sheets (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    created_by BIGINT REFERENCES users(id),
    is_public BOOLEAN DEFAULT true,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
    estimated_days INTEGER,
    total_questions INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions in coding sheets
CREATE TABLE sheet_questions (
    id BIGSERIAL PRIMARY KEY,
    sheet_id BIGINT NOT NULL REFERENCES coding_sheets(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    is_mandatory BOOLEAN DEFAULT true,
    topic VARCHAR(100),
    UNIQUE(sheet_id, question_id),
    UNIQUE(sheet_id, order_index)
);

-- =====================================================
-- QUIZ & TEST SYSTEM
-- =====================================================

-- Quizzes for subjects and career preparation
CREATE TABLE quizzes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    subject_id BIGINT REFERENCES subjects(id), -- NULL for career-based quizzes
    career_path_id BIGINT REFERENCES career_paths(id), -- NULL for subject-based quizzes
    quiz_type VARCHAR(50) NOT NULL, -- 'practice', 'mock_test', 'previous_year'
    time_limit INTEGER, -- in minutes
    total_questions INTEGER NOT NULL,
    passing_score INTEGER,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('Easy', 'Medium', 'Hard')),
    is_public BOOLEAN DEFAULT true,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions in quizzes
CREATE TABLE quiz_questions (
    id BIGSERIAL PRIMARY KEY,
    quiz_id BIGINT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    marks INTEGER DEFAULT 1,
    negative_marks DECIMAL(3,2) DEFAULT 0,
    UNIQUE(quiz_id, question_id),
    UNIQUE(quiz_id, order_index)
);

-- =====================================================
-- PROGRESS TRACKING TABLES
-- =====================================================

-- User progress on subjects
CREATE TABLE subject_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    completion_percentage DECIMAL(5,2) DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    time_spent INTEGER DEFAULT 0, -- in minutes
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    resources_completed INTEGER DEFAULT 0,
    total_resources INTEGER DEFAULT 0,
    UNIQUE(user_id, subject_id)
);

-- User progress on career paths
CREATE TABLE career_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    career_path_id BIGINT NOT NULL REFERENCES career_paths(id) ON DELETE CASCADE,
    completion_percentage DECIMAL(5,2) DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    time_spent INTEGER DEFAULT 0, -- in minutes
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    questions_solved INTEGER DEFAULT 0,
    questions_attempted INTEGER DEFAULT 0,
    UNIQUE(user_id, career_path_id)
);

-- User progress on coding sheets
CREATE TABLE sheet_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sheet_id BIGINT NOT NULL REFERENCES coding_sheets(id) ON DELETE CASCADE,
    completion_percentage DECIMAL(5,2) DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    questions_solved INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, sheet_id)
);

-- Track individual question attempts
CREATE TABLE user_question_attempts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    is_solved BOOLEAN DEFAULT false,
    attempts_count INTEGER DEFAULT 1,
    time_taken INTEGER, -- in minutes
    solution_code TEXT,
    language VARCHAR(50),
    first_attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    solved_at TIMESTAMP,
    UNIQUE(user_id, question_id)
);

-- Track quiz attempts
CREATE TABLE quiz_attempts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id BIGINT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    time_taken INTEGER, -- in minutes
    is_completed BOOLEAN DEFAULT true,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- GAMIFICATION & ACHIEVEMENTS
-- =====================================================

-- Achievement types and badges
CREATE TABLE achievements (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    badge_icon VARCHAR(100),
    badge_color VARCHAR(20),
    achievement_type VARCHAR(50) NOT NULL, -- 'streak', 'completion', 'score', 'contribution'
    criteria_value INTEGER, -- e.g., 30 for "30-day streak"
    rarity VARCHAR(20) CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary')),
    points INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements
CREATE TABLE user_achievements (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id BIGINT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_displayed BOOLEAN DEFAULT true, -- User can choose to display or not
    UNIQUE(user_id, achievement_id)
);

-- Daily streak tracking
CREATE TABLE user_streaks (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    streak_type VARCHAR(50) NOT NULL, -- 'overall', 'subject', 'career'
    reference_id BIGINT, -- subject_id or career_path_id
    current_streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    last_activity_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, streak_type, reference_id)
);

-- =====================================================
-- DISCUSSION & CONTRIBUTION SYSTEM
-- =====================================================

-- Discussion categories
CREATE TABLE discussion_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Discussion posts
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    author_id BIGINT NOT NULL REFERENCES users(id),
    category_id BIGINT REFERENCES discussion_categories(id),
    subject_id BIGINT REFERENCES subjects(id), -- If related to specific subject
    career_path_id BIGINT REFERENCES career_paths(id), -- If related to career path
    post_type VARCHAR(50) DEFAULT 'discussion', -- 'discussion', 'experience', 'resource_share', 'question'
    tags TEXT[],
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    is_solved BOOLEAN DEFAULT false, -- For question type posts
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post replies/comments
CREATE TABLE post_replies (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    parent_reply_id BIGINT REFERENCES post_replies(id), -- For nested replies
    author_id BIGINT NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    is_accepted_answer BOOLEAN DEFAULT false, -- For question posts
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vote tracking for posts and replies
CREATE TABLE votes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    reply_id BIGINT REFERENCES post_replies(id) ON DELETE CASCADE,
    vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT vote_target_check CHECK (
        (post_id IS NOT NULL AND reply_id IS NULL) OR 
        (post_id IS NULL AND reply_id IS NOT NULL)
    ),
    UNIQUE(user_id, post_id),
    UNIQUE(user_id, reply_id)
);

-- =====================================================
-- NOTIFICATION SYSTEM
-- =====================================================

-- User notifications
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL, -- 'achievement', 'reply', 'streak', 'reminder'
    reference_id BIGINT, -- ID of related entity (post, achievement, etc.)
    reference_type VARCHAR(50), -- 'post', 'achievement', 'streak', etc.
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- User-related indexes
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_semester ON user_profiles(current_semester);

-- Subject and resource indexes
CREATE INDEX idx_subjects_branch_semester ON subjects(branch_id, semester);
CREATE INDEX idx_subject_resources_subject ON subject_resources(subject_id);
CREATE INDEX idx_subject_resources_type ON subject_resources(resource_type_id);

-- Question and quiz indexes
CREATE INDEX idx_questions_category ON questions(category_id);
CREATE INDEX idx_questions_company ON questions(company_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty_level);
CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);

-- Progress tracking indexes
CREATE INDEX idx_subject_progress_user ON subject_progress(user_id);
CREATE INDEX idx_career_progress_user ON career_progress(user_id);
CREATE INDEX idx_sheet_progress_user ON sheet_progress(user_id);
CREATE INDEX idx_question_attempts_user ON user_question_attempts(user_id);

-- Discussion indexes
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_post_replies_post ON post_replies(post_id);
CREATE INDEX idx_votes_user ON votes(user_id);

-- Notification indexes
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert sample branches
INSERT INTO branches (name, code, description) VALUES
('Computer Science Engineering', 'CSE', 'Computer Science and Engineering'),
('Electronics and Communication', 'ECE', 'Electronics and Communication Engineering'),
('Mechanical Engineering', 'ME', 'Mechanical Engineering'),
('Civil Engineering', 'CE', 'Civil Engineering'),
('Information Technology', 'IT', 'Information Technology');

-- Insert resource types
INSERT INTO resource_types (name, description, icon) VALUES
('Video', 'YouTube videos and online lectures', 'video-icon'),
('Notes', 'Study notes and PDFs', 'notes-icon'),
('PYQ', 'Previous Year Question Papers', 'question-icon'),
('Books', 'Reference books and textbooks', 'book-icon'),
('Practice', 'Practice problems and exercises', 'practice-icon');

-- Insert career paths
INSERT INTO career_paths (name, description, category) VALUES
('Software Engineering Placement', 'Preparation for software engineering roles', 'placement'),
('GATE', 'Graduate Aptitude Test in Engineering', 'competitive_exam'),
('GRE', 'Graduate Record Examination', 'higher_studies'),
('CAT', 'Common Admission Test for MBA', 'competitive_exam'),
('Data Science Placement', 'Preparation for data science roles', 'placement');

-- Insert discussion categories
INSERT INTO discussion_categories (name, description, icon, order_index) VALUES
('General Discussion', 'General academic discussions', 'chat-icon', 1),
('Placement Experiences', 'Share your placement experiences', 'briefcase-icon', 2),
('Study Materials', 'Share and request study materials', 'book-icon', 3),
('Career Guidance', 'Career advice and guidance', 'compass-icon', 4),
('Technical Help', 'Get help with technical problems', 'code-icon', 5);

-- Insert sample achievements
INSERT INTO achievements (name, description, achievement_type, criteria_value, rarity, points) VALUES
('First Steps', 'Complete your first lesson', 'completion', 1, 'Common', 10),
('Week Warrior', 'Maintain a 7-day streak', 'streak', 7, 'Common', 50),
('Month Master', 'Maintain a 30-day streak', 'streak', 30, 'Rare', 200),
('Problem Solver', 'Solve 100 coding problems', 'completion', 100, 'Epic', 500),
('Helper', 'Get 50 upvotes on your contributions', 'contribution', 50, 'Rare', 300);