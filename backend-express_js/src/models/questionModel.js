import Sequelize from 'sequelize'
import db from '../config/db'

const Question = db.define('question',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    exam_id:{
        type: Sequelize.INTEGER
    },
    text_id:{
        type: Sequelize.INTEGER
    },
    choose_more_than_one:{
        type: Sequelize.BOOLEAN
    },
    image_name:{
        type: Sequelize.STRING
    },
    text:{
        type: Sequelize.STRING
    }
})

export default Question