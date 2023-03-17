const fs = require('fs');
const dbpath = `${process.cwd()}/Database/users.json`;

module.exports = {
    /**
     * Loads the database
     * @returns {JSON}
     */
    loadDB() {
        try {
            const dbData = fs.readFileSync(dbpath);
            return JSON.parse(dbData);
        } catch (error) {
            console.error(`Error loading database: ${error.message}`);
            return {};
        }
    },
    
    /**
     * Updates the database
     * @param {JSON} json 
     */
    UpdateDB(json) {
        fs.writeFile(dbpath, JSON.stringify(json, null, 4), "utf8", function(err) {
            if (err) {
                console.error('Error ocurred while updating the database!')
            }
            else {
                console.log('Database Updated!');
            }
        });
    },

    /**
     * Determine whether or not the user exists
     * @param {String} email 
     * @returns {Boolean}
     */
    UserExists(email) {
        const db = this.loadDB();
        return db.hasOwnProperty(email);
    },

    /**
     * Determine whether or not the username exists
     * @param {String} username 
     * @returns {Boolean}
     */
    UsernameExists(username) {
        const db = this.loadDB();
        for (const email in db) {
            if (db.hasOwnProperty(email) && db[email].username === username) {
                return true;
            }
        }
        return false;
    },

    /**
     * Check the inputs and returns The User Object if exists
     * @param {String} username 
     * @param {String} password 
     * @returns {Object|null}
     */
    GetUser(username, password) {
        const db = this.loadDB();
        const user = Object.values(db).find(user => user.username === username && user.password === password);
        return user || null;
    },

    /**
     * Creates a new user and save it to the db
     * @param {String} email 
     * @param {String} username 
     * @param {String} password 
     * @returns {Boolean}
     */
    CreateUser(email, username, password) {
        const db = this.loadDB();
        if (db.hasOwnProperty(email)) {
            console.error(`User with email '${email}' already exists.`);
            return;
        }
        if (this.UsernameExists(username)) {
            console.error(`User with username '${username}' already exists.`);
            return;
        }
        db[email] = { username, password };
        this.UpdateDB(db);
        console.log(`User '${username}' created with email '${email}'.`);
        return true;
    }
};