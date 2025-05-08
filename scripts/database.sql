-- Create a "users" table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK(role IN ('user', 'admin')) DEFAULT 'user',
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a "tasks" table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) CHECK(status IN ('pending', 'in-progress', 'complete')) DEFAULT 'pending',
    due_date TIMESTAMP NOT NULL,
    assigned_to INT REFERENCES users(id) ON DELETE SET NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster search
CREATE INDEX idx_status ON tasks(status);
CREATE INDEX idx_due_date ON tasks(due_date);
CREATE INDEX idx_assigned_to ON tasks(assigned_to);
