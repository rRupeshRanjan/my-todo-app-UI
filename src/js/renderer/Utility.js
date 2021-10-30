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

    GetCurrentDate(format) {
        return moment().format(format).toString();
    }

    ConvertDateFormat(date, format) {
        return moment(date).format(format).toString();
    }

    ConvertStringToDate(date) {
        return moment(date);
    }
}

const utility = new Utils();
export default utility;