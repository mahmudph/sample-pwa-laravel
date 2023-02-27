/**
 * database helper is a class used to access indexDb database
 */
export class DatabaseHelper {
    constructor(dbName, version) {
        this.dbName = dbName;
        this.version = version;
    }

    /**
     * open database of the indesDb
     * @returns Promise<IDBDatabase>
     */
    openDatabase = () => {
        return new Promise((resolve, reject) => {
            try {
                const db = window.indexedDB.open(this.dbName, this.version);
                db.onsuccess = (_) => resolve(db.result);
                db.onerror = (e) => {
                    reject(`Database error: ${e}`);
                };
            } catch (e) {
                console.log(e);
                reject(`Open database was failure`);
            }
        });
    };

    /**
     * get all data from table name
     * @param {Array<string> } tableName
     * @param {string} key
     * @returns Array
     */
    getAllData = (tableName, key) => {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.openDatabase();

                const tx = db.transaction(tableName, "readonly");
                const store = tx.objectStore(key).getAll();

                store.onsuccess = (event) => {
                    resolve(store.result);
                };
                store.onerror = (e) => {
                    reject(`getData error: ${e}`);
                };
            } catch (e) {
                reject(`getData error : ${e}`);
            }
        });
    };

    /**
     * get data from index db using id key
     * @param {Array<string>} tableName
     * @param {string} key
     * @param {int} id
     * @returns
     */
    getDataById = (tableName, key, id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.openDatabase();
                const tx = db.transaction(tableName, "readonly");
                const store = tx.objectStore(key).get(id);
                console.log(store);

                store.onsuccess = (event) => {
                    console.log(store.result);
                    resolve(store.result);
                };
                store.onerror = (e) => {
                    reject(`getDataById error: ${e}`);
                };
            } catch (e) {
                reject(`getDataById error: ${e}`);
            }
        });
    };

    /**
     * delete row in the table by id key
     * @param {Array<string>} tableName
     * @param {string} key
     * @param {int} id
     * @returns
     */
    deleteData = (tableName, key, id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await this.openDatabase();
                const tx = db.transaction(tableName, "readwrite");

                tx.objectStore(key).delete(id);
                console.log(tx);

                tx.onsuccess = (event) => {
                    console.log("successs");
                    resolve(true);
                };

                tx.onerror = (e) => {
                    reject(`deleteData erorr: ${e}`);
                };
            } catch (e) {
                reject(`deleteData erorr: ${e}`);
            }
        });
    };
}
