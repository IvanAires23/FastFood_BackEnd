/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-nested-ternary */
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

export function loadEnv() {
    const path =
        process.env.NODE_ENV === 'test'
            ? '.env.test'
            : process.env.NODE_ENV === 'development'
            ? '.env.development'
            : '.env'

    const currentEnvs = dotenv.config({ path })
    dotenvExpand.expand(currentEnvs)
}
