import Sequelize from 'sequelize'
import db from '../config/db'

const Option = db.define('option',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    question_id:{
        type: Sequelize.INTEGER
    },
    text_id:{
        type: Sequelize.INTEGER
    },
    correct:{
        type: Sequelize.BOOLEAN
    },
    text:{
        type: Sequelize.STRING
    }
})

export default Option