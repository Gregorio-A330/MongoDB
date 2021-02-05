# MongoDB
## Entendendo o mongo e o CRUD

## Create / Read / Update / Delete


// referenciando aos comandos escritos como ">" como normalmente é representado no terminal

//No terminal~
//escreva:

> mongo

//isso irá abrir o shell do mongo para programar em linha de comando

// comandos de ajuda:

help

        db.help()                    help on db methods
        db.mycoll.help()             help on collection methods
        sh.help()                    sharding helpers
        rs.help()                    replica set helpers
        help admin                   administrative help
        help connect                 connecting to a db help
        help keys                    key shortcuts
        help misc                    misc things to know
        help mr                      mapreduce
        show dbs                     show database names
        show collections             show collections in current database
        show users                   show users in current database
        show profile                 show most recent system.profile entries with time >= 1ms
        show logs                    show the accessible logger names
        show log [name]              prints out the last segment of log in memory, 'global' is default
        use <db_name>                set current database
        db.mycoll.find()             list objects in collection mycoll
        db.mycoll.find( { a : 1 } )  list objects in mycoll where a == 1
        it                           result of the last line evaluated; use to further iterate
        DBQuery.shellBatchSize = x   set default number of items to display on shell
        exit                         quit the mongo shell



//mostra os bancos que estão rodando
///se for a primeira vez... só irão aparecer os padrões

>show dbs

        admin   0.000GB
        config  0.000GB
        local   0.000GB

// para usar um banco

>use shopDB

// vai utilizar um banco, porém, ele só irá aparecer quando tiver algum dado internamente

#### comando:

>db   // mostra o banco atual

shopDB 


## ---------------------------C R U D------------------------------------------ 

### Create Operations

#### comando:

>db.products.insertOne({_id: 1, name: "Pen", price: 1.20}) // insere uma linha de dados em formato de objeto

        { "acknowledged" : true, "insertedId" : 1 } //se der tudo certo te retorná true com o id do dado inserido

#### comando:

>show collections   //mostra o que seriam as "tabelas" do SQL

#### comando:


### Read Operations

> db.products.find() //retorna tudo o que estiver dentro do documento, como se fosse um 'select * from products'

        { "_id" : 1, "name" : "Pen", "price" : 1.2 }
        { "_id" : 2, "name" : "Pencil", "price" : 0.8 }

#### comando:

> db.products.find({name: "Pencil"}) // neste caso indicanto um parametro no find como se fosse um 'select name from products where name = pencil'

        { "_id" : 2, "name" : "Pencil", "price" : 0.8 }

//indicando parametros de busca mais detalhados

#### comando:

> db.products.find({price: {$gt: 1}}) //neste caso procurando pelo preço sendo ele maior que 1

        { "_id" : 1, "name" : "Pen", "price" : 1.2 } 


#### comando:

> db.products.find({_id: 1}, {name: 1}) //primeiro id e nome sendo true, retornando o id 1 e o nome "Pen"

        { "_id" : 1, "name" : "Pen" }

> db.products.find({_id: 1}, {name: 1, _id: 0}) // segundo parametro trazendo o nome e id como false, fazendo com que só retorne o nome

        { "name" : "Pen" }



## Update Operations

#### comando:

> db.products.find() //para mostrar o que contem dentro do banco e o que vamos alterar

        { "_id" : 1, "name" : "Pen", "price" : 1.2 }   
        { "_id" : 2, "name" : "Pencil", "price" : 0.8 }

#### comando:
> db.products.updateOne({_id: 1},{$set:{stock: 32}}) // Update no id 1 e colocando como segundo parametro como set e o que eu quero incluir, no caso uma nova "coluna"

        { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 } // informando que deu tudo certo

#### comando:
> db.products.find() //verificando as alterações, incluido o stock com valor 32

        { "_id" : 1, "name" : "Pen", "price" : 1.2, "stock" : 32 }
        { "_id" : 2, "name" : "Pencil", "price" : 0.8 }


//mesma situação para caso queira alterar algo que ja exista

#### comando:

> db.products.updateOne({_id: 2},{$set:{stock: 12}})  //incluindo o stock no id 2

        { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

#### comando:

> db.products.find() //conferindo se deu tudo certo

        { "_id" : 1, "name" : "Pen", "price" : 1.2, "stock" : 32 }
        { "_id" : 2, "name" : "Pencil", "price" : 0.8, "stock" : 12 }

#### comando:

> db.products.updateOne({_id: 2},{$set:{stock: 52}}) //alterando o stock do id 2 para 52 

        { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

#### comando:

> db.products.find() //conferindo novamente se deu tudo certo

        { "_id" : 1, "name" : "Pen", "price" : 1.2, "stock" : 32 }
        { "_id" : 2, "name" : "Pencil", "price" : 0.8, "stock" : 52 } <-----alterado------



### Delete Operations

#### comando:

> db.products.deleteOne({_id:2}) //apagar uma linha pelo id 2

        { "acknowledged" : true, "deletedCount" : 1 } //informando que deu tudo certo

> db.products.find() //confirmando o resultado

        { "_id" : 1, "name" : "Pen", "price" : 1.2, "stock" : 32 } //só retornou um resultado, logo deu tudo certo


### Relationships in MongoDB


        db.products.insert({
        _id: 3,
        name: "Rubber",
        price: 1.30,
        stock: 43,
        reviews: [
                {
                        authorName: "Sally",
                        rating: 5,
                        review: "Best rubber ever!"
                },
                {
                        authorName: "John",
                        rating: 5,
                        review: "AAAAAAAAAAAAAAAH"
                }
                ]
        })

// Aqui entra a parte de relacionamento no documento, no review tem um array

// contendo dois documentos dentro que são separados por { } que está dentro do documento principal de id 3

// neste caso estão encadeados e armazenados dentro do array review
