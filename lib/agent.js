'use strict'

module.exports = function setupAgent (AgentModel) {
  function byId (id) {
    return AgentModel.byId(id)
  }

  async function createOrUpdate (agent) {
    const cond = {
      where: {
        uuid: agent.uuid
      }
    }

    const existingAgent = await AgentModel.findOne(cond)
    if (existingAgent) {
      const updated = await AgentModel.update(agent, cond)
      return updated ? AgentModel.findOne(cond) : existingAgent
    }
    const result = await AgentModel.create(agent)
    return result.toJSON()
  }

  function byUuId (uuid) {
    return AgentModel.findOne({
      where: {
        uuid: uuid
      }
    })
  }

  function findAll () {
    return AgentModel.findAll()
  }

  function findConnected () {
    return AgentModel.findAll({
      where: {
        connected: true
      }
    })
  }

  function findByUsername (username) {
    return AgentModel.findAll({
      where: {
        username,
        connected: true
      }
    })
  }

  return {
    byId,
    createOrUpdate,
    byUuId,
    findAll,
    findConnected,
    findByUsername
  }
}
