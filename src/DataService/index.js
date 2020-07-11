import data from  './csvjson.json';

function getList() {
    return data;
}

function getCount() {
    return data.length;
}

function matchCriteria(battle, criteria) {
    const defaultValidator = field =>
        (value) =>
            battle[field].toLowerCase().includes(value.toLowerCase())

    const criteriaFunctions = {
        king: (value) => defaultValidator('attacker_king')(value) || defaultValidator('defender_king')(value),
        location: defaultValidator('location'),
        region: defaultValidator('region'),
        type: defaultValidator('type'),
        attacker: (value) => 
            defaultValidator('attacker_1')(value) || 
            defaultValidator('attacker_2')(value) || 
            defaultValidator('attacker_3')(value) || 
            defaultValidator('attacker_4')(value),
        defender: (value) => 
            defaultValidator('defender_1')(value) || 
            defaultValidator('defender_2')(value) || 
            defaultValidator('defender_3')(value) || 
            defaultValidator('defender_4')(value),
    }

    for(const [key, value] of Object.entries(criteria)) {
        const validator = criteriaFunctions[key];
        if(validator && !criteriaFunctions[key](value)) {
            return false;
        }
    }
    return true;
}

function search(criteria) {
    const results =  data.filter(battle => matchCriteria(battle, criteria))
    return results;
}

export {
    getList,
    getCount,
    search,
}