CREATE DATABASE TNVOTEDB;
USE TNVOTEDB;
CREATE TABLE VOTERS(
voter_id INT PRIMARY KEY auto_increment,
voter_name VARCHAR(30),
age INT,
gender VARCHAR(20),
district VARCHAR(20),
constituency VARCHAR(20),
party_name VARCHAR(50),
vote_count int
);
INSERT INTO VOTERS 
(voter_name, age, gender, district, constituency, party_name, vote_count)
VALUES
('Arun Kumar', 25, 'Male', 'Chennai', 'T Nagar', 'DMK', 1),
('Priya Sharma', 32, 'Female', 'Coimbatore', 'South', 'AIADMK', 1),
('Rahul Verma', 41, 'Male', 'Madurai', 'Central', 'BJP', 1),
('Sneha Reddy', 28, 'Female', 'Salem', 'North', 'Congress', 1),
('Karthik Raj', 35, 'Male', 'Trichy', 'East', 'DMK', 1),
('Divya Nair', 22, 'Female', 'Erode', 'West', 'NTK', 1),
('Vijay Singh', 45, 'Male', 'Tirunelveli', 'South', 'AIADMK', 1),
('Meena Lakshmi', 30, 'Female', 'Vellore', 'Central', 'DMK', 1),
('Ajay Patel', 27, 'Male', 'Chennai', 'Anna Nagar', 'BJP', 1),
('Keerthana S', 24, 'Female', 'Thoothukudi', 'Harbour', 'Congress', 1),
('Suresh Babu', 39, 'Male', 'Karur', 'West', 'DMK', 1),
('Anitha Devi', 29, 'Female', 'Dindigul', 'North', 'AIADMK', 1),
('Rohit Mehta', 33, 'Male', 'Namakkal', 'East', 'NTK', 1),
('Pooja Iyer', 26, 'Female', 'Kanchipuram', 'South', 'DMK', 1),
('Manoj Kumar', 50, 'Male', 'Cuddalore', 'Central', 'Congress', 1),
('Lakshmi Priya', 31, 'Female', 'Thanjavur', 'West', 'BJP', 1),
('Harishankar', 37, 'Male', 'Virudhunagar', 'North', 'AIADMK', 1),
('Nivetha R', 23, 'Female', 'Chennai', 'Velachery', 'DMK', 1),
('Prakash Rao', 42, 'Male', 'Nagapattinam', 'East', 'Congress', 1),
('Aishwarya Menon', 27, 'Female', 'Tiruppur', 'South', 'NTK', 1);
UPDATE voters SET vote_count=80000 WHERE voter_id=2;
UPDATE voters SET vote_count=50000 WHERE voter_id=3;
UPDATE voters SET vote_count=60000 WHERE voter_id=4;
UPDATE voters SET vote_count=20000 WHERE voter_id=5;
UPDATE voters SET vote_count=100000 WHERE voter_id=6;
UPDATE voters SET vote_count=10000 WHERE voter_id=7;
UPDATE voters SET vote_count=20000 WHERE voter_id=8;
UPDATE voters SET vote_count=350000 WHERE voter_id=9;
UPDATE voters SET vote_count=450000 WHERE voter_id=10;
UPDATE voters SET vote_count=120000 WHERE voter_id=11;
UPDATE voters SET vote_count=13000 WHERE voter_id=12;
UPDATE voters SET vote_count=150000 WHERE voter_id=13;
UPDATE voters SET vote_count=170000 WHERE voter_id=14;
UPDATE voters SET vote_count=16000 WHERE voter_id=15;
UPDATE voters SET vote_count=380000 WHERE voter_id=16;
UPDATE voters SET vote_count=480000 WHERE voter_id=17;
UPDATE voters SET vote_count=580000 WHERE voter_id=18;
UPDATE voters SET vote_count=80000 WHERE voter_id=19;
SHOW tables;
SELECT * FROM voters;
-- task 2
SELECT voter_name,party_name FROM voters;
-- task 3
SELECT * FROM voters WHERE vote_count>70000;
--  task 4
SELECT voter_name FROM voters WHERE district="Chennai";
-- task 5
SELECT voter_name FROM voters WHERE party_name="DMK";
-- task 6
SELECT voter_name FROM voters WHERE district="Namakkal" AND vote_count > 60000;
-- task 7
SELECT voter_name FROM voters order by vote_count ASC;
-- task 8
SELECT voter_name FROM voters order by vote_count DESC;
-- task 9
SELECT  district FROM voters order by district; 
-- task 10
SELECT COUNT(*) FROM voters;
-- task 11
SELECT party_name,SUM(vote_count) FROM voters GROUP BY party_name;
-- task 12
SELECT district,AVG(vote_count) FROM voters GROUP BY district;
-- task 13
SELECT party_name,SUM(vote_count) AS total_votes FROM voters GROUP BY party_name HAVING SUM(vote_count) > 50000;
-- task 14
SELECT district,MAX(vote_count) AS highest_vote FROM voters GROUP BY district;
-- task 15
SELECT district,AVG(vote_count) AS average FROM voters group by district HAVING AVG(vote_count) >60000;
