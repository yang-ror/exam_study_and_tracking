import Sequelize from 'sequelize'
import db from '../config/db'

const Record = db.define('record', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    exam_id:{
        type: Sequelize.INTEGER
    },
    score:{
        type: Sequelize.INTEGER
    },
    out_of:{
        type: Sequelize.INTEGER
    },
    time_used:{
        type: Sequelize.INTEGER
    },
    date:{
        type: Sequelize.DATE
    }
})

export default Record