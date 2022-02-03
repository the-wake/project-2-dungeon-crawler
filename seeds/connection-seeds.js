const { Connection } = require('../models');

const connectionData = [
    {
        origin_id: 1,
        destination_name: 'F2: Big Room',
        destination_id: 1,
    },
    {
        origin_id: 2,
        destination_name: 'H1: Cavern',
        destination_id: 3,
    },
    {
        origin_id: 2,
        destination_name: 'P1: Galley',
        destination_id: 5,
    },
    {
        origin_id: 2,
        destination_name: 'B1: Chasm',
        destination_id: 7,
    },
    {
        origin_id: 2,
        destination_name: 'W1: Elevator',
        destination_id: 9,
    },
    {
        origin_id: 3,
        destination_name: 'H2: Cold Room',
        destination_id: 4,
    },
    {
        origin_id: 3,
        destination_name: 'F2: Big Room',
        destination_id: 2,
    },
    {
        origin_id: 5,
        destination_name: 'F2: Big Room',
        destination_id: 2,
    },
    {
        origin_id: 5,
        destination_name: 'P2: Wet Room',
        destination_id: 6,
    },
    {
        origin_id: 7,
        destination_name: 'F2: Big Room',
        destination_id: 2,
    },
    {
        origin_id: 7,
        destination_name: 'B2: Stony Room',
        destination_id: 8,
    },
    {
        origin_id: 9,
        destination_name: 'F2: Big Room',
        destination_id: 2,
    },
    {
        origin_id: 9,
        destination_name: 'W2: Hot Room',
        destination_id: 10,
    },
];


const seedConnections = () => Connection.bulkCreate(connectionData);

module.exports = seedConnections;
