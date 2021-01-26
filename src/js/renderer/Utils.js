import moment from 'moment'

export default function DateRenderer(data) {
    return moment(data.value).format('MM/DD/YYYY HH:mm');
}