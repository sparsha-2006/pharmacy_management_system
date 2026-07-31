const EventEmitter = require('events');
class PharmacyEventEmitter extends EventEmitter {}
const pharmacyEvents = new PharmacyEventEmitter();
module.exports = pharmacyEvents;