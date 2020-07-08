const express = require("express")
const bookModel = require("../models/book")
const app = express()

app.post("/book", async (req, res) => {
    const book = new bookModel(req.body)

    try {
        await book.save()
        res.send(book)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get("/books", async (req, res) => {
    const books = await bookModel.find({})

    try {
        res.send(books)
    } catch (err) {
        res.status(500).send(err)
    }
})