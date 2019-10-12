import {
  SIGN_IN_SUCCESSFULL,
  SIGN_IN_REJECTED,
  LIKE,
  UNLIKE,
  FETCH_USER_DATA_SUCCESSFULL,
  ADD_COMMENT,
  VISIT,
  FETCH_USER_DATA_REJECTED,
  DELETE_COMMENT,
  EDIT_COMMENT
} from '../../assets/actionTypes'

const initialState = {
  loggedIn: false,
  user: {},
  likeList: [],
  visitList: [],
  commentList: []
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSFULL: {
      const { user } = action.payload
      return { ...state, loggedIn: true, user: { ...user } }
    }
    case SIGN_IN_REJECTED: {
      return initialState
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

    case FETCH_USER_DATA_REJECTED: {
      return { ...state }
    }

    case ADD_COMMENT: {
      const { comment } = action.payload
      const {
        commentId,
        content,
        user: { userId, picture },
        sculpture: { accessionId, images, name },
        updatedTime
      } = comment

      const imageList = images.sort((a, b) => {
        return new Date(a.created).getTime() - new Date(b.created).getTime()
      })

      const addComment = {
        commentId,
        text: content,
        userId,
        userImg: picture,
        sculptureId: accessionId,
        sculptureName: name,
        photoURL: images.length ? imageList[0].url : null,
        submitDate: updatedTime
      }

      return { ...state, commentList: [addComment, ...state.commentList] }
    }

    case DELETE_COMMENT: {
      const { commentId } = action.payload
      const { commentList } = state
      return {
        ...state,
        commentList: commentList.filter(
          element => element.commentId !== commentId
        )
      }
    }

    case EDIT_COMMENT: {
      const { comment } = action.payload
      const { commentId, content } = comment
      const { commentList } = state

      // const editedComment = commentList.find(
      //   element => element.commentId === commentId
      // )
      // editedComment.text = content
      // console.log(commentList)

      const newList = commentList.map(element => {
        if (element.commentId === commentId) {
          return {
            ...element,
            text: content
          }
        }
        return element
      })

      return { ...state, commentList: newList }
    }

    case LIKE: {
      const { id } = action
      let {
        likeList,
        user: { userId }
      } = state
      if (!likeList.filter(item => item.sculptureId === id).length) {
        likeList = [{ sculptureId: id, userId }, ...likeList]
      }
      return { ...state, likeList: [...likeList] }
    }

    case VISIT: {
      const { enteredMarkers } = action
      let {
        visitList,
        user: { userId }
      } = state
      enteredMarkers.forEach(element => {
        const { id } = element
        if (!visitList.filter(item => item.sculptureId === id).length) {
          visitList = [...visitList, { sculptureId: id, userId }]
        }
      })
      return { ...state, visitList: [...visitList] }
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
