import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'create-node-project',
  description:'Create a node project with typescript, typeorm, tsyringe, jest, and an architecture based on DDD and SOLID',
  run: async toolbox => {
    const { 
        system, 
        print, 
        template,
        parameters
    } = toolbox

    const name = parameters.first

    if(!name){
        print.error('You need to specify a name')
        return
    }

    await template.generate({
        template: 'package.json.ejs',
        target: 'package.json',
        props: { name }
    })

    print.info('installing dependencies...')

    await system.exec('yarn add express reflect-metadata tsyringe pg typeorm')
    await system.exec('yarn add @types/express -D')
    await system.exec('yarn add typescript ts-node-dev tsconfig-paths -D')
    await system.exec('yarn add jest ts-jest -D')
    await system.exec('yarn add @types/jest -D')
    
    print.success('dependencies installed')

    await template.generate({
        template: 'tsconfig.json.ejs',
        target: 'tsconfig.json'
    })

    await template.generate({
        template: 'ormconfig.json.ejs',
        target: 'ormconfig.json',
        props: { name }
    })
    
    await template.generate({
        template: 'jest.config.js.ejs',
        target: 'jest.config.js'
    })

    await template.generate({
        template: '.gitngnore.ejs',
        target: '.gitignore'
    })
    

    print.success('generated config files')


    await template.generate({
        template: 'appError.ts.ejs',
        target: 'src/shared/errors/AppError.ts'
    })

    await template.generate({
        template: 'errorHandler.ts.ejs',
        target: 'src/shared/errors/errorHandler.ts'
    })

    await template.generate({
        template: 'typeormIndex.ts.ejs',
        target: 'src/shared/infra/typeorm/index.ts'
    })

    await template.generate({
        template: 'routesIndex.ts.ejs',
        target: 'src/shared/infra/routes/index.ts'
    })

    await template.generate({
        template: 'server.ts.ejs',
        target: 'src/shared/infra/server.ts'
    })

    print.success('generated src/shared folder')

  }
}

module.exports = command