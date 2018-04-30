swagger: "2.0"
info:
  description: "The is the Library API for the NodeJS project. The app is hosted on Heroku using a SQLite database to store data. This API provides a fully-fonctionnal CRUD for a Library to manage books. As you can only read what are the books in the database from your browser, you may need a software to send the DELETE, POST or PUT queries."
  version: "1.0.0"
  title: "Library API"
host: "library-api--dev.herokuapp.com"
basePath: "/"
tags:
- name: "Books"
  description: "Libray CRUD API for managing Books"
  externalDocs:
    description: "Try it out"
    url: "http://library-api--dev.herokuapp.com/books"
schemes:
- "http"
paths:
  /books:
    get:
      summary: "Get all books"
      tags:
        - Books
      parameters: 
        - in: query
          name: id
          type: integer
          required: false
      produces:
        - "application/json"
      responses:
        200:
          description: "successful operation"
          schema:
            type: array
            items:
              $ref: "#/definitions/Books"
        404:
          description: ""
  /books/delete:
    delete:
      summary: "Delete a book"
      tags:
        - Books
      parameters: 
        - in: query
          name: id
          type: integer
          required: true
      produces:
        - "application/json"
      responses:
        200:
          description: "The book has been successfully deleted"
        400:
          description: "You must pass a book's id to delete it"
        404:
          description: "No book found for the provided id"
          
  /books/add:
    post:
      summary: "Add a new book"
      tags:
        - Books
      parameters: 
        - in: query
          name: id
          type: integer
          required: false
        - in: query
          name: name
          type: string
          required: true
        - in: query
          name: author
          type: string
          required: true
        - in: query
          name: release
          type: string
          required: false
        - in: query
          name: available
          type: boolean
          required: false
      produces:
        - "application/json"
      responses:
        201:
          description: "The book has been successfully created"
          schema:
            type: array
            items:
              $ref: "#/definitions/Books"
        400:
          description: "Missing data"
        404:
          description: "Incorrect Books.attribute"
          
  /books/update:
    put:
      summary: "Update an existing book"
      tags:
        - Books
      parameters: 
        - in: query
          name: id
          type: integer
          required: true
        - in: query
          name: name
          type: string
          required: false
        - in: query
          name: author
          type: string
          required: false
        - in: query
          name: release
          type: string
          required: false
        - in: query
          name: available
          type: boolean
          required: false
      produces:
        - "application/json"
      responses:
        200:
          description: "The book has been successfully updated"
          schema:
            type: array
            items:
              $ref: "#/definitions/Books"
        400:
          description: "Incorrect Books.attribute"
        404:
          description: "No book found for the provided id"
        
definitions:
  Books:
    type: object
    properties:
      id:
        type: integer
        description: "Book's id"
        example: 1
      name:
        type: string
        description: "Book's name"
        example: 'Marche ou crève'
      author:
        type: string
        description: "Book's author"
        example: 'Stephen King'
      release:
        type: string
        description: "Book's release date"
        example: '2018-04-30T15:38:42.853Z'
      available: 
        type: boolean
        description: "Wheter the book is available or not"
        example: true