import { config as ernConfig, log } from 'ern-core'
import { epilog, tryCatchWrap } from '../../../lib'
import { Argv } from 'yargs'

export const command = 'list'
export const desc = 'List all Cauldron repositories'

export const builder = (argv: Argv) => {
  return argv.epilog(epilog(exports))
}

export const commandHandler = async () => {
  const cauldronRepositories = ernConfig.getValue('cauldronRepositories')
  if (!cauldronRepositories) {
    throw new Error('No Cauldron repositories have been added yet')
  }
  log.info('[Cauldron Repositories]')
  Object.keys(cauldronRepositories).forEach(alias =>
    log.info(`${alias} -> ${cauldronRepositories[alias]}`)
  )
}

export const handler = tryCatchWrap(commandHandler)
