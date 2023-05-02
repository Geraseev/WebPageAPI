const express = require("express")
const router = express.Router();

const {sucess, fail} = require("../config/resposta")
const MoviesDAO = require("../models/Movie")

router.get("/", (req, res) => {
    MoviesDAO.list().then((movies) => {
        res.json(sucess(movies, "list"))
    })
})

router.get("/:id", (req, res) => {
    MoviesDAO.getById(req.params.id).then(movie => {
        res.json(sucess(movie))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Não foi possível localizar o filme"))
    })
})

router.post("/", (req, res) => {
    const {name, year} = req.body

    //TODO validar os campos
console.log(req.body)
    MoviesDAO.insert(name, year).then(movie => {
        res.json(sucess(movie))


    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar o novo filme"))
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {name, year} = req.body

    //TODO validar os campos
    let obj = {}
    if (name) obj.name = name
    if (year) obj.year = year

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    MoviesDAO.update(id, obj).then(movie => {
        if (movie)
            res.json(sucess(movie))
        else
            res.status(500).json(fail("Filme não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar o filme"))
    })
})

router.delete("/:id", (req, res) => {
    MoviesDAO.delete(req.params.id).then(movie => {
        if (movie)
            res.json(sucess(movie))
        else
            res.status(500).json(fail("Filme não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir o filme"))
    })
})

module.exports = router;