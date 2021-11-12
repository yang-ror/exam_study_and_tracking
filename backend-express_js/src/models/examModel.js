import Sequelize from 'sequelize'
import db from '../config/db'

const Exam = db.define('exam',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    type:{
        type: Sequelize.STRING
    },
    exam_name:{
        type: Sequelize.STRING
    }
})

export default Exam