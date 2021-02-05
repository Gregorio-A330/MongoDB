//criando acesso local via driver proprio do MongoDB

const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'fruitsDB';

const client = new MongoClient(url, { useUnifiedTopology: true });

//inicia a conexão como banco e faz o que bem entender internamente como 
//inserir ou deletar ou o que quer se seja dentro da conexão

client.connect(function (err) {
    assert.strictEqual(null, err);
    console.log("connected successfully to server");

    const db = client.db(dbName);


    //vai inserir o conteudo da função abaixo e depois encerra a conexão com o banco
    //insertDocuments(db, function(){
    findDocuments(db, function () {
        client.close();  //fecha a conexão
    });

});

const insertDocuments = function (db, callback) {
    // Pegando alguns documentos da coleção
    const collection = db.collection('fruits');
    // inserindo alguns documentos
    collection.insertMany([
        {
            name: "apple",
            score: 8,
            review: "Great fruit"
        },
        {
            name: "orange",
            score: 6,
            review: "Kinda sour"
        },
        {
            name: "banana",
            score: 11,
            review: "Wow it's a BANANA"
        }
    ], function (err, result) {
        assert.strictEqual(err, null); //validando para ver se não há erros na inserção do documento
        assert.strictEqual(3, result.result.n); //apenas verificando se há realmente 3 inserções no nossp documento
        assert.strictEqual(3, result.ops.length); //apenas verificando se há realmente 3 inserções no nossp documento
        console.log("inserted 3 documents into the collection"); // apenas mostrar no console 
        callback(result);
    });

}

const findDocuments = function (db, callback) {
    //pegando os documentos da coleção
    const collection = db.collection('fruits');
    //procurando alguns documentos
    collection.find({}).toArray(function (err, fruits) {
        assert.strictEqual(err, null)
        console.log("found the following records");
        console.log(fruits)
        callback(fruits)
    });
}