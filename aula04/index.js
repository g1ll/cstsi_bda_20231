import { initializeApp } from "firebase/app";
// import {getDatabase, get, ref, child, onValue, onChildAdded} from "firebase/database"
import * as fb from "firebase/database"

//banco produtos
const firebaseConfig = {
    apiKey: "AIzaSyC6sbR7WKFwXXQMlMVBe4Iiho6Adhh3_m0",
    authDomain: "atividade-02-50d44.firebaseapp.com",
    databaseURL: "https://atividade-02-50d44-default-rtdb.firebaseio.com",
    projectId: "atividade-02-50d44",
    storageBucket: "atividade-02-50d44.appspot.com",
    messagingSenderId: "165688220277",
    appId: "1:165688220277:web:6cfc910c34c9681b34f63c"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = fb.getDatabase(app);


let total; //usado para os exemplos com todos os filtros
total = 3; //usado para os filtros limitToFirst e limitToLast, comentar para os demais
const value = 4500;
const filtro = 'preco';
const produtos = [];

const refDB = fb.ref(db, 'produtos/');
//Descomente cada filtro por vez para testar
// const consulta = fb.query(refDB, fb.orderByChild(filtro), fb.limitToFirst(total))
// const consulta = fb.query(refDB,fb.orderByChild(filtro),fb.limitToLast(total))
// const consulta = fb.query(refDB, fb.orderByChild(filtro), fb.startAt(value))
// const consulta = fb.query(refDB,fb.orderByChild(filtro),fb.startAfter(value))
// const consulta = fb.query(refDB,fb.orderByChild(filtro),fb.endAt(value))
// const consulta = fb.query(refDB,fb.orderByChild(filtro),fb.endBefore(value))
// const consulta = fb.query(refDB,fb.orderByChild(filtro),fb.equalTo(value))
// const consulta = fb.query(refDB,fb.orderByChild('nome'),fb.equalTo('Samsumg A5 - 2017'))
// const consulta = fb.query(refDB,fb.orderByChild('nome'),fb.startAt('SSD'))
const consulta = fb.query(refDB,fb.orderByChild('preco'))


//Total de resultados da consulta
fb.onValue(consulta, snap => {
        // if ternário: (flag)?true:false;
        // total = (snap.exists()) ? Object.entries(snap.val()).length : 0
        total = (snap.exists()) ? Object.keys(snap.val()).length : 0
        console.log(`Total da consulta: ${total}`);
    }
)

//Total de registros dentro do nó especificado (produtos)
fb.onValue(fb.query(fb.ref(db, 'produtos')), (snap) => {
    if (snap.exists()) {
        console.log(`Total de produtos: ${Object.keys(snap.val()).length}`)
    }
})

fb.onChildAdded(consulta, (dado) => {//executa a cada disparo do evento child_added
    produtos.push(dado.val())
    // console.log(dado.val())
})

setInterval(() => {//executa a cada 1 segundo para monitorar o array produtos
    // console.log([produtos.length, total])
    if (produtos.length === total) {
        produtos.length && console.table(produtos)
        process.exit(0);
    }
}, 1000)
