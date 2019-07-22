export const {
    APP_PORT = 4000,
    NODE_DEV = 'development',
    MONGO_USER = "miticc06",
    MONGO_PASSWORD = "minhtien123",
    MONGO_DB = "apollo_graphql",
    SECRECT_KEY = "somesupersecrectkey",

    SESS_NAME = 'sid',
    SESS_SECRECT = 'ssh!secrect!',
    SESS_LIFETIME = 1000 * 60 * 60 * 2,
    REDIS_HOST = 'redis-14268.c99.us-east-1-4.ec2.cloud.redislabs.com',
    REDIS_PORT = 14268,
    REDIS_PASS = '2T9hQo2ueQo1.'
} = process.env

export const IN_PROD = NODE_DEV === 'production'