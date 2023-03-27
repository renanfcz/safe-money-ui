export interface User {
    login: {
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt: Date,
        salary: number,
        expenses: [{
            id: string,
            title: string,
            description: string,
            createdAt: Date,
            value: number,
            category: {
                id: string,
                title: string,
                description: string,
                createdAt: Date,
            }
        }]
    }
}