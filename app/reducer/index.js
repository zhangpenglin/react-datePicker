import {combineReducers} from 'redux'
import * as Immutable from 'immutable'
const initialState = Immutable.fromJS({
    head: [
        {title: '姓名', sort: false},
        {title: '语文', sort: true},
        {title: '数学', sort: true},
        {title: '英语', sort: true},
        {title: '总分', sort: true}],
    body: [
        ['小明', 80, 90, 70, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小红', 90, 60, 90, 240],
        ['小亮', 60, 100, 70, 230]
    ]
})
function sort(state = initialState, action) {
    let i
    switch (action.type) {
        case 'ASC_SORT':
            i=action.index
            return state.set('body',state.get('body').sort((a, b)=> {
                return a.get(i)-b.get(i)
            }))

            break;
        case 'DESC_SORT':
            i=action.index
            return state.set('body',state.get('body').sort((a, b)=> {
                return b.get(i)-a.get(i)
            }))
            break;
        default:
            return state
    }
}
export default combineReducers({sort})