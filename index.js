const config=require("./config").default;
const useAxios=require("./axios_hooks").default;
const commont =require("./commont").default;

 
export {useAxios};
export {config};
export {commont};


module.export={useAxios:useAxios,config:config,commont:commont};