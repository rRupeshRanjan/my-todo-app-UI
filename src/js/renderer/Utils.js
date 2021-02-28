import moment from 'moment'

class Utils {
    DateRenderer(data) {
        return moment(data.value).format('MM/DD/YYYY HH:mm');
    }

    EpochToFormattedDateString(date, format) {
        return moment(date).format(format).toString();
    }

    ConvertDateToEpoch(date) {
        return moment(date).valueOf();
    }
}

const utils = new Utils();
export default utils;