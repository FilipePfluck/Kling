import { GluegunCommand } from 'gluegun'

import {plural} from 'pluralize'

const command: GluegunCommand = {
  name: 'create-node-module',
  description:'Create a node DDD module with simple CRUD',
  run: async toolbox => {
    const { 
        system,
        print, 
        template,
        parameters
    } = toolbox

    const name = parameters.first

    const pluralName = plural(name)

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    const moduleDir = `src/modules/${pluralName}`

    if(!name){
        print.error('You need to specify a name')
        return
    }  

    print.info('creating migration file...')

    await system.exec(`yarn typeorm migration:create -n "create${pluralName}"`)

    print.info('generating typeorm and interfaces...')

    await template.generate({
        template: 'entity.ts.ejs',
        target: moduleDir + `/infra/typeorm/entities/${name}.ts`,
        props: { name, pluralName, capitalizedName }
    })

    await template.generate({
        template: 'ICreateDTO.ts.ejs',
        target: moduleDir + `/interfaces/ICreate${capitalizedName}Dto.ts`,
        props: { capitalizedName }
    })

    await template.generate({
        template: 'IRepository.ts.ejs',
        target: moduleDir + `/interfaces/I${capitalizedName}Repository.ts`,
        props: { capitalizedName, name }
    })

    await template.generate({
        template: 'typeormRepository.ts.ejs',
        target: moduleDir + `/infra/typeorm/repositories/${capitalizedName}Repository.ts`,
        props: { name, pluralName, capitalizedName }
    })

    print.info('generating services...')

    await template.generate({
        template: 'createService.ts.ejs',
        target: moduleDir + `/services/Create${capitalizedName}.ts`,
        props: { name, pluralName, capitalizedName }
    })

    await template.generate({
        template: 'listService.ts.ejs',
        target: moduleDir + `/services/List${capitalizedName}.ts`,
        props: { name, pluralName, capitalizedName }
    })

    await template.generate({
        template: 'showService.ts.ejs',
        target: moduleDir + `/services/Show${capitalizedName}.ts`,
        props: { name, pluralName, capitalizedName }
    })

    await template.generate({
        template: 'updateService.ts.ejs',
        target: moduleDir + `/services/Update${capitalizedName}.ts`,
        props: { name, pluralName, capitalizedName }
    })

    await template.generate({
        template: 'deleteService.ts.ejs',
        target: moduleDir + `/services/Delete${capitalizedName}.ts`,
        props: { name, pluralName, capitalizedName }
    })

    print.info('generating tests...')

    await template.generate({
        template: 'fakeRepository.ts.ejs',
        target: moduleDir + `/tests/FakeRepositories/Fake${capitalizedName}Repository.ts`,
        props: { name, pluralName, capitalizedName }
    })

    await template.generate({
        template: 'CreateTest.ts.ejs',
        target: moduleDir + `/tests/Create${capitalizedName}.spec.ts`,
        props: { name, pluralName, capitalizedName }
    })

    await template.generate({
        template: 'UpdateTest.ts.ejs',
        target: moduleDir + `/tests/Update${capitalizedName}.spec.ts`,
        props: { name, pluralName, capitalizedName }
    })
    

    print.info('generating http folder...')

    await template.generate({
        template: 'controller.ts.ejs',
        target: moduleDir + `/infra/http/controllers/${capitalizedName}Controller.ts`,
        props: { name, pluralName, capitalizedName }
    })

    await template.generate({
        template: 'routes.ts.ejs',
        target: moduleDir + `/infra/http/routes/${capitalizedName}.routes.ts`,
        props: { name, pluralName, capitalizedName }
    })

    print.success('All files have been generated')
  }
}

module.exports = command