const Package = require('../models/package');

exports.create = async (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { name, email, contact, count, total, packageName } = req.body;

    // new package
    const package = new Package({
        name,
        email,
        contact,
        count,
        total,
        packageName
    })

    // save booking details in the database
    await package
        .save()
        .then(() => {
            res.status(201).send({message : "Package Booked Successfully"})
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while booking the package"
            });
        });
}

exports.findAll = async (req,res) => {
    let package

    try {
        package = await Package.find()
        res.send(package)
    } catch (err) {
        res.status(500).send({ message : err.message || "Error Occurred while retrieving booking details" })
    }
}

exports.update = async (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    await Package.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update booking details with id = ${id}. Maybe booking details not found!`})
            }else{
                res.status(201).send({message : "Booking details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating booking details"})
        })
}

exports.delete = async (req,res) => {
    const id = req.params.id;

    await Package.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete booking with id = ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Booking deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting booking with id = ${id}`});
        })
}