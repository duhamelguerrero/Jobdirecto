let secrets = require("./secrets.json");
const spicedPg = require("spiced-pg");


let sourcedbUrl = `postgres:${secrets.sourcedbUser}:${secrets.sourcedbPassword}@${secrets.sourcedbHost}:${secrets.sourcedbPort}/${secrets.sourcedbName}`;
let targetdbUrl = `postgres:${secrets.targetdbUser}:${secrets.targetdbPassword}@${secrets.targetdbHost}:${secrets.targetdbPort}/${secrets.targetdbName}`;

const sourcedb = spicedPg(sourcedbUrl);
const targetdb = spicedPg(targetdbUrl);

async function createCities(){
    await targetdb.query(`INSERT INTO cities (id,name, prefix, limitation) VALUES(1,'New York','',true)`);

    await targetdb.query(`INSERT INTO cities_area (id,name, active, id_city) VALUES(1,'Manhattan',true,1)`);
    await targetdb.query(`INSERT INTO cities_area (id,name, active, id_city) VALUES(2,'Brooklyn',true,1)`);
    await targetdb.query(`INSERT INTO cities_area (id,name, active, id_city) VALUES(3,'Queens',true,1)`);
    await targetdb.query(`INSERT INTO cities_area (id,name, active, id_city) VALUES(4,'Bronx',true,1)`);
    await targetdb.query(`INSERT INTO cities_area (id,name, active, id_city) VALUES(5,'Staten Island',true,1)`);
    await targetdb.query(`INSERT INTO cities_area (id,name, active, id_city) VALUES(6,'Other area in NY',true,1)`);
}

function getIdArea(area){
    switch (area) {
        case "Manhattan":
            return 1;
        case "Brooklyn":
            return 2;
        case "Queens":
            return 3;
        case "Bronx":
            return 4;
        case "Staten Island":
            return 5;
        default:
            return 6;
    }
}

async function migreateJobs(){
    let jobs = await sourcedb.query("SELECT * FROM jobs").then(r=>r.rows)
    
    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];

        job.id_area = getIdArea(job.area);

        await targetdb.query(` INSERT INTO jobs
        (id_user,
    active,
    restname,
    jobtype,
    hourpay,
    typepay,
    schedule,
    contact,
    address,
    phone,
    area,
    extrainfo,
    urgent,
    posttype,
    created_at,
    deleted,
    id_area) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
    `, [
            job.id_user,
            job.active,
            job.restname,
            job.jobtype,
            job.hourpay,
            job.typepay,
            job.schedule,
            job.contect,
            job.address,
            job.phone,
            job.area,
            job.extrainfo,
            job.urgent,
            job.posttype,
            job.created_at,
            false,
            job.id_area,
        ])
    }
    return;
}

async function migreatePersonas(){
    let personas = await sourcedb.query("SELECT * FROM personas").then(r=>r.rows)
    
    
    for (let i = 0; i < personas.length; i++) {
        let persona = personas[i];

        persona.id_area = getIdArea(persona.personarea);

        
        await targetdb.query(` INSERT INTO personas
    (active,
        personName,
        personStatus,
        personSkill,
        personExperience,
        personSchedule,
        personArea,
        personNumber,
        personExtraInfo,
        id_user,
        postType,
        created_at ,
        id_area ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    `, [
            true,
            persona.personname,
            persona.personstatus,
            persona.personskill,
            persona.personexperience,
            persona.personschedule,
            persona.personarea,
            persona.personnumber,
            persona.personextrainfo,
            null,
            persona.posttype,
            persona.created_at,
            persona.id_area,
        ])
    }
}

createCities().then(async r=>{
    await migreateJobs();
    await migreatePersonas()
});

