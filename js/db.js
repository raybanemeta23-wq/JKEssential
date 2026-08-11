/*
  db.js — IndexedDB helper untuk JK Essensial
  Semua data (koleksi racikan, profil, API key) tersimpan 100% lokal
  di perangkat pengguna. Tidak ada data yang dikirim ke server manapun.
*/

const DB_NAME = 'jk_essensial_db';
const DB_VERSION = 1;
let _dbInstance = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (_dbInstance) { resolve(_dbInstance); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('koleksi')) {
        db.createObjectStore('koleksi', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => { _dbInstance = e.target.result; resolve(_dbInstance); };
    req.onerror = (e) => reject(e.target.error);
  });
}

/* ---------- Koleksi (racikan tersimpan) ---------- */
async function dbGetAllKoleksi() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('koleksi', 'readonly');
    const req = tx.objectStore('koleksi').getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function dbAddKoleksi(item) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('koleksi', 'readwrite');
    const req = tx.objectStore('koleksi').add(item);
    req.onsuccess = () => resolve(req.result); // returns generated id
    req.onerror = (e) => reject(e.target.error);
  });
}

async function dbUpdateKoleksi(item) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('koleksi', 'readwrite');
    const req = tx.objectStore('koleksi').put(item);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

async function dbDeleteKoleksi(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('koleksi', 'readwrite');
    const req = tx.objectStore('koleksi').delete(id);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

/* ---------- Settings (profil, API key, dll) ---------- */
async function dbSetSetting(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('settings', 'readwrite');
    const req = tx.objectStore('settings').put({ key, value });
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

async function dbGetSetting(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('settings', 'readonly');
    const req = tx.objectStore('settings').get(key);
    req.onsuccess = () => resolve(req.result ? req.result.value : null);
    req.onerror = (e) => reject(e.target.error);
  });
}
