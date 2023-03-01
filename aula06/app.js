import { MongoClient } from "mongodb";
import {readFile} from 'fs/promises';

const myDB = {
	domain: "localhost",
	port: 27017
}

const uri = `mongodb://${myDB.domain}:${myDB.port}`
const client = new MongoClient(uri)

try {
	await client.connect();
	await client.db('admin').command({ 'ping': 1 })
	console.log('Conectado ao mongo!')

	// const produto = {
	// 	id_prod: 157,
	// 	nome: "Novo Produto Teste TRES",
	// 	descricao:"Testando inserção de novo produto"
	// }

	// const result = await client.db('loja')
	// 			.collection('produtos')
	// 			.insertOne(produto)

	// result.acknowledged && console.log("Produto inserido!!")

	//Insert Many

	// const produtos = [
	// 	{
	// 		id_prod: 158,
	// 		nome: "Novo Produto Teste quatro",
	// 		descricao: "Testando inserção de novo produto"
	// 	},
	// 	{
	// 		id_prod: 159,
	// 		nome: "Novo Produto Teste quinto",
	// 		descricao: "Testando inserção de novo produto"
	// 	},
	// 	{
	// 		id_prod: 160,
	// 		nome: "Novo Produto Teste sexto",
	// 		descricao: "Testando inserção de novo produto"
	// 	}
	// ]

	const jsonFile = await readFile('./produtos.json')
	const produtos = JSON.parse(jsonFile);

	const result = await client.db('market')
				.collection('produtos')
				.insertMany(produtos)

	console.log(result)


} catch (error) {
	console.log("ERROR")
	console.log(error)
}
finally {
	process.exit(0)
}