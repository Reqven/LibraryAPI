'use strict';
const {expect} = require('chai');
const should = require('chai').should();
const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Library API', function() {
	describe('GET - /books', function() {
		var endpoint = '/books';
		it('200 with array of Books objects', function() {
			return request
				.get(endpoint)
				.then(response => {
					let books = response.body;
					expect(response.statusCode).to.be.equal(200);
					expect(books).to.be.an('array');
					books.forEach(b => {
						expect(b).to.be.an('object');
						expect(b).to.include.keys('id', 'name', 'author', 'release', 'available');
					});
				});
		});
		it('200 with a single Books object with ?id=1', function() {
			return request
				.get(endpoint)
				.query({ id: 1 })
				.then(response => {
					let book = response.body;
					expect(response.statusCode).to.be.equal(200)
					expect(book).to.be.an('object').that.includes.keys('id', 'name', 'author', 'release', 'available');
				});
		});
		it('404, book not found with ?id=999', function() {
			return request
				.get(endpoint)
				.query({ id: 999 })
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(404)
					expect(body).to.be.an('object').that.includes.keys('msg');
				});
		});
	});

	describe('GET - /books/delete', function() {
		var endpoint = '/books/delete';
		it('200 with confirmation message with ?id=1', function() {
			return request
				.delete(endpoint)
				.query({ id: 1 })
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(200);
					expect(body).to.be.an('object').that.includes.keys('msg');
				});
		});
		it('404, book not found with ?id=999', function() {
			return request
				.delete(endpoint)
				.query({ id: 999 })
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(404);
					expect(body).to.be.an('object').that.includes.keys('msg');
				});
		});
		it('400, bad request because no id passed', function() {
			return request
				.delete(endpoint)
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(400);
				});
		});
	});

	describe('GET - /books/add', function() {
		var endpoint = '/books/add';
		it('201 with all required params passed', function() {
			return request
				.post(endpoint)
				.query({
					name:   'Book.name',
					author: 'Book.author'
				})
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(201);
					expect(body).to.be.an('object').that.includes.keys('msg', 'book');
					let book = body.book;
					expect(book).to.be.an('object').that.includes.keys('id', 'name', 'author', 'release', 'available');
				});
		});
		it('201 with all possible params passed', function() {
			return request
				.post(endpoint)
				.query({
					id: '50',
					name: 'Book.name',
					author: 'Book.author',
					release: '2018-04-30T15:38:42.853Z',
					available: true
				})
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(201);
					expect(body).to.be.an('object').that.includes.keys('msg', 'book');
					let book = body.book;
					expect(book).to.be.an('object').that.includes.keys('id', 'name', 'author', 'release', 'available');
				});
		});
		it('400 when a param is incorrect', function() {
			return request
				.post(endpoint)
				.query({
					name: 'Book.name',
					author: 'Book.author',
					release: 'This is obviouly not a valid date'
				})
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(400);
					expect(body).to.be.an('object').that.includes.keys('msg');
				});
		});
		it('400 when an id is passed and already exists, ?id=2', function() {
			return request
				.post(endpoint)
				.query({
					id: 2,
					name: 'Book.name',
					author: 'Book.author',
				})
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(400);
					expect(body).to.be.an('object').that.includes.keys('msg');
				});
		});
	});

	describe('GET - /books/update', function() {
		var endpoint = '/books/update';
		it('200 with an existing id and valid params', function() {
			return request
				.put(endpoint)
				.query({
					id: 2,
					name:   'Book.newName',
					author: 'Book.newAuthor',
				})
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(200);
					expect(body).to.be.an('object').that.includes.keys('msg')
				});
		});
		it('404 with an NON-existing id and valid params', function() {
			return request
				.put(endpoint)
				.query({
					id: 500,
					name:   'Book.newName',
					author: 'Book.newAuthor',
				})
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(404);
					expect(body).to.be.an('object').that.includes.keys('msg')
				});
		});
		it('400 with an existing id and INvalid params', function() {
			return request
				.put(endpoint)
				.query({
					id: 2,
					name:   'Book.newName',
					author: 'Book.newAuthor',
					release: 'This is obviously not a valid date'
				})
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(400);
					expect(body).to.be.an('object').that.includes.keys('msg')
				});
		});
		it('400 with missing required id', function() {
			return request
				.put(endpoint)
				.query({
					name:   'Book.newName',
					author: 'Book.newAuthor',
					release: 'This is obviously not a valid date'
				})
				.then(response => {
					let body = response.body;
					expect(response.statusCode).to.be.equal(400);
					expect(body).to.be.an('object').that.includes.keys('msg')
				});
		});
	});
});