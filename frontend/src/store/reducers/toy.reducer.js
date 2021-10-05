const initialState = {
    toys: [],
    cart: [],
    lastRemovedToy: null,
    chatMap: {}
}
export function toyReducer(state = initialState, action) {
    var newState = state
    var toys
    var cart
    var chatMap
    switch (action.type) {
        case 'SET_TOYS':
            newState = { ...state, toys: action.toys }
            break
        case 'REMOVE_TOY':
            const lastRemovedToy = state.toys.find(toy => toy._id === action.toyId)
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            newState = { ...state, toys, lastRemovedToy }
            break
        case 'ADD_TOY':
            newState = { ...state, toys: [...state.toys, action.toy] }
            break
        case 'UPDATE_TOY':
            toys = state.toys.map(toy => (toy._id === action.toy._id) ? action.toy : toy)
            newState = { ...state, toys }
            break
        case 'ADD_TO_CART':
            newState = { ...state, cart: [...state.cart, action.toy] }
            break
        case 'REMOVE_FROM_CART':
            const cartStart = state.cart.slice(0, action.idx)
            const cartEnd = state.cart.slice(action.idx + 1, state.cart.length)
            cart = [...cartStart, ...cartEnd]
            newState = { ...state, cart }
            break
        case 'CLEAR_CART':
            newState = { ...state, cart: [] }
            break
        case 'UNDO_REMOVE_TOY':
            if (state.lastRemovedToy) {
                newState = { ...state, toys: [...state.toys, state.lastRemovedToy], lastRemovedToy: null }
            }
            break
        case 'ADD_MSG':
            const { id, msg } = action.data
            chatMap = { ...state.chatMap }
            chatMap[id] = chatMap[id] || {}
            chatMap[id].msgs = chatMap[id]?.msgs || []
            chatMap[id].msgs = [...chatMap[id].msgs, msg]
            newState = { ...state, chatMap }
            break
        default:
    }
    // For debug:
    window.toyState = newState
    return newState
}
