import {MODEL_CONFIG} from'./mutation-type'

export default{
[MODEL_CONFIG](state,value){
    state.current.accent = value
console.log('state',state)
},

dsSwitch(state){
    state.current.ds = !state.current.ds
}
}