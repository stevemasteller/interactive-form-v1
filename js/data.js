
// Initialize activities array
//		shows all conflicts
//		and cost of each activity
const MAIN_CONFERENCE 		= '0';
const FRAMEWORKS_WORKSHOP	= '1';
const LIBRARIES_WORKSHOP	= '2';
const EXPRESS_WORKSHOP		= '3';
const NODE_JS_WORKSHOP		= '4';
const BUILD_TOOLS_WORKSHOP	= '5';
const NPM_WORKSHOP 			= '6';


var activitiesArray = [
{
	activity: MAIN_CONFERENCE,
	conflicts: [],
	cost: 200,
},
{
	activity: FRAMEWORKS_WORKSHOP,
	conflicts: [EXPRESS_WORKSHOP],
	cost: 100,
},
{
	activity: LIBRARIES_WORKSHOP,
	conflicts: [NODE_JS_WORKSHOP],
	cost: 100,
},
{
	activity: EXPRESS_WORKSHOP,
	conflicts: [FRAMEWORKS_WORKSHOP],
	cost: 100,
},
{
	activity: NODE_JS_WORKSHOP,
	conflicts: [LIBRARIES_WORKSHOP],
	cost: 100,
},
{
	activity: BUILD_TOOLS_WORKSHOP,
	conflicts: [],
	cost: 100,
},
{
	activity: NPM_WORKSHOP,
	conflicts: [],
	cost: 100,
},
]