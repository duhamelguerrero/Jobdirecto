DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS personas;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cc;
DROP TABLE If EXISTS job_reporter;
DROP TABLE If EXISTS cities;
DROP TABLE If EXISTS cities_area;
DROP TABLE If EXISTS temporalAnalytics;

CREATE TABLE cities
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    prefix VARCHAR(10),
    limitation bool DEFAULT false
);

CREATE TABLE cities_area
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    active bool DEFAULT false,
    id_city INT
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(250),
    email VARCHAR(250),
    pass VARCHAR(250),
    premium bool DEFAULT false,
    facebookId VARCHAR(300) UNIQUE
);

CREATE TABLE cc
(
    id SERIAL PRIMARY KEY,
    id_transsaction VARCHAR(300),
    id_external INT,
    type VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price_type VARCHAR(50),
    price decimal(20,2),
    status VARCHAR(255)
);


CREATE TABLE jobs
(
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
    urgent bool,
    postType VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted bool DEFAULT FALSE,
    id_area INT
);

CREATE TABLE job_reporter
(
    id_job INT,
    id_user INT,
    reason TEXT,
    PRIMARY KEY(id_job,id_user)
);


CREATE TABLE personas
(
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


CREATE TABLE temporalAnalytics
(
    id SERIAL PRIMARY KEY,
    wantsToPay VARCHAR(300),
    doesNotWantToPay VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- jobs
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, urgent)
VALUES
    ('Tribeca bagels', 'Cocinero', '14', 'cash', 'lunes a viernes tardes hasta cerrar', 'juana marcos', '127 East 7th New York, NY 10009', '(646) 850-5345', 'manhattan', false);
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, urgent)
VALUES
    ('Bubbas Bistro', 'Cocinero con experiencia', '13', 'ambos', 'fines de semana', 'maria', '2071 Clove RdStaten Island, NY 10304', '(718) 524-7174', 'Staten Island', false);
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, urgent)
VALUES
    ('Lobster Joint', 'Preparador', '16', 'Check', 'lunes marte y miercoles', 'nicola', '225 Liberty StNew York, NY 10281', '(212) 981-8577', 'Manhattan', false);
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, urgent)
VALUES
    ('Lobster Joint', 'Mesera', '16', 'Check', 'lunes marte y miercoles', 'nicola', '225 Liberty StNew York, NY 10281', '(212) 981-8577', 'Manhattan', false);
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, urgent)
VALUES
    ('Daltons Bar Grill', 'Mesera', '15', 'Cash', 'lunes, martes, miercoles sabados y domingos', 'juan', '60 E 65th St.New York, NY 10065', '(212) 288-0033', 'Manhattan', false);
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, urgent)
VALUES
    ('East village deli', 'Lavaplatos', '13', 'ambos', 'fines de semana', 'maria', '2071 Clove RdStaten Island, NY 10304', '(718) 524-7174', 'Staten Island', false);
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, urgent)
VALUES
    ('Molo Ristorante', 'Pizzero', '16', 'Check', 'lunes marte y miercoles', 'nicola', '225 Liberty StNew York, NY 10281', '(212) 981-8577', 'Manhattan', true);


-- urgent jobs
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, extrainfo, urgent)
VALUES
    ('Negocio Ejemplo', 'cocinero de linea', '', '', 'part time o full time hay', '', '', '', 'Manhattan', 'se le entrena si tiene poca experiencia, se busca gente que pueda empezar de inmediato', true);
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, extrainfo, urgent)
VALUES
    ('Wallys Deli', 'deli/ grill person', '', '', 'full time', 'Wally', '3345 broadway', '(917) 405-8424', 'Manhattan', 'debe tener experiencia porque es un deli ocupado', true);
INSERT INTO personas
    (personName, personStatus, personSkill, personExperience, personSchedule, personArea, personNumber, personExtraInfo)
VALUES
    ('Juan Carlos', 'seeksJob', 'Dishwasher o preparador', 'he travajado de dishwasher 2 años y tengo poquita experiencia de preparador comida americana aprendo rapido pero', 'en manhattan o brooklyn me queda cerca', 'puedo todos los dias manana tarde o noche', '646-240-3249', 'soy responsable con mi travajo, no bebo');


-- dont touch these
INSERT INTO jobs
    (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area, extrainfo, urgent)
VALUES
    ('', '', '', '', '', '', '', '', '', '', 'true');
INSERT INTO personas
    (personName, personStatus, personSkill, personExperience, personSchedule, personArea, personNumber, personExtraInfo)
VALUES
    ('', '', '', '', '', '', '', '');
INSERT INTO services
    (serviceOwner, serviceOffered, serviceNumber, serviceArea, serviceExtraInfo)
VALUES
    ('', '', '', '', '');
-- dont touch these


-- people seeking job
INSERT INTO personas
    (personName, personStatus, personSkill, personExperience, personSchedule, personArea, personNumber, personExtraInfo)
VALUES
    ('Sergio Criollo', 'seeksJob', 'delivery, dishwasher o busboy', '', 'turno en la mañana full time de 7 am to 5 pm ', '', '9294019305', 'dispuesto a trabajar');


-- someone offering services
INSERT INTO services
    (serviceOwner, serviceOffered, serviceNumber, serviceArea, serviceExtraInfo)
VALUES
    ('', '', '', '', '');

INSERT INTO cities
    (name,prefix)
VALUES('MIAMI', 'MIAMI');
INSERT INTO cities_area
    (name,id_city)
VALUES('MIAMI', 1);

