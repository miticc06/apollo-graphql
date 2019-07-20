export const {
    APP_PORT = 4000,
    NODE_DEV = 'development',
    MONGO_USER = "miticc06",
    MONGO_PASSWORD = "minhtien123",
    MONGO_DB = "apollo_graphql",
    SECRECT_KEY = "somesupersecrectkey"
} = process.env

export const IN_PROD = NODE_DEV === 'production'