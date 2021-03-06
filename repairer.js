var repairer = {
    run: function(creep) {

        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	    }
	    if(creep.memory.repairing) {
            /*
            var str = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART && structure.hits < 7000000) ||
                            (structure.structureType == STRUCTURE_WALL && structure.hits < 7000000 );
                }
            });
            */
            var str = Game.getObjectById('5edf1bd42931bc5d4dede93d');
            /*
            if(Game.time % 200 == 0)
                str.sort((a,b) => a.hits - b.hits);
            */
            //creep.say(str);
            if(str) {
                if(creep.repair(str) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(str);
                }
            }
        }
        else {
            var ss = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE &&
                            structure.store.energy > 0;
                }
            });
            if(creep.withdraw(ss, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(ss);
            }
        }
	}
};

module.exports = repairer;