const spicedPg = require("spiced-pg");
let dbUrl;
if (process.env.DATABASE_URL2 !== undefined) {
    dbUrl = process.env.DATABASE_URL2;
} else if (process.env.DATABASE_URL !== undefined) {
    dbUrl = process.env.DATABASE_URL;
} else {
    let secrets = require("./secrets.json");
    dbUrl = `postgres:${secrets.dbUser}:${secrets.dbPassword}@${secrets.dbHost}:${secrets.dbPort}/${secrets.dbName}`;
}
const db = spicedPg(dbUrl);
var bcrypt = require("bcryptjs");

exports.publishJob = function(
    id_user,
    restname,
    jobtype,
    hourpay,
    typepay,
    schedule,
    contact,
    address,
    area,
    phone,
    extrainfo,
    urgent,
    active = true
) {
    return db
        .query(
            `
        INSERT INTO jobs
        (id_user, restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone, extrainfo, urgent, postType, active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        returning *;
        `,
            [
                id_user,
                restname,
                jobtype,
                hourpay,
                typepay,
                schedule,
                contact,
                address,
                area,
                phone,
                extrainfo,
                urgent,
                "job",
                active
            ]
        )
        .then(function(results) {
            return results.rows[0];
        });
};

exports.publishJobNoUser = function(
    restname,
    jobtype,
    hourpay,
    typepay,
    schedule,
    contact,
    address,
    area,
    phone,
    extrainfo,
    urgent,
    active = true
) {
    return db
        .query(
            `
        INSERT INTO jobs
        (restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone, extrainfo, urgent, postType, active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        returning *;
        `,
            [
                restname,
                jobtype,
                hourpay,
                typepay,
                schedule,
                contact,
                address,
                area,
                phone,
                extrainfo,
                urgent,
                "job",
                active
            ]
        )
        .then(function(results) {
            return results.rows[0];
        });
};

exports.publishJob2 = function(
    facebookId,
    restname,
    jobtype,
    hourpay,
    typepay,
    schedule,
    contact,
    address,
    area,
    phone,
    extrainfo,
    urgent
) {
    return db
        .query(
            `
        INSERT INTO jobs2
        (facebookId, restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone, extrainfo, urgent, postType)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        returning *;
        `,
            [
                facebookId,
                restname,
                jobtype,
                hourpay,
                typepay,
                schedule,
                contact,
                address,
                area,
                phone,
                extrainfo,
                urgent,
                "job"
            ]
        )
        .then(function(results) {
            return results.rows;
        });
};

exports.publishJobNoUser2 = function(
    restname,
    jobtype,
    hourpay,
    typepay,
    schedule,
    contact,
    address,
    area,
    phone,
    extrainfo,
    urgent
) {
    return db
        .query(
            `
        INSERT INTO jobs2
        (restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone, extrainfo, urgent, postType)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        returning *;
        `,
            [
                restname,
                jobtype,
                hourpay,
                typepay,
                schedule,
                contact,
                address,
                area,
                phone,
                extrainfo,
                urgent,
                "job"
            ]
        )
        .then(function(results) {
            return results.rows;
        });
};

exports.publishPerson = function(
    facebookId,
    personName,
    personStatus,
    personSkill,
    personExperience,
    personSchedule,
    personArea,
    personNumber,
    personExtraInfo,
    active = true
) {
    return db
        .query(
            `
        INSERT INTO personas
        (facebookId, personName, personStatus, personSkill, personExperience, personSchedule, personArea, personNumber, personExtraInfo, postType,active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        returning *;
        `,
            [
                facebookId,
                personName,
                personStatus,
                personSkill,
                personExperience,
                personSchedule,
                personArea,
                personNumber,
                personExtraInfo,
                "person",
                active
            ]
        )
        .then(function(results) {
            return results.rows[0];
        });
};

exports.publishPersonNoUser = function(
    personName,
    personStatus,
    personSkill,
    personExperience,
    personSchedule,
    personArea,
    personNumber,
    personExtraInfo,
    active = true
) {
    return db
        .query(
            `
        INSERT INTO personas
        ( personName, personStatus, personSkill, personExperience, personSchedule, personArea, personNumber, personExtraInfo, postType,active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)
        returning *;
        `,
            [
                personName,
                personStatus,
                personSkill,
                personExperience,
                personSchedule,
                personArea,
                personNumber,
                personExtraInfo,
                "person",
                active
            ]
        )
        .then(function(results) {
            return results.rows[0];
        });
};

// exports.publishPerson2 = function(
//     facebookId,
//     personName,
//     personStatus,
//     personSkill,
//     personExperience,
//     personSchedule,
//     personArea,
//     personNumber,
//     personExtraInfo
// ) {
//     return db
//         .query(
//             `
//         INSERT INTO personas2
//         (facebookId, personName, personStatus, personSkill, personExperience, personSchedule, personArea, personNumber, personExtraInfo, postType)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//         returning *;
//         `,
//             [
//                 facebookId,
//                 personName,
//                 personStatus,
//                 personSkill,
//                 personExperience,
//                 personSchedule,
//                 personArea,
//                 personNumber,
//                 personExtraInfo,
//                 "person"
//             ]
//         )
//         .then(function(results) {
//             return results.rows;
//         });
// };

// exports.publishPersonNoUser2 = function(
//     personName,
//     personStatus,
//     personSkill,
//     personExperience,
//     personSchedule,
//     personArea,
//     personNumber,
//     personExtraInfo
// ) {
//     return db
//         .query(
//             `
//         INSERT INTO personas2
//         ( personName, personStatus, personSkill, personExperience, personSchedule, personArea, personNumber, personExtraInfo, postType)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//         returning *;
//         `,
//             [
//                 personName,
//                 personStatus,
//                 personSkill,
//                 personExperience,
//                 personSchedule,
//                 personArea,
//                 personNumber,
//                 personExtraInfo,
//                 "person"
//             ]
//         )
//         .then(function(results) {
//             return results.rows;
//         });
// };

exports.findOrCreateFacebookUser = function(id, name) {
    return exports.getFacebookUser(id).then(user => {
        if (user) {
            return user;
        }
        return db
            .query(
                `
                  INSERT INTO users
                  (facebookId, name)
                  VALUES ($1, $2)
                  returning *;
                  `,
                [id, name]
            )
            .then(function(results) {
                return results.rows;
            });
    });
};

exports.getFacebookUser = function(id) {
    return db
        .query(`SELECT * FROM users WHERE facebookId = $1`, [id])
        .then(results => {
            return results.rows[0];
        });
};

exports.setPremium = function(id) {
    return db
        .query(`UPDATE users SET premium = true WHERE id = $1`, [id])
        .then(results => {
            console.log(results);
            return results.rows[0];
        });
};

exports.getUserStatus = function(facebookId) {
    return db
        .query(`SELECT premium FROM users WHERE id = $1`, [facebookId])
        .then(results => {
            console.log("should get user status: ", results.rows[0].premium);
            return results.rows[0].premium;
        });
};

exports.getJobInfo = function(id, isphone) {
    let phone = "";
    if(!isphone){
        phone = ", false as phone";
    }
    return db
        .query(`SELECT * ${phone} FROM jobs WHERE id = $1`, [id])
        .then(results => {
            return results.rows[0];
        });
};

exports.reportPost = function(id, clickerid) {
    console.log("an apple a day");
    return db
        .query(
            `INSERT INTO job_reporter (id_job,id_user) VALUES ($1,$2);
        ;`,
            [id, clickerid]
        )
        .then(function(results) {
            console.log(results.rows);
            return results.rows;
        })
        .catch(r => r);
};

exports.whoHasReported = function(id) {
    console.log("gimme that array");
    return db
        .query(
            `SELECT COUNT(*) as whoreported FROM job_reporter WHERE id_job = $1;
        ;`,
            [id]
        )
        .then(function(results) {
            console.log(results.rows);
            return results.rows;
        });
};

exports.deleteJob = function(id) {
    return db
        .query(
            `
    DELETE FROM jobs WHERE id = $1;`,
            [id]
        )
        .then(results => {});
};

exports.deletePersonPost = function(id) {
    return db
        .query(`DELETE FROM personas WHERE id = $1;`, [id])
        .then(results => {});
};

// exports.deletePost = function(id) {
//     db.any('select moveJob($1)', [id]);
// };

exports.getPeopleInfo = function(id, isphone) {
    let phone = "";
    if (!isphone && false) {
        phone = ", null as personnumber";
    }
    return db
        .query(`SELECT * ${phone} FROM personas WHERE id = $1`, [id])
        .then(results => {
            return results.rows[0];
        });
};

exports.getDate = function(id) {
    return db
        .query(`SELECT created_at FROM jobs WHERE id = $1`, [id])
        .then(results => {
            return results.rows[0];
        });
};

exports.getJobforCorrect = function(id) {
    return db
        .query(
            `SELECT id, restname, jobtype, hourpay, typepay, schedule, contact, address, phone FROM jobs WHERE id = $1`,
            [id]
        )
        .then(results => {
            return results.rows[0];
        });
};

exports.getJobs = function(isLimit) {
    let limit = "";
    if (isLimit) {
        limit = "LIMIT 5";
    }
    return db
        .query(
            `SELECT *
        FROM jobs
        WHERE active = TRUE
        AND created_at > now()- interval '2 week'
        ORDER BY id DESC
            ${limit}
        ;`
        )
        .then(results => {
            return results.rows;
        });
};

exports.getServices = function() {
    return db
        .query(
            `SELECT *
        FROM services
        ORDER BY id DESC
        LIMIT 100
        ;`
        )
        .then(results => {
            return results.rows;
        });
};

exports.getPeople = function(isLimit) {
    let limit = "";
    if (isLimit) {
        limit = "LIMIT 5";
    }
    return db
        .query(
            `SELECT *
        FROM personas
        WHERE active=true
        ORDER BY id DESC
        ${limit}
        ;`
        )
        .then(results => {
            return results.rows;
        });
};

exports.hashPassword = function(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

exports.cancelUrgency = function() {
    return db
        .query(
            `
        INSERT INTO temporalAnalytics
        (cancelUrgency)
        VALUES ($1)
        RETURNING *;
        `,
            ["X"]
        )
        .then(function(results) {
            return results.rows;
        });
};

exports.wantsToPay = function() {
    return db
        .query(
            `
        INSERT INTO temporalAnalytics
        (wantsToPay)
        VALUES ($1)
        RETURNING *;
        `,
            ["X"]
        )
        .then(function(results) {
            return results.rows;
        });
};

exports.getLoginId = function(email) {
    return db
        .query(`SELECT id FROM users WHERE email = $1`, [email])
        .then(function(result) {
            return result.rows[0].id;
        });
};

exports.createTransaction = function(id_job, type, price) {
    let transactionID = uuidv4();

    return db
        .query(
            `
        INSERT INTO cc
        (id_transsaction,id_external,type,price_type,price,status)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *;
        `,
            [transactionID, id_job, type, "USD", price, "PENDING"]
        )
        .then(function(results) {
            return transactionID;
        });
};

exports.getJobFromTransaction = function(id_trans) {
    return db
        .query(
            "SELECT j.* FROM jobs j INNER JOIN cc ON cc.id_external=j.id WHERE cc.id_transsaction=$1 AND TYPE='JOB'",
            [id_trans]
        )
        .then(result => {
            return result.rows[0];
        });
};

exports.getPersonFromTransaction = function(id_trans) {
    return db
        .query(
            "SELECT j.* FROM personas j INNER JOIN cc ON cc.id_external=j.id WHERE cc.id_transsaction=$1 AND TYPE='PERSON'",
            [id_trans]
        )
        .then(result => {
            return result.rows[0];
        });
};
exports.cancelTransaction = function(id) {
    return db.query(
        "UPDATE cc SET status='REJECTED' WHERE id_transsaction=$1",
        [id]
    );
};
exports.markActive = function(id_job) {
    return db
        .query("UPDATE jobs SET active=true WHERE id=$1", [id_job])
        .then(r => {
            return db.query(
                "UPDATE cc SET status='APPROVE' WHERE id_external=$1",
                [id_job]
            );
        });
};

exports.markActivePerson = function(id_job) {
    return db
        .query("UPDATE personas SET active=true WHERE id=$1", [id_job])
        .then(r => {
            return db.query(
                "UPDATE cc SET status='APPROVE' WHERE id_external=$1",
                [id_job]
            );
        });
};

exports.getCountry = function() {
    return db.query("SELECT * FROM cities").then(async result => {
        for (let i = 0; i < result.rows.length; i++) {
            let row = result.rows[i];
            row.areas = await db
                .query("SELECT * FROM cities_area WHERE id_city = $1", [row.id])
                .then(r => r.rows);
        }
        return result.rows;
    });
};

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
