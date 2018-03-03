export default {
    name: 'Cars',
    description: 'All cars',
    subcategories: [
        {
            name: 'Trucks',
            description: 'All trucks',
            subcategories: [
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
            subcategories: [
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
            subcategories: [
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