DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS personas;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cc;
DROP TABLE If EXISTS job_reporter;
DROP TABLE If EXISTS cities;
DROP TABLE If EXISTS cities_area;
DROP TABLE If EXISTS temporalAnalytics;

CREATE TABLE cities(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    prefix VARCHAR(10),
    limitation bool DEFAULT false
);

CREATE TABLE cities_area(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    active bool DEFAULT false,
    id_city INT
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(250),
    email VARCHAR(250),
    pass VARCHAR(250),
    premium bool DEFAULT false,
    facebookId VARCHAR(300)
);

CREATE TABLE cc(
    id SERIAL PRIMARY KEY,
    id_transsaction VARCHAR(300),
    id_external INT,
    type VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price_type VARCHAR(50),
    price decimal(20,2),
    status VARCHAR(255)
);


CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    id_user INT,
    active bool DEFAULT TRUE,
    restName VARCHAR(300),
    jobType VARCHAR(255),
    hourPay VARCHAR(255),
    typePay VARCHAR(255) ,
    schedule VARCHAR(255),
    contact VARCHAR(255) ,
    address VARCHAR(255),
    phone VARCHAR(255),
    area VARCHAR(255),
    extrainfo VARCHAR(255),
    urgent VARCHAR(255),
    postType VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted bool DEFAULT FALSE,
    id_area INT
);

CREATE TABLE job_reporter(
    id_job INT,
    id_user INT,
    reason TEXT,
    PRIMARY KEY(id_job,id_user)
);


CREATE TABLE personas(
    id SERIAL PRIMARY KEY,
    active bool DEFAULT TRUE,
    personName VARCHAR(300),
    personStatus VARCHAR(300),
    personSkill VARCHAR(300),
    personExperience VARCHAR(1300),
    personSchedule VARCHAR(1300),
    personArea VARCHAR(300),
    personNumber VARCHAR(300),
    personExtraInfo VARCHAR(1300),
    id_user INT,
    postType VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_area INT
);


CREATE TABLE temporalAnalytics(
    id SERIAL PRIMARY KEY,
    wantsToPay VARCHAR(300),
    doesNotWantToPay VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


