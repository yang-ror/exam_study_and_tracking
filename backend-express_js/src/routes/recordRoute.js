import { getRecord, getRecords } from '../controllers/recordController'

const routes = app => {
    app.route('/records')
        .get(getRecords)
    app.route('/record/:examId')
        .get(getRecord)
}

export default routes