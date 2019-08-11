const spicedPg = require("spiced-pg");
let dbUrl;
if (process.env.DATABASE_URL !== undefined) {
    dbUrl = process.env.DATABASE_URL;
} else {
    let secrets = require("./secrets.json");
    dbUrl = `postgres:${secrets.dbUser}:${
    secrets.dbPassword
  }@localhost:5433/jobdirecto`;
}
const db = spicedPg(dbUrl);
var bcrypt = require("bcryptjs");

exports.publishJob = function(
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
        INSERT INTO jobs
        (facebookId, restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone, extrainfo, urgent, postType)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        returning *;
        `,
            [facebookId,
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
                urgent, "job"
            ]
        )
        .then(function(results) {
            return results.rows;
        });
};


exports.minusCounter = function(facebookId) {
    console.log("got fb id?", facebookId);
    return db.query(`UPDATE users SET postcounter = postcounter - 1 WHERE id = ($1);`, [facebookId])
}

exports.publishPerson = function(
    facebookId,
    personName,
    personStatus,
    personSkill,
    personExperience,
    personSchedule,
    personArea,
    personNumber,
    personExtraInfo
) {

    return db
        .query(
            `
        INSERT INTO personas
        (facebookId, personName, personStatus, personSkill, personExperience, personSchedule, personArea, personNumber, personExtraInfo, postType)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *;
        `,
            [facebookId,
                personName,
                personStatus,
                personSkill,
                personExperience,
                personSchedule,
                personArea,
                personNumber,
                personExtraInfo, "person"
            ]
        )
        .then(function(results) {
            return results.rows;
        });
};


exports.publishService = function(
    facebookId, serviceOwner,
    serviceOffered,
    serviceArea,
    serviceNumber,
    serviceExtraInfo
) {
    return db
        .query(
            `
        INSERT INTO services
        (facebookId, serviceOwner,
        serviceOffered,
        serviceArea,
        serviceNumber,
        serviceExtraInfo, postType)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        returning *;
        `,
            [
                facebookId, serviceOwner,
                serviceOffered,
                serviceArea,
                serviceNumber,
                serviceExtraInfo, "service"
            ]
        )
        .then(function(results) {
            return results.rows;
        });
};




exports.findOrCreateFacebookUser = function(id, name) {
    return exports.getFacebookUser(id).then(user => {
        if (user) {
            return user;
        }
        return db
            .query(
                `
                  INSERT INTO users
                  (id, name)
                  VALUES ($1, $2)
                  returning *;
                  `,
                [
                    id, name
                ]
            )
            .then(function(results) {
                return results.rows;
            });
    })
};

exports.getFacebookUser = function(id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]).then(results => {
        return results.rows[0];
    });
};




exports.getJobInfo = function(id) {
    return db.query(`SELECT * FROM jobs WHERE id = $1`, [id]).then(results => {
        return results.rows[0];
    });
};


exports.deleteJob = function(id) {
    return db.query(`
    DELETE FROM jobs WHERE id = $1;`, [id]).then(results => {
    });
};

exports.deleteService = function(id) {
    return db.query(`
    DELETE FROM services WHERE id = $1;`, [id]).then(results => {
    });
};

exports.deletePersonPost = function(id) {
    return db.query(`
    DELETE FROM personas WHERE id = $1;`, [id]).then(results => {
    });
};



// exports.deletePost = function(id) {
//     db.any('select moveJob($1)', [id]);
// };







exports.getServiceInfo = function(id) {
    return db.query(`SELECT * FROM services WHERE id = $1`, [id]).then(results => {
        return results.rows[0];
    });
};

exports.getPeopleInfo = function(id) {
    return db
        .query(`SELECT * FROM personas WHERE id = $1`, [id])
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

exports.getJobs = function() {
    return db
        .query(
            `SELECT *
        FROM jobs
        ORDER BY id DESC
        LIMIT 100
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

exports.getPeople = function() {
    return db
        .query(
            `SELECT *
        FROM personas
        ORDER BY id DESC
        LIMIT 100
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

exports.showHashPw = function(email) {
    return db
        .query(`SELECT password FROM users WHERE email = $1`, [email])
        .then(function(result) {
            return result.rows[0] && result.rows[0].password;
        });
};

exports.checkPassword = function(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(
            err,
            doesMatch
        ) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};

exports.registerUser = function(email, hashedpw) {
    return db
        .query(
            `
        INSERT INTO users
        (email, password)
        VALUES ($1, $2)
        RETURNING *;
        `,
            [email, hashedpw]
        )
        .then(function(results) {
            return results.rows;
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
