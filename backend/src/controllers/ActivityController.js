const fs = require('fs')
const Activity = require('../models/Activity');
const Internship = require('../models/Internship');
const filehelper = require('../config/file-helper')

module.exports = {

    async checkActivityDate(actvDate) {

        // já vem isado!
        await Activity.find({ date: actvDate }, (err, doc) => {
            if (!err) {
                if (!doc) {
                    //não existe então retorna true
                    return true
                } else {
                    return false
                }
            } else {
                console.log(err);
                return res.status(400).send({ status: 400, message: "Erro ao consultar o banco de dados!" });
            }
        })

    },
    async index(req, res) {
        const activity = await Activity.find().sort('-createdAt');
        if (activity.length) {
            return res.status(200).send({ status: 200, activity });
        } else {
            return res.status(404).send({ status: 404, message: "Não há registros." });
        }
    },
    async store2(req, res) {
        // store é obrigatório o estágio
        console.log(req.body);

        if (req.file) {

            const { date2, description, inputTime, outputTime, id_internship } = req.body
            // valida data
            await Activity.find({ date: date2 }, (err, doc) => {
                if (!err) {
                    // se não existir
                    if (!doc.length > 0) {
                        console.log('tá vago');

                        filehelper.compressImage(req.file, 200)
                            .then(newPath => {

                                const full = newPath.split('\\');
                                const caminho = full[full.length - 1]

                                const obj = {
                                    date: date2,
                                    description,
                                    inputTime,
                                    outputTime,
                                    id_internship,
                                    image: caminho
                                }

                                const activity = new Activity(obj);

                                activity.save((err, activity) => {
                                    if (err) {
                                        console.log(err);
                                        console.log('deu algo de errado ao salvar');
                                        // console.log(activity.id);
                                        return res.status(400).json({ status: 400, message: "Erro ao salvar atividade!" });

                                    } else {
                                        Internship.findByIdAndUpdate(id_internship, { $push: { id_activities: activity.id } }, { new: true, useFindAndModify: false }, (err, internship) => {
                                            if (err == null) {
                                                return res.status(201).json({ status: 201, message: "Atividade Cadastrada!" });
                                            }
                                        });
                                    }
                                })

                            }).catch(err => {
                                console.log(err);
                                console.log("erro na compressão");
                                return res.status(400).json({ status: 400, message: "Ocorreu um erro, por favor tente novamente." });
                            });

                    } else {
                        fs.unlink(`./uploads/${req.file.filename}`, err => {

                            // Não quero que erros aqui parem todo o sistema, então só vou imprimir o erro, sem throw.
                            if (err) console.log(err)
                        });
                        console.log('não tá vago, retornando...');

                        return res.status(400).json({ status: 400, message: "Já existe uma atividade cadastrada para este dia." });
                    }
                }

            })
        } else {

            console.log('img not recebida');
            return res.status(400).send({ status: 400, message: "Imagem não recebida." });
        }

        // else {
        //     console.log(err);
        //     return res.status(400).send({ status: 400, message: "Erro ao consultar o banco de dados." });
        // }
    },

    // async store2(req, res) {
    //     console.log('entrou');

    //     if (req.file) {
    //         const { date2, description, inputTime, outputTime, id_internship } = req.body

    //         try {
    //             const vago = await Activity.find({ date: date2 })
    //             console.log(vago);

    //             if (vago.length) {
    //                 return res.status(400).send({ status: 400, message: "Já existe uma atividade cadastrada para este dia." });
    //             } else {
    //                 const arquivo = await filehelper.compressImage(req.file, 100);
    //                 const obj = {
    //                     date: date2,
    //                     description,
    //                     inputTime,
    //                     outputTime,
    //                     id_internship,
    //                     image: arquivo
    //                 }
    //                 const activity = new Activity(obj);

    //                 activity.save((err, activity) => {
    //                     if (err) {
    //                         console.log(err);
    //                         return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });

    //                     } else {
    //                         Internship.findByIdAndUpdate(id_internship, { $push: { id_activities: activity.id } }, { new: true, useFindAndModify: false }, (err, internship) => {
    //                             if (err || internship == null) {
    //                                 console.log(err);
    //                                 console.log(internship);
    //                                 return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });
    //                             } else {
    //                                 console.log('pode pá');

    //                                 return res.status(201).send({ status: 201, message: "Atividade Cadastrada!" });
    //                             }
    //                         });
    //                     }
    //                 });

    //             }

    //         } catch (e) {
    //             console.log('====================================');
    //             console.log(e);
    //             console.log('====================================');
    //         }
    //     }
    // },
    // async store2(req, res) {
    //     console.log('entrou');

    //     return res.status(201).send({ status: 201, message: "Erro ao salvar atividade!" });
    //     // DESCOBRIR PQ NO IMSOMINIA FUNCIONA E NO APP NÃO MAIS 
    //     console.log(req.body.date2);

    //     // return res.status(400).send({ status: 400, message: req.body.date});



    async storeWithNoImage(req, res) {
        // store é obrigatório o estágio
        // formato do date tem que converter para isostring
        console.log('acionou');
        console.log(req.body);
        let { date, description, inputTime, outputTime, id_internship } = req.body

        // return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });
        const obj = {
            date,
            description,
            inputTime,
            outputTime,
            id_internship,
            image: null
        }

        await Activity.find({ date }, (err, doc) => {
            if (!err) {
                if (!doc.length > 0) {
                    //não existe então retorna true
                    // return true
                    const activity = new Activity(obj);

                    // console.log(activity);

                    activity.save((err, activity) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });

                        } else {

                            Internship.findByIdAndUpdate(id_internship, { $push: { id_activities: activity.id } }, { new: true, useFindAndModify: false }, (err, internship) => {
                                if (err || internship == null) {
                                    console.log(err);
                                    console.log(internship);
                                    return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });
                                } else {
                                    return res.status(201).send({ status: 201, message: "Atividade Cadastrada!" });
                                }
                            });
                        }
                    })
                } else {
                    return res.status(400).send({ status: 400, message: "Já existe uma atividade cadastrada para este dia." });
                }
            } else {
                console.log(err);
                return res.status(400).send({ status: 400, message: "Erro ao consultar o banco de dados!" });
            }
        })
    },
    async remove(req, res) {
        const { id } = req.params;
        console.log(id);

        await Activity.findByIdAndDelete(id, (err, act) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                if (!act) { return res.status(404).send({ message: "Não foi encontrada esta atividade", status: 404 }) }
                // console.log('act');
                // console.log(act);
                if (act.image != null) {
                    // console.log('tem img');
                    fs.unlink(`./uploads/${act.image}`, err => {
                        if (err)
                            return res.status(500).send({ message: "Ocorreu um erro :(" });
                    })
                }
                // continuar daqui
                Internship.findByIdAndUpdate(act.id_internship, { $pull: { id_activities: act._id } }, { new: true, useFindAndModify: false }, (err, internship) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    } else {
                        console.log(internship);
                        return res.status(200).send({ status: 200, message: "Estágio apagado com sucesso!" })
                    }
                })
            }
        });
    },
    async update(req, res) {

        const { id } = req.params;
        // validar req.body
        // para parar de dar erro de deprecation põe o useFindAndModify junto do new!
        // é possivel colocar junto das configs do mongoose.connect,

        // no update não precisa atualizar o id da internship
        // e nem a activity id
        await Activity.findOneAndUpdate({ '_id': id }, req.body, { new: true, useFindAndModify: false }, (err, doc) => {
            if (doc) {
                // se new é true traz doc updateado
                // dá pra por na url e direcionar!
                return res.status(200).send({ status: 200, message: "Atualizado com sucesso." })

            } else {
                console.log(err);
                return res.status(400).send({ status: 400, message: "Erro no update." });
            }
        })
    }

};
