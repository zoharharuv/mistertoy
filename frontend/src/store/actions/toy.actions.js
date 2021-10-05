import { toyService } from "../../services/toy.service.js";
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js';
import { socketService } from './../../services/socket.service';


export function loadToys() {
    return async (dispatch) => {
        try {
            const toys = await toyService.query()
            dispatch({
                type: 'SET_TOYS',
                toys
            })
        } catch (err) {
            showErrorMsg('Cannot load toys')
            console.log('Cannot load toys', err)
        }
    }
}

export function filterToys(filter) {
    return async (dispatch) => {
        try {
            const toys = await toyService.query(filter)
            dispatch({
                type: 'SET_TOYS',
                toys
            })
        } catch (err) {
            showErrorMsg('Cannot load toys')
            console.log('Cannot load toys', err)
        }
    }
}

export function onRemoveToy(toyId) {
    return async (dispatch) => {
        try {
            await toyService.remove(toyId)
            dispatch({
                type: 'REMOVE_TOY',
                toyId
            })
            showSuccessMsg('Toy removed')
            socketService.emit('admin action', 'Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
            console.log('Cannot remove toy', err)
        }
    }
}

export function onAddToy(toy) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.save(toy)
            dispatch({
                type: 'ADD_TOY',
                toy: savedToy
            })
            showSuccessMsg('Toy added')
            socketService.emit('admin action', 'New toy added')
        } catch (err) {
            showErrorMsg('Cannot add toy')
            console.log('Cannot add toy', err)
        }
    }
}

export function onEditToy(toyToSave) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.update(toyToSave)
            dispatch({
                type: 'UPDATE_TOY',
                toy: savedToy
            })
            showSuccessMsg('Toy updated')
            socketService.emit('admin action', 'Toy edited')
        } catch (err) {
            showErrorMsg('Cannot update toy')
            console.log('Cannot update toy', err)
        }
    }
}

export function addToCart(toy) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            toy
        })
    }
}

// CHAT
export function sendMsg(data) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_MSG',
            data
        })
    }
}
