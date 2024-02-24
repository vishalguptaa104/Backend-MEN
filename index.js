const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const port = 3000
const app = express()

//middleware
app.use(express.urlencoded({extended : false}))

// getting all users present
app.get('/api/users', (req, res) => {
    // console.log("hi");
    return res.json(users)
})

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id)
        // console.log(typeof(id));
        const user = users.find((user) => {
            return user.id === id
        })
        // console.log(user)
        return res.json(user)
    })
    .patch((req, res) => {
        const id = Number(req.params.id)
        const body = req.body
        const user = users.find( (user)=>{
            return user.id === id
        })
    
        const updatedUser = {...user,...body}
        updatedUser.id = id
        // console.log(updatedUser);
        // users.push(updatedUser)
        users[id-1] = updatedUser
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
            return res.json({status: "success"})
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        // const user = users.find( (user)=>{
        //     return user.id === id
        // } )
           // console.log(user);
        // const modified = users.filter( (members)=>{
        //     return members.id !== id
        // } )
        // console.log(modifiedUsers[0]);
        // return res.json({ status: "pending" })

        const userInd = users.findIndex( (user)=>{
            return user.id === id
        } )
        const deletedUser = users.splice(userInd,1)[0]
        // console.log(deletedUser);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data)=>{
            return res.json({status:"success", deletedUser})
        })
        // res.json({status:"success"})
    })

// Creating new user through post
app.post('/api/users', (req, res) => {
    const body = req.body;
    // console.log(body);
    users.push({...body, id : users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
        return res.json( {status:"success", id:users.length} )
    })

})

app.listen(port, () => { console.log("server running"); })