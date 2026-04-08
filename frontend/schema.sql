-- groups table 

CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT now()
);

