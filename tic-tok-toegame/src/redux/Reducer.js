
const initialState = {
    player1 : "player1",
    player2 : "player2",
    player1Wins : 0,
    player2Wins : 0,

}

export default function Reducer(state=initialState,action) {
    if(action.type == "p1"){
        return Object.assign({},state,{player1:action.payload.name,player1Wins:action.payload.wins })
    }else if(action.type == "p2"){
        return Object.assign({},state,{player2:action.payload.name,player2Wins:action.payload.wins })
    }else if(action.type == "win"){
        return Object.assign({},state,{winner:action.payload.winner,winnerSymbol:action.payload.winnerSymbol,winnerP:action.payload.winnerPlayer })
    }
    return state;
}