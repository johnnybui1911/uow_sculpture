import {
  SIGN_IN_SUCCESSFULL,
  SIGN_IN_REJECTED,
  LIKE,
  UNLIKE
} from '../../assets/actionTypes'

const initialState = {
  loggedIn: false,
  user: {
    userId: 'hnb133',
    username: 'Cristiano Ronaldo',
    email: 'cristiano@gmail.com',
    joinDate: new Date('October 13, 2014'),
    likes: 3,
    comments: 3,
    visited: 3
  },
  likeList: [
    { sculptureId: 1986.058 },
    { sculptureId: 1987.08 },
    { sculptureId: 1987.081 }
  ],
  commentList: [
    {
      sculptureId: 1986.058,
      text: 'Hello',
      submitDate: new Date(2019, 5, 24, 10, 33, 30)
    },
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
      const { user, likeList } = action.payload
      let newUser, newLikeList
      newUser = { ...user, likes: likeList.length }
      newLikeList = likeList.map(item => {
        const { sculptureId } = item
        return { sculptureId }
      })
      return { ...state, loggedIn: true, user: newUser, likeList: newLikeList }
    }
    case SIGN_IN_REJECTED: {
      return { ...state, loggedIn: false }
    }

    case LIKE: {
      const { id } = action
      const {
        likeList,
        user: { userId }
      } = state
      likeList.push({ sculptureId: id, userId })
      return { ...state, likeList: [...likeList] }
    }

    case UNLIKE: {
      const { id } = action
      let { likeList } = state
      likeList = likeList.filter(element => {
        return element.sculptureId != id
      })
      return { ...state, likeList: [...likeList] }
    }

    default:
      return state
  }
}

export default authReducer
