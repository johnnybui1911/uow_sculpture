import {
  SIGN_IN_SUCCESSFULL,
  SIGN_IN_REJECTED,
  LIKE,
  UNLIKE,
  FETCH_USER_DATA_SUCCESSFULL,
  ADD_COMMENT
} from '../../assets/actionTypes'

const initialState = {
  loggedIn: false,
  user: {},
  likeList: [],
  visitList: [],
  commentList: [
    {
      sculptureId: 1987.08,
      text:
        'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
      submitDate: new Date(2019, 5, 29, 10, 33, 30)
    },
    {
      sculptureId: 1987.081,
      text:
        'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
      submitDate: new Date()
    }
  ]
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSFULL: {
      const { user } = action.payload
      return { ...state, loggedIn: true, user: { ...user } }
    }
    case SIGN_IN_REJECTED: {
      return { ...state, loggedIn: false }
    }

    case FETCH_USER_DATA_SUCCESSFULL: {
      const { likeList, commentList, visitList } = action.payload
      return {
        ...state,
        likeList: [...likeList],
        commentList: [...commentList],
        visitList: [...visitList]
      }
    }

    case ADD_COMMENT: {
      const { comment } = action.payload
      const addComment = {
        sculptureId: comment.sculptureId,
        text: comment.content,
        submitDate: comment.updatedTime
      }
      return { ...state, commentList: [...state.commentList, addComment] }
    }

    case LIKE: {
      const { id } = action
      const {
        likeList,
        user: { userId }
      } = state
      if (!likeList.filter(item => item.id === id)) {
        likeList.push({ sculptureId: id, userId })
      }
      return { ...state, likeList: [...likeList] }
    }

    // case UNLIKE: {
    //   const { id } = action
    //   let { likeList } = state
    //   // likeList = likeList.filter(element => {
    //   //   return element.sculptureId != id
    //   // })
    //   return { ...state, likeList }
    // }

    default:
      return state
  }
}

export default authReducer
