const express = require('express')
const app = express()
const port = 3000 

app.use(express.json())


const exercises = []

app.get('/api/exercises', (req, res) =>{
    res.json(exercises)
})

app.post('/api/exercises', (req, res) =>{

    const {name, muscle} = req.body
    
    const cleanName = typeof name === 'string' ? name.trim() : name;
    const cleanMuscle = typeof muscle === 'string' ? muscle.trim() : muscle;

    if (!name || !muscle) {

        res.status(400).json({
            error:'Debe completar todos los campos.'
        })
        
        return
    } else if (name == " " || muscle == " ") {
        res.status(400).json({
            error:'No puede guardar ejercicios con espacios en blanco'
        })
        
        return
    }

    const nuevoEjercicio = {
         id: exercises.length + 1,
         name: cleanName,
         muscle: cleanMuscle 
    }

    exercises.push(nuevoEjercicio)

    res.status(201).json({
        id: nuevoEjercicio.id,
        name: req.body.name,
        muscle: req.body.muscle
    })
})

app.get('/api/exercises/:id', (req, res) => {
    const requiredId = req.params.id
    const cleanId = parseInt(requiredId)

    const foundedExercise = exercises.find(e => e.id == cleanId)

    if (!foundedExercise) {
        res.status(401).json({
        error:`El id ${cleanId} no coincide con ningún ejercicio.`
    })        
    }

    res.json(foundedExercise)

})

app.get( '/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})
