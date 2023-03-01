// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getDatabase,
	 ref, child, update, get
} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const rfDB = getDatabase();

const prodRef = ref(rfDB, 'produtos')
const mostrarProdutos = (snap) => {
	console.log(snap.val())
	// process.exit(0)
}

// onValue(prodRef,mostrarProdutos);
// console.log("Teste!!")

// onChildAdded(prodRef,mostrarProdutos);
const key = "-MwSw5Py6lS3F4RbEcZr";
const nodeRef = ref(rfDB, `produtos/${key}`);
// const refImportado = child(nodeRef, 'importado');
get(child(nodeRef,'importado')).then(snap =>{
	let importado = !snap.val();
	update(ref(rfDB, `produtos/${key}`), {
		importado: importado
	}).then(() => {
		process.exit(0)
	})
})