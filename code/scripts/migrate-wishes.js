const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc, deleteField } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyD3D3dfvqxFnphZSiOAtiSh4shiNo8HwSE",
  authDomain: "hanh-tin-wedding.firebaseapp.com",
  projectId: "hanh-tin-wedding",
  storageBucket: "hanh-tin-wedding.firebasestorage.app",
  messagingSenderId: "139946357063",
  appId: "1:139946357063:web:58d9daf4ad62b9a8c71c62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateData() {
  console.log('Bắt đầu chuyển đổi dữ liệu...');
  const querySnapshot = await getDocs(collection(db, 'wishes'));
  
  let count = 0;
  for (const document of querySnapshot.docs) {
    const data = document.data();
    if (data.timestamp && !data.createdAt) {
      await updateDoc(doc(db, 'wishes', document.id), {
        createdAt: data.timestamp,
        // timestamp: deleteField() // Có thể giữ lại hoặc xóa
      });
      count++;
    }
  }
  console.log(`Đã chuyển đổi thành công ${count} lời chúc cũ.`);
  process.exit(0);
}

migrateData().catch(console.error);
