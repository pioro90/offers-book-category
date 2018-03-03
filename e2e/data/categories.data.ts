export default [
    {
        name: 'Phones',
        description: 'New phones'
    },
    {
        name: 'Cars',
        description: 'All cars',
        child: [
            {
                name: 'Trucks',
                description: 'All trucks',
                child: [
                    {
                        name: 'Man',
                        description: 'All man'
                    }, {
                        name: 'Volvo',
                        description: 'All Volvo'
                    }, {
                        name: 'Scania',
                        description: 'All Scania'
                    }
                ]
            },
            {
                name: 'Personal',
                description: 'All personals',
                child: [
                    {
                        name: 'Audi',
                        description: 'All audi'
                    }, {
                        name: 'BMW',
                        description: 'All BMW'
                    }
                ]
            },
            {
                name: 'Motors',
                description: 'All motors',
                child: [
                    {
                        name: 'Suzuki',
                        description: 'All suzuki'
                    }, {
                        name: 'BMW',
                        description: 'All BMW'
                    }, {
                        name: 'Ducati',
                        description: 'All Ducati'
                    }
                ]
            }
        ]
    }
];