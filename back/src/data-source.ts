import "dotenv/config"
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import path from "path"

const config = (): DataSourceOptions => {
  const pathEntities: string = path.join(__dirname, './entities/**.{ts,js}')
  const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}')
  const nodeEnv: string | undefined = process.env.NODE_ENV;
 
  if(nodeEnv === 'test'){
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
        entities: [pathEntities]
      }
  }
  
  const dbUrl: string | undefined = process.env.DATABASE_URL

  if (!dbUrl) throw new Error('Erro ao conectar ao db.')
  
  return {
    type: 'postgres',
    url: dbUrl,
    synchronize: false,
    logging: false,
    migrations: [migrationsPath],
    entities: [pathEntities],
  }
}

const dataBaseSourse = new DataSource(config())

export default dataBaseSourse
