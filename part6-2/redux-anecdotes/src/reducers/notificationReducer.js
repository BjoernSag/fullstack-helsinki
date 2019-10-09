const initialState = ''

const getId = () => (100000 * Math.random()).toFixed(0)


const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'NEW_NOTIFICATION':
            return action.data.content
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const setNotification = (content) => {
    return {
        type:'NEW_NOTIFICATION',
        data: {
            content,
            id: getId()
        }
    }
}

export const removeNotification = (removeId) => {
    return {
        type:'REMOVE_NOTIFICATION',
        data: {
            id: removeId
        }
    }
}



export default reducer