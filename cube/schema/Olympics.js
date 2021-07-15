cube(`Olympics`, {
  sql: `SELECT * FROM cube_demo.olympics`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

  },

  segments: {
    wonMedal: {
      sql: `${medal} IS NOT NULL`
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [city, id, name]
    },

    avgHeight: {
      sql: `${height}`,
      type: `avg`,
    },

    avgAge: {
      sql: `${age}`,
      type: `avg`
    },

    bronzeCount: {
      sql: `${medal}`,
      type: `count`,
      filters: [
        { sql: `${medal} = 'Bronze'` }
      ]
    },

    silverCount: {
      sql: `${medal}`,
      type: `count`,
      filters: [
        { sql: `${medal} = 'Silver'` }
      ]
    },

    goldCount: {
      sql: `${medal}`,
      type: `count`,
      filters: [
        { sql: `${medal} = 'Gold'` }
      ]
    }
  },

  dimensions: {
    city: {
      sql: `${CUBE}.\`City\``,
      type: `string`
    },

    event: {
      sql: `${CUBE}.\`Event\``,
      type: `string`
    },

    games: {
      sql: `${CUBE}.\`Games\``,
      type: `string`
    },

    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    medal: {
      sql: `${CUBE}.\`Medal\``,
      type: `string`
    },

    name: {
      sql: `${CUBE}.\`Name\``,
      type: `string`
    },

    noc: {
      sql: `${CUBE}.\`NOC\``,
      type: `string`
    },

    season: {
      sql: `${CUBE}.\`Season\``,
      type: `string`
    },

    sex: {
      sql: `${CUBE}.\`Sex\``,
      type: `string`
    },

    sport: {
      sql: `${CUBE}.\`Sport\``,
      type: `string`
    },

    team: {
      sql: `${CUBE}.\`Team\``,
      type: `string`
    },

    age: {
      sql: `${CUBE}.\`Age\``,
      type: `number`
    },

    height: {
      sql: `${CUBE}.\`Height\``,
      type: `number`
    },

    weight: {
      sql: `${CUBE}.\`Weight\``,
      type: `number`
    },

    year: {
      sql: `${CUBE}.\`Year\``,
      type: `number`
    },
  },

  dataSource: `default`
});
